const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

const{
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity
} = require('../controllers/cartController')

router.get('/', authenticate, getCart)
router.post('/', authenticate, addToCart)
router.delete('/:id', authenticate,  removeFromCart)
router.patch('/:id', authenticate, updateQuantity)

module.exports = router;