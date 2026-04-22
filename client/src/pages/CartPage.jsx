import { useState, useEffect } from "react";
import api from "../api/axios";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart')
            setCartItems(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {fetchCart();}, [])

    const handleRemove = async (id) => {
        try {
            await api.delete(`/cart/${id}`)
            setCartItems(items => items.filter(item => item.id != id))
        } catch (err) {
            console.error(err)
        }
    }

    const handleQuantity = async (id, quantity) => {
        if (quantity < 1) return

        try {
            await api.patch(`/cart/${id}`, { quantity })
            setCartItems(items => 
                items.map(item => item.id === id ? { ...item, quantity}: item)
            )
        } catch (err) {
            console.error(err)
        }
    }

    const total = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity, 0
    )

    if (loading) return <main style={styles.center}><p>Loading cart...</p></main>

    return (
        <main style={styles.main}>
            <h1 style={{ marginBottom: '1.5rem' }}>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p style={{ color: '#666' }}>Your cart is empty.</p>
            ) : (
                <>
                    <div style={styles.list}>
                        {cartItems.map(item => (
                            <div key={item.id} style={styles.item}>
                                <img src={item.image_url} alt={item.name} style={styles.image} />
                                <div style={styles.info}>
                                    <h3>{item.name}</h3>
                                    <p style={styles.price}>£{parseFloat(item.price).toFixed(2)} each</p>
                                </div>
                                <div style={styles.controls}>
                                    <button
                                        onClick={() => handleQuantity(item.id, item.quantity - 1)}
                                        style={styles.qtyBtn}
                                    >−</button>
                                <span style={styles.qty}>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantity(item.id, item.quantity + 1)}
                                        style={styles.qtyBtn}
                                    >+</button>
                                </div>
                                <p style={styles.subtotal}>
                                    £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </p>
                                <button onClick={() => handleRemove(item.id)} style={styles.remove}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={styles.totalRow}>
                        <span style={styles.totalLabel}>Total</span>
                        <span style={styles.totalPrice}>£{total.toFixed(2)}</span>
                    </div>
                </>
            )}
        </main>
    )
}

const styles = {
    main: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
    center: { display: 'flex', justifyContent: 'center', padding: '4rem' },
    list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' },
    info: { flex: 1 },
    price: { color: '#666', fontSize: '0.875rem', marginTop: '0.25rem' },
    controls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
    qtyBtn: {
        width: '28px', height: '28px', border: '1px solid #ccc',
        background: '#fff', borderRadius: '4px', cursor: 'pointer',
        fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    qty: { minWidth: '24px', textAlign: 'center', fontWeight: 600 },
    subtotal: { fontWeight: 600, minWidth: '70px', textAlign: 'right' },
    remove: {
        background: 'none', border: 'none', color: '#c00',
        cursor: 'pointer', fontSize: '0.875rem',
    },
    totalRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #e0e0e0',
    },
    totalLabel: { fontSize: '1.2rem', fontWeight: 600 },
    totalPrice: { fontSize: '1.5rem', fontWeight: 700 },
};

export default CartPage;