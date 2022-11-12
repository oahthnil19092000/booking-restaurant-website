import { IFood } from './food';
import { IMainIngredientDetail } from './main-ingredient-detail';
export interface IFoodDetail {
    food: IFood,
    mainIngredientDetail: IMainIngredientDetail[],
    userId: Number
}
