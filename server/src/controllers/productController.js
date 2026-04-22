const pool = require('../db/pool')

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY created_at DESC',
        )

        res.json(result.rows)
    } catch (err) {
        console.error('products error', err.message)
        res.status(500).json({error: err.message})
    }
}

const getByProductId = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({error: "product not found"})
        }

        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({error: 'server error'})
    }
}

module.exports = {getAllProducts, getByProductId}