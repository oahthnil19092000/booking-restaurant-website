import { IMessage } from "./message"
import { IUser } from "./user";

export interface IUserLoginResponse {
    data: IUser,
    message: IMessage,
}
