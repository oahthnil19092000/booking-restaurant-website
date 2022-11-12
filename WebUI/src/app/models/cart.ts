import { ICartItem } from './cart-item';
export interface ICart {
    countAll: Number,
    rows: ICartItem[]
}
