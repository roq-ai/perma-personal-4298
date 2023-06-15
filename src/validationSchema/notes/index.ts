import * as yup from 'yup';

export const noteValidationSchema = yup.object().shape({
  content: yup.string().required(),
  contact_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
