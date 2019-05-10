import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const DepositSchema = new Schema({
    description: String,
    rate: Number,
    minAmount: Number
})
 
export default DepositSchema