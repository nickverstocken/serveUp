import {User} from './User';

export class Appointment {
  id?: number;
  title: string;
  date: string;
  time: string;
  location: string;
  creator: User;
  creator_id: number;
  receiver_id:number;
  offer_id?: number;
  approved: boolean;
  updated_at?: string;
  created_at?: string;
}
