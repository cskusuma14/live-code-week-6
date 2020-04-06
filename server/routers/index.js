const { Router } = require('express')
const router = Router()

const user = require('./user')
const food = require('./food')

router.use('/user', user)
router.use('/foods', food)

module.exports = router