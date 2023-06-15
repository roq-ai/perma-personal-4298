import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  date: any;
  reminder_frequency?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
