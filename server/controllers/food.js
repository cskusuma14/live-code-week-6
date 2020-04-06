const { Food } = require('../models')

class Foods {

    static list(req, res) {
        Food.findAll() // jangan lupa where
            .then(data => {
                res.status(200).json({ data: data })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static create(req, res) {
        Food.create({
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: 1 // jangan lupa ubah
        })
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }

    static delete(req, res) {
        let foodId = req.params.id
        Food.destroy({
            where: { id: foodId }
        })
            .then(data => {
                res.status(200).json({ message: "Successfully delete food from your menu" })
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error' })
            })
    }
}

module.exports = Foods