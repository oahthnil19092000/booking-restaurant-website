export interface ITicket {
    createdAt: Date,
    customer_address: String,
    customer_id: Number,
    customer_phone: String,
    id: Number,
    payment_date: Date | any,
    received_date: Date
    table_id: Number,
    type_party_id: Number,
    updatedAt: Date
}
