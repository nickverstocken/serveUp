import {Service} from './Service';
import {City} from './City';

export class User {
  id: number;
  name: string;
  fname: string;
  email: string;
  introduction: string;
  password: string;
  password_confirmation: string;
  picture: any;
  picture_thumb: string;
  city_id: number;
  address: string;
  city: City;
  zip: number;
  province: string;
  country: string;
  role: string;
  service: Service[];
  updated_at: string;
  rating: number;
  number_ratings: number;
}
