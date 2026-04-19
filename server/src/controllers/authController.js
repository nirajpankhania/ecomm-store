const pool = require("../db/pool")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "email and password required"})
    }

    try {
        // check user exists
        const existing = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        )
        if (existing.rows.length > 0){
            return res.status(409).json({error: 'email already in use'})
        }

        // hash pwd
        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role',
            [email, password_hash]
        )

        const user = result.rows[0];
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({token, user})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err.message})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({error: 'email and password required'})
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        const user = result.rows[0];

        if(!user) {
            return res.status(401).json({error: 'invalid credentials'})
        }

        const valid = await bcrypt.compare(password, user.password_hash)

        if(!valid){
            return res.status(401).json({error: "invalid credentials"})
        }

        const token = jwt.sign(
            {userId: user.id,  role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({token, user: {id: user.id, email: user.email, role: user.role}})
    } catch(err) {
        console.error(err)
        res.status(500).json({error: err.message})
    }
};

module.exports = {register, login}