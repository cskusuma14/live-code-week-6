const { User } = require('../models')
var jwt = require('jsonwebtoken');

class Users {

    static create(req, res) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static login(req, res) {
        User.findOne({
            where: { email: req.body.email }
        })
            .then(data => {
                //jangan lupa checkpassword & generate token
                if (req.body.password == data.password) { // jangan lupa bcrypt
                    let access_token = jwt.sign({
                        userId: data.id,
                        email: data.email
                    }, 'secret');
                    res.status(200).json({ access_token })
                }
                else {
                    res.status(400).json({ message: 'Password salah' })
                }

            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }
}

module.exports = Users