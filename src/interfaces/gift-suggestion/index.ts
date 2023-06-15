import { ContactInterface } from 'interfaces/contact';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GiftSuggestionInterface {
  id?: string;
  contact_id: string;
  suggestion: string;
  accepted?: boolean;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  contact?: ContactInterface;
  user?: UserInterface;
  _count?: {};
}

export interface GiftSuggestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  contact_id?: string;
  suggestion?: string;
  user_id?: string;
}
