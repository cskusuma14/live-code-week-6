const { Router } = require('express')
const router = Router()
const authentication = require('../middlewares/authentication')

const foodController = require('../controllers/food')

router.get('/', foodController.list)
router.post('/', foodController.create)
router.delete('/:id', foodController.delete)

module.exports = router