import { GiftSuggestionInterface } from 'interfaces/gift-suggestion';
import { MeetingInterface } from 'interfaces/meeting';
import { NoteInterface } from 'interfaces/note';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContactInterface {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  gift_suggestion?: GiftSuggestionInterface[];
  meeting?: MeetingInterface[];
  note?: NoteInterface[];
  user?: UserInterface;
  _count?: {
    gift_suggestion?: number;
    meeting?: number;
    note?: number;
  };
}

export interface ContactGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  user_id?: string;
}
