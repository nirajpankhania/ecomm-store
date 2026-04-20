import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>Ecomm Shop</Link>
            <div style={styles.links}>
                <Link to="/">Products</Link>
                {user ? (
                    <>
                        <Link to="/cart">Cart</Link>
                        <span style={styles.email}>{user.email}</span>
                        <button onClick={handleLogout} style={styles.btn}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    brand: { fontWeight: 700, fontSize: '1.2rem'},
    links: { display: 'flex', gap: '1.5rem', alignItems: 'center'},
    email: { color: '#666', fontSize: '0.9rem'},
    btn: {
        background: 'none',
        border: '1px solid #ccc',
        padding: '0.3rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default Navbar