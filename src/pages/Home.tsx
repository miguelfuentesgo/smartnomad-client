import { Link } from 'react-router-dom'
import { MapPin, Globe, Backpack } from 'lucide-react'

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to SmartNomad</h1>
      <p className="text-lg text-gray-500">Your smart travel companion for digital nomads.</p>

      <div className="flex gap-8 text-violet-600">
        {/* Icons accept className for Tailwind sizing and color */}
        <MapPin size={32} />
        <Globe size={32} />
        <Backpack size={32} />
      </div>

      <Link
        to="/login"
        className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-violet-700"
      >
        <MapPin size={18} />
        Get Started
      </Link>
    </main>
  )
}

export default Home
