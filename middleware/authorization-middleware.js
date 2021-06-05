const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (token === null) {
            return res.status(401).json({message: 'No auth'})
        }

        req.user = jwt.verify(token, 'jwt')

        next()

    } catch (e) {
        res.status(401).json({message: 'No auth'})
    }
}