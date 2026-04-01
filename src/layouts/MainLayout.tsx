import { Link, Outlet } from 'react-router-dom'
import { Globe } from 'lucide-react'

function MainLayout() {
  return (
    <>
    <Link to="/">
    <header className="flex w-full items-center justify-center gap-2 p-4">
        <Globe size={32} className="text-blue-600" />
        <h1 className="text-2xl font-bold">SmartNomad</h1>
      </header>
    </Link>
      
      <nav className="flex gap-4 border-b border-gray-200 px-4 py-3">
        <Link to="/login">
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">Login</button>
        </Link>
        <Link to="/register">
        <button className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">Register</button>
        </Link>
      </nav>
      <Outlet />
    </>
  )
}

export default MainLayout
