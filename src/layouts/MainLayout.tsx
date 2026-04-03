import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'

function MainLayout() {
  // Controls whether the mobile menu is open or closed
  // false = closed (default), true = open
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-brand border border-gray-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Brand — always visible on all screen sizes */}
          <Link to="/" className="flex items-center gap-2 text-[#080409]">
            <Globe size={28} className="text-gray-600" />
            <span className="text-xl font-bold">SmartNomad</span>
          </Link>

          {/* Desktop nav links — hidden on mobile, visible from md (768px) up */}
          <nav className="hidden items-center gap-3  md:flex ">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </nav>
          <div className="flex items-center justify-end gap-3">
            <Link
                to="/login"
                className="rounded-lg bg-[#080409] px-4 py-2 text-sm text-white hover:bg-[#080409]/80"
              >
                Start
              </Link>

            {/* Hamburger button — visible on mobile, hidden from md (768px) up */}
            <button
              className="text-gray-600 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Show X when open, Menu icon when closed */}
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>


        </div>

        {/* Mobile dropdown menu — only renders in the DOM when menuOpen is true */}
        {menuOpen && (
          <nav className="flex flex-col border-t border-gray-100 px-4 py-3 md:hidden">
            <Link
              to="/"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="py-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </nav>
        )}
      </header>

      <Outlet />
    </>
  )
}

export default MainLayout
