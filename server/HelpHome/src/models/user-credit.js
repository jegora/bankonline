import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const UserCreditSchema = new Schema({
    user_id: String,
    credit_type: String,
    term: Number,
    amount: Number,
})
 
export default UserCreditSchema