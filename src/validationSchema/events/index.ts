import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  reminder_frequency: yup.number().integer(),
  user_id: yup.string().nullable().required(),
});
