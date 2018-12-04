import { Item } from './items';

export interface User {
  id: string;
  userName: string;
  password: string;
  cart: Item[];
}
