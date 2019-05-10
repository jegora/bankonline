import mongoose from 'mongoose'
import depositSchema from '../models/deposit'
import userDepositType from '../models/user-deposit'

const Deposit = mongoose.model('Deposit', depositSchema)
const UserDeposit = mongoose.model('UserDeposit', userDepositType)

export function addDeposit(req, res) {
    let newDeposit = new UserDeposit(req.body)
    newDeposit.save((error, deposit) => {
        res.json(deposit);
    })
}

export function getAllUserDeposits(req, res) {
    let { user_id } = req.query
    UserDeposit.find({}, (error, deposits) => {
        if (error) { res.json(error) }
        res.json(deposits)
    })
}

export function getAllDeposits(req, res) {
    Deposit.find({}, (error, deposits) => {
        if (error) { res.json(error) }
        res.json(deposits)
    })
}