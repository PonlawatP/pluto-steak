import { CartItem } from './cart-item';

export interface CartInterface {
  cart: Array<CartItem>;
  cart_price: number;
}
