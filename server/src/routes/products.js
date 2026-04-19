const express = require('express')
const router = express.Router()
const {getAllProducts, getByProductId} = require('../controllers/productController')

router.get('/', getAllProducts)
router.get('/:id', getByProductId)

module.exports = router;