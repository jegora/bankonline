import moment from 'moment'
import jwt from 'jwt-simple'

const TOKEN_SECRET = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJVadQssw5c'

function encodeUser(user) {
    const payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        user: user
    }
    return  jwt.encode(payload, TOKEN_SECRET)
}

function decodeUserToken(token) {
    return jwt.decode(token, TOKEN_SECRET)
}

export default {encodeUser, decodeUserToken}