import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from 'axios'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)

        try {
            const res = await axios.post('/api/auth/login', {email, password});
            login(res.data.token, res.data.user)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.error || 'something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Login</h1>
                {error && <p style={styles.error}></p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit"  style={styles.btn} disabled={loading}>
                        {loading ? 'logging in...' : 'login'}
                    </button>
                </form>
                <p style={styles.switch}>
                    No account? <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    )
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', padding: '4rem 1rem' },
    card: { background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    title: { marginBottom: '1.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    label: { fontWeight: 500, fontSize: '0.9rem' },
    input: { padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
    btn: { marginTop: '0.5rem', padding: '0.75rem', background: '#222', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    error: { color: '#c00', marginBottom: '1rem', fontSize: '0.9rem' },
    switch: { marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' },
};

export default LoginPage;