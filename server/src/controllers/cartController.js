const pool = require('../db/pool')

const getCart = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                ci.id,
                ci.quantity,
                p.id as product_id,
                p.name,
                p.price,
                p.image_url
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1`,
            [req.user.userId]
        )
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'server error'})
    }
}

const addToCart = async (req, res) => {
    const { productId } = req.body;
    
    if (!productId) {
        return res.status(400).json({error: 'productId required'})
    }

    try {
        const result = await pool.query(
            `INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES ($1, $2, 1)
            ON CONFLICT (user_id, product_id)
            DO UPDATE SET quantity = cart_items.quantity + 1
            RETURNING *`,
            [req.user.userId, productId]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'server error'})
    }
}

const removeFromCart = async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
            [req.params.id, req.user.userId]
        )
        res.json({message: 'item removed'})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'server error'})
    }
}

const updateQuantity = async(req, res) => {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
        return res.status(400).json({error: 'quantity must be at least one'})
    }

    try {
        const result = await pool.query(
            `UPDATE cart_items 
            SET quantity = $1 
            WHERE id = $2 AND user_id = $3
            RETURNING *`,
            [quantity, req.params.id, req.user.userId]
        )
        if (result.rows.length === 0){
            return res.status(404).json({error: 'cart item not found'})
        }
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'server error'})
    }
}

module.exports = {getCart, addToCart, removeFromCart, updateQuantity}