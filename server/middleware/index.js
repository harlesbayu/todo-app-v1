const User = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports = {
    auth: function (req, res, next) {

        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.ACCESS_DATA, function (err, decoded) {
                if (!err) {
                    User.findById(decoded.userId)
                    .then(function (user) {
                        req.id = user._id
                        next()
                    })
                } else {
                    res.status(403).json({
                        
                    })
                }
            })
        } else {
            res.status(403).json({

            })
        }

    }
}