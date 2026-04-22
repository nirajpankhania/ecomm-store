import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'
import { useAuth } from "../context/useAuth";

const ProductCard = ({product, onAddToCart}) => {
    const {token} = useAuth()
    const navigate = useNavigate()
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const handleAddToCart = async() => {
        if (!token) {
            navigate('/login')
            return
        }

        setAdding(true)
        try {
            console.log('1. before')
            await api.post('/cart', {productId: product.id})
            console.log('2. after')
            setAdded(true)
            console.log('2. after setadded')
            onAddToCart?.()
            setTimeout(() => setAdded(false), 500)
        } catch (err) {
            console.error('cart error:', err.response?.data || err.message);
        } finally {
            setAdding(false)
        }
    }
    
    return (
        <div style={styles.card}>
            <img
                src={product.image_url}
                alt={product.name}
                style={styles.image}
            />
            <div style={styles.body}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>
                <div style={styles.footer}>
                <span style={styles.price}>£{parseFloat(product.price).toFixed(2)}</span>
                <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    style={{
                    ...styles.btn,
                    background: added ? '#2a7a2a' : '#222',
                    }}
                >
                    {added ? '✓ Added!' : adding ? 'Adding...' : 'Add to cart'}
                </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    card: {
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
    },
    image: { width: '100%', height: '200px', objectFit: 'cover' },
    body: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 },
    name: { fontSize: '1rem', fontWeight: 600 },
    description: { fontSize: '0.875rem', color: '#666', flex: 1 },
    footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' },
    price: { fontWeight: 700, fontSize: '1.1rem' },
    btn: {
        padding: '0.5rem 1rem',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        transition: 'background 0.3s',
    },
};

export default ProductCard