export interface IUser {
    id: Number,
    name: String,
    email: String,
    username: String,
    password: String,
    birthday: Date,
    is_admin: boolean,
    status: boolean,
    refreshToken: String,
    updatedAt: Date,
    createdAt: Date
}
