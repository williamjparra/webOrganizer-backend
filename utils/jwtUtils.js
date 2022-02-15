const jwt = require('jsonwebtoken')
const config = require('../config')

function generateToken({id, username, email}) {
    return jwt.sign({
            id,
            username,
            email
        }, 
        config.jwt.secret, 
        {expiresIn: config.jwt.exp}
    )
}

function validateToken({req}) {
    console.log(req.cookie || req.cookies)
}

module.exports = {
    generateToken,
    validateToken
}