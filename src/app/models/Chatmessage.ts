import {User} from './User';

export class Chatmessage {
  id?: number;
  message: string;
  sender_id: number;
  sender?: User;
  receiver_id: number;
  receiver?: User;
  updated_at?: string;
  created_at?: string;
}
