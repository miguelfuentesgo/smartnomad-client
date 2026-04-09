import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, MapPin } from 'lucide-react'
import { Map } from '../components/Map'
import { useAuthStore } from '../store/authStore'
import { usePlaceStore } from '../store/placeStore'

function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { places, getPlaces, isLoading, error, hasPlaces } = usePlaceStore()

  useEffect(() => {
    if (!isAuthenticated) return
    void getPlaces({ limit: 10 })
  }, [isAuthenticated, getPlaces])

  return (
    <main className="min-h-screen bg-brand py-10 px-4">
      {!isAuthenticated && (
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

      </section>)}

      {isAuthenticated && (<section className="mx-auto mt-12 max-w-6xl px-1">
        <h2 className="text-2xl font-bold text-gray-900">Cúcuta</h2>
        <p className="mt-1 text-sm text-gray-600">
          Vista por defecto — puedes explorar la ciudad desde aquí.
        </p>
        <div className="mt-4">
          <Map />
        </div>
      </section>)}

      {isAuthenticated && (
        <section className="mx-auto mt-12 max-w-6xl px-1">
          <h2 className="text-2xl font-bold text-gray-900">Your latest places</h2>
          <p className="mt-1 text-sm text-gray-600">
            Last 10 you added (newest first).
          </p>

          {isLoading && (
            <div className="mt-6 flex items-center gap-2 text-gray-600">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              <span>Loading places…</span>
            </div>
          )}

          {error && !isLoading && (
            <p className="mt-6 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          {!isLoading && !error && !hasPlaces && (
            <p className="mt-6 text-sm text-gray-600">
              You have not added any places yet. They will show up here after you create some via the API.
            </p>
          )}

          {!isLoading && hasPlaces && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {places.map((place) => (
                <li
                  key={place.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {place.visit_time}
                    {place.avg_price != null && place.avg_price !== '' && (
                      <span> · Avg. {place.avg_price}</span>
                    )}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {place.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  )
}

export default Home
