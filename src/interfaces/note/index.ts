import { ContactInterface } from 'interfaces/contact';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface NoteInterface {
  id?: string;
  contact_id: string;
  content: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  contact?: ContactInterface;
  user?: UserInterface;
  _count?: {};
}

export interface NoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  contact_id?: string;
  content?: string;
  user_id?: string;
}
