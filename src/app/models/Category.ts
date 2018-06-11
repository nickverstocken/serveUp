import {SubCategory} from './SubCategory';

export class Category {
  id: number;
  name: string;
  description: string;
  picture: string;
  subcategories?: SubCategory[];
  updated_at: string;
  created_at: string;
}
