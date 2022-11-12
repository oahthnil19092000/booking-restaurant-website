import { IUser } from './user';
export interface IUserList {
    count: Number,
    rows: IUser[],
    page: Number,
    size: Number
}
