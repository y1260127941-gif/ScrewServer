import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    data: String
}).index({id:1})