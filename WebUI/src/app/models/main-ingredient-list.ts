import { IMainIngredient } from "./main-ingredient";

export interface IMainIngredientList {
    count: Number,
    rows: IMainIngredient[],
    page: Number,
    size: Number
}
