import { Link } from 'react-router-dom'

function Login() {
  return (
    <main>
      <h1>Login</h1>
      <p>Don't have an account? <Link to="/">Go back home</Link></p>
    </main>
  )
}

export default Login
