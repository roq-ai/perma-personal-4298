import * as yup from 'yup';
import { giftSuggestionValidationSchema } from 'validationSchema/gift-suggestions';
import { meetingValidationSchema } from 'validationSchema/meetings';
import { noteValidationSchema } from 'validationSchema/notes';

export const contactValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string(),
  phone: yup.string(),
  user_id: yup.string().nullable().required(),
  gift_suggestion: yup.array().of(giftSuggestionValidationSchema),
  meeting: yup.array().of(meetingValidationSchema),
  note: yup.array().of(noteValidationSchema),
});
