import { CartItem } from './cart-item';

export interface BillItem {
  bid: number;
  uid: number;
  Customer_name: string;
  phone_number: string;
  address: string;
  Total_price: number;
  Datetime: string;
  status: number;
  orders: Array<CartItem>;
}
