import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const FamilyRelationTypeSchema = new Schema({
    title: String,
})
 
export default FamilyRelationTypeSchema