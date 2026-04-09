import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Globe } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
    if (!useAuthStore.getState().error) {
      navigate('/')
    }
  }

  return (
    <main className="min-h-screen bg-brand flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-lg border-2 border-yellow-400 bg-white p-8 flex flex-col gap-6">
          <Link to="/" className="w-full justify-center flex items-center gap-2 text-[#080409]">
            <Globe size={28} className="text-gray-600" />
            <span className="text-xl font-bold">SmartNomad</span>
          </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">Login to your SmartNomad account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#080409] py-3 text-sm font-medium text-white transition-colors hover:bg-[#080409]/80 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-gray-900 underline hover:text-gray-600">
            Register
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500">
          Go to{' '}
          <Link to="/" className="font-medium text-gray-900 underline hover:text-gray-600">
            Home
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Login
