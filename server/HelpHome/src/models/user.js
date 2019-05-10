import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    patronymic: String,
    dob: Date,
    passport_series: String,
    passport_number: String,
    authority: String,
    date_issue: Date,
    identification_number: String,
    place_birth: String,
    address_current: String,
    address_registration: String,
    family_relation: String,
    phone_first: String,
    phone_second: String,
    citizenship: String,
    disabled: Boolean,
    job: String,
    speciality: String,
    income: Number,
    email: {
        index: true,
        type: String,
        validate: {
            isAsync: true,
            validator: (v, cb) => {
                setTimeout(() => {
                    const regex = /[\w-]+@([\w-]+\.)+[\w-]+/ 
                    cb(regex.test(v), 'Inappropriate email')
                }, 5);
            },
            message: 'Email validation error'
        },
        required: 'Email required',
        unique: true
    },
    password: {
        type: String,
        required: 'Password required',
        minlength: 4,
        maxlength: 200,
    },
    role: String
})
 
export default UserSchema