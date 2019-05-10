import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const UserDepositSchema = new Schema({
    user_id: String,
    deposit_type: String,
    term: Number,
    amount: Number,
})
 
export default UserDepositSchema