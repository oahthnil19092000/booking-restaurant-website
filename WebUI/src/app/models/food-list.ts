import { IFood } from './food';
export interface IFoodList {
    count: Number,
    rows: IFood[],
    page: Number,
    size: Number
}
