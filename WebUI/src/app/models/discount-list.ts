import { IDiscount } from './discount';
export interface IDiscountList {
    count: Number,
    rows: IDiscount[],
    page: Number,
    size: Number
}
