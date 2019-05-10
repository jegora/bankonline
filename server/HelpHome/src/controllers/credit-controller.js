import mongoose from 'mongoose'
import creditSchema from '../models/credit'
import userCreditType from '../models/user-credit'

const Credit = mongoose.model('Credit', creditSchema)
const UserCredit = mongoose.model('CreditType', userCreditType)

export function addCredit(request, response) {
    let newCredit = new UserCredit(request.body);
    newCredit.save((error, credit) => {
        response.json(credit);
    });
}

export function getAllUserCredits(req, res) {
    let { user_id } = req.query
    // console.log('USER_ID = ' + JSON.stringify(req.body));
    UserCredit.find({}, (error, credits) => {
        if (error) { res.json(error) }
        res.json(credits)
    })
}

export function getAllCredits(req, res) {
    Credit.find({}, (error, credits) => {
        if (error) { res.json(error) }
        res.json(credits)
    })
}