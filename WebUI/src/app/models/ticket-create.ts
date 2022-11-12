export interface ITicketCreate {
    customer_address: String,
    customer_id: Number,
    customer_phone: String,
    payment_date: Date | null,
    received_date: Date
    table_id: Number,
    type_party_id: Number,
}
