const { Router } = require('express')
const router = Router()
const authentication = require('../middlewares/authentication')

const foodController = require('../controllers/food')

router.get('/', authentication, foodController.list)
router.post('/', foodController.create)
router.get('/:id', foodController.delete)

module.exports = router