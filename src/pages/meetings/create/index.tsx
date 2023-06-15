import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMeeting } from 'apiSdk/meetings';
import { Error } from 'components/error';
import { meetingValidationSchema } from 'validationSchema/meetings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ContactInterface } from 'interfaces/contact';
import { UserInterface } from 'interfaces/user';
import { getContacts } from 'apiSdk/contacts';
import { getUsers } from 'apiSdk/users';
import { MeetingInterface } from 'interfaces/meeting';

function MeetingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MeetingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMeeting(values);
      resetForm();
      router.push('/meetings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MeetingInterface>({
    initialValues: {
      frequency: 0,
      last_meeting_date: new Date(new Date().toDateString()),
      contact_id: (router.query.contact_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: meetingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Meeting
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="frequency" mb="4" isInvalid={!!formik.errors?.frequency}>
            <FormLabel>Frequency</FormLabel>
            <NumberInput
              name="frequency"
              value={formik.values?.frequency}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('frequency', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.frequency && <FormErrorMessage>{formik.errors?.frequency}</FormErrorMessage>}
          </FormControl>
          <FormControl id="last_meeting_date" mb="4">
            <FormLabel>Last Meeting Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.last_meeting_date ? new Date(formik.values?.last_meeting_date) : null}
                onChange={(value: Date) => formik.setFieldValue('last_meeting_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<ContactInterface>
            formik={formik}
            name={'contact_id'}
            label={'Select Contact'}
            placeholder={'Select Contact'}
            fetcher={getContacts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'meeting',
  operation: AccessOperationEnum.CREATE,
})(MeetingCreatePage);
