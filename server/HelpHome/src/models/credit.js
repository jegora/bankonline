import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const CreditSchema = new Schema({
    description: String,
    rate: Number,
    maxAmount: Number
})
 
export default CreditSchema