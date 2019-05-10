import mongoose from 'mongoose'
import userSchema from '../models/user'
import CustomError from '../models/custom-error'
import auth from '../server/auth'
 
const User = mongoose.model('User', userSchema)

export function addUser(req, res) {
    let newUser = new User(req.body)
    newUser.save((error, user) => {
        if (error) { 
            res.status('666')
            res.json(handleError(error)) 
        } else {
            res.json()
        }
    })
}

export function getAllUsers(req, res) {
    User.find({}, (error, users) => {
        if (error) { res.json(error) }
        res.json(users)
    })
}

export function getUser(req, res) {
    let { email, password } = req.query
    if (!email || !password) {
        res.status('666')
        res.json(new CustomError('Error', 'Incorrect credentials'))
        return
    } else {
        let predicate = { email: email }
        User.findOne(predicate, (error, user) => {
            if (error) { res.json(error) }
            if (user) {
                if (user.password === password) {
                    res.json(user)
                } else {
                    res.status('666')
                    res.json(new CustomError('Error', 'Incorrect credentials'))
                }
            } else {
                console.log('User NOT found')
                res.status('666')
                res.json(new CustomError('Error', 'Incorrect credentials'))
            }
        })
    }
}

function handleError(error) {
    if (error.name === 'MongoError') {
        if (error.code === 11000) {
            return new CustomError('Duplicate Error', 'Such an entity already exists')
        }
    } else if (error.name === 'ValidationError') {
        const invalidFields = []
        for (var e in error.errors) {
            invalidFields.push(e)
        }
        return new CustomError('Validation Error', 'Incorrect input fields', invalidFields)
    }    
    return new CustomError()
}