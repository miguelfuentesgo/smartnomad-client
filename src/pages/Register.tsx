import { Link } from 'react-router-dom'
function Register() {
    return (
        <>
        <h1>Register</h1>
        <p>Already have an account? <Link to="/login">Go to login</Link></p>
        </>
    )

    }

export default Register