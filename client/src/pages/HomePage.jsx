import { useState, useEffect } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products')
                setProducts(res.data)
            } catch (err) {
                setError('failed to load products' + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) return <main style={styles.center}><p>Loading products...</p></main>
    if (error) return <main style={styles.center}><p style={{color: '#c00'}}>{error}</p></main>

    return (
         <main style={styles.main}>
            <div style={styles.header}>
                <h1>Products</h1>
                <span style={styles.count}>{products.length} items</span>
            </div>
            <div style={styles.grid}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => setCartCount(c => c + 1)}
                    />
                ))}
            </div>
        </main>
    )
}

const styles = {
    main: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    count: { color: '#666', fontSize: '0.9rem' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.5rem',
    },
    center: { display: 'flex', justifyContent: 'center', padding: '4rem' },
};

export default HomePage;