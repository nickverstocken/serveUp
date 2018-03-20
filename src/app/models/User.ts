export class User {
  id: number;
  name: string;
  fname: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  picture: string;
  picture_thumb: string;
  city_id: number;
  address_name?: string;
  address_number?: string;
  address?: string = this.address_name + ' ' + this.address_number;
  zip: string;
  city: string;
  province: string;
  country: string;
  role: string;

}
