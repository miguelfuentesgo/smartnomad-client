import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

function Home() {
  return (
    <main className="min-h-screen bg-brand py-10 px-4">
      <section className="mx-auto flex max-w-6xl border-yellow-400 border-2 rounded-lg flex-col items-center gap-10  md:flex-row">

        {/* Left column — text content */}
        <div className="flex flex-1 flex-col gap-6 p-4">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Travel smarter.<br />
            Live anywhere.
          </h1>
          <p className="text-lg text-gray-600">
            SmartNomad helps digital nomads find the best places to live,
            work, and explore around the world.
          </p>
          <div className="flex gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-[#080409] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#080409]/80"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-yellow-400"
            >
              Login
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span>Trusted by nomads in 50+ countries</span>
          </div>
        </div>

        {/* Right column — image */}
        <div className="flex-1">
          <img
            src="/images/banner.jpg"
            alt="Digital nomad working remotely"
            className="h-80 w-full rounded-t-none rounded-b-lg object-cover md:h-[480px] md:rounded-l-none md:rounded-r-lg"
          />
        </div>

      </section>
    </main>
  )
}

export default Home
