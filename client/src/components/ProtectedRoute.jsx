import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({children}) => {
    const {token} = useAuth()
    if (!token) return <Navigate to="/login" replace />; // replace to prevent heading back to place blocked from
    return children
}

export default ProtectedRoute