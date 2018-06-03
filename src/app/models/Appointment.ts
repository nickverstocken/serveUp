import {User} from './User';

export class Appointment {
  id?: number;
  title: string;
  date: string;
  time: string;
  location: any;
  creator: User;
  message_id: number;
  creator_id: number;
  receiver_id:number;
  offer_id?: number;
  approved: boolean;
  updated_at?: string;
  created_at?: string;
}
