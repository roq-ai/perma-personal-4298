import * as yup from 'yup';

export const giftSuggestionValidationSchema = yup.object().shape({
  suggestion: yup.string().required(),
  accepted: yup.boolean(),
  contact_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
