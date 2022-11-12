import { ITable } from './table';
import { IUser } from './user';
import { IComment } from './comment';
import { IBill } from './bill';
import { IFeedback } from './feedback';
export interface ITicketInfo {
    createdAt: Date,
    customer_address: String,
    customer: IUser,
    admin: IUser,
    comment: IComment,
    customer_phone: String,
    status: Number,
    id: Number,
    bill: IBill,
    feedback: IFeedback,
    payment_date: Date | any,
    received_date: Date
    table: ITable,
    type_party: any,
    updatedAt: Date
}
