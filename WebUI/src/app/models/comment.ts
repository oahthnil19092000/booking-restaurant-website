import { ITicketInfo } from './ticket-info';
export interface IComment {
    id: Number,
    bill_id: Number,
    content: String,
    point: Number,
    createdAt: Date,
    updatedAt: Date
}
