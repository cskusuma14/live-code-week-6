const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    try {
        console.log(req.headers.acces_token)
        // if (!access_token) res.status(400).json({ message: 'token not found' })
        // else {
        const decoded = jwt.verify(req.headers.acces_token, 'secret');
        console.log(decoded)
        req.userId = decoded.userId
        next()
        // }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports = authentication