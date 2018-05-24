import {City} from './City';
import {Category} from './Category';
import {Tag} from './Tag';
import {User} from './User';
import {SubCategory} from './SubCategory';

export class Service {
  id: number;
  name: string;
  description: string;
  category_id: number;
  sub_category: SubCategory;
  address: string;
  city_id: number;
  city: City;
  country: string;
  tel: string;
  experience: number;
  website: string;
  facebook: string;
  youtube: string;
  twitter: string;
  linkedin: string;
  google: string;
  pinterest: string;
  instagram: string;
  snapchat: string;
  dribble: string;
  behance: string;
  logo: string;
  banner: string;
  business_hours: object;
  areas_of_service: string;
  max_km: number;
  price_estimate: number;
  rate: string;
  price_extras: object[];
  standard_response: string;
  tags;
  user?: User;
}
