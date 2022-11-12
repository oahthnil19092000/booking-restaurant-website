import { IMessage } from "./message"
import { IBill } from './bill';

export interface IBillResponse {
    data: IBill,
    message: IMessage,
}
