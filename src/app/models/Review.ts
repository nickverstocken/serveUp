import {User} from './User';

export class Review {
  id: number;
  reviewer: User;
  comment: string;
  rating: number;
  updated_at: string;
  created_at: string;
}
