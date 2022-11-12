import { IFood } from './food';
import { ITicket } from './ticket';
export interface ICartItem {
    quantity: Number,
    ticket: ITicket,
    food: IFood
}
