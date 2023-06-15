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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGiftSuggestionById, updateGiftSuggestionById } from 'apiSdk/gift-suggestions';
import { Error } from 'components/error';
import { giftSuggestionValidationSchema } from 'validationSchema/gift-suggestions';
import { GiftSuggestionInterface } from 'interfaces/gift-suggestion';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ContactInterface } from 'interfaces/contact';
import { UserInterface } from 'interfaces/user';
import { getContacts } from 'apiSdk/contacts';
import { getUsers } from 'apiSdk/users';

function GiftSuggestionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GiftSuggestionInterface>(
    () => (id ? `/gift-suggestions/${id}` : null),
    () => getGiftSuggestionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GiftSuggestionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGiftSuggestionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gift-suggestions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GiftSuggestionInterface>({
    initialValues: data,
    validationSchema: giftSuggestionValidationSchema,
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
            Edit Gift Suggestion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="suggestion" mb="4" isInvalid={!!formik.errors?.suggestion}>
              <FormLabel>Suggestion</FormLabel>
              <Input type="text" name="suggestion" value={formik.values?.suggestion} onChange={formik.handleChange} />
              {formik.errors.suggestion && <FormErrorMessage>{formik.errors?.suggestion}</FormErrorMessage>}
            </FormControl>
            <FormControl id="accepted" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.accepted}>
              <FormLabel htmlFor="switch-accepted">Accepted</FormLabel>
              <Switch
                id="switch-accepted"
                name="accepted"
                onChange={formik.handleChange}
                value={formik.values?.accepted ? 1 : 0}
              />
              {formik.errors?.accepted && <FormErrorMessage>{formik.errors?.accepted}</FormErrorMessage>}
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'gift_suggestion',
  operation: AccessOperationEnum.UPDATE,
})(GiftSuggestionEditPage);
