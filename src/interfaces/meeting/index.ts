import { ContactInterface } from 'interfaces/contact';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MeetingInterface {
  id?: string;
  contact_id: string;
  frequency: number;
  last_meeting_date?: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  contact?: ContactInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MeetingGetQueryInterface extends GetQueryInterface {
  id?: string;
  contact_id?: string;
  user_id?: string;
}
