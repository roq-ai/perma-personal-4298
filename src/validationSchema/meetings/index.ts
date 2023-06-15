import * as yup from 'yup';

export const meetingValidationSchema = yup.object().shape({
  frequency: yup.number().integer().required(),
  last_meeting_date: yup.date(),
  contact_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
