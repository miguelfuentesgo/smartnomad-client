import { useMemo } from 'react'
import type { LatLngTuple } from 'leaflet'
import { Icon } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

/** Vite/Webpack bundles break Leaflet’s default marker URLs unless paths are set explicitly. */
const defaultMarkerIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const CUCUTA_CENTER: LatLngTuple = [7.8942, -72.5039]

export const CUCUTA_ZOOM = 13

function randomPointsAround(center: LatLngTuple, count: number, maxDelta = 0.04): LatLngTuple[] {
  const [lat0, lng0] = center
  return Array.from({ length: count }, () => {
    const lat = lat0 + (Math.random() - 0.5) * 2 * maxDelta
    const lng = lng0 + (Math.random() - 0.5) * 2 * maxDelta
    return [lat, lng] as LatLngTuple
  })
}

type MapProps = {
  /** Demo markers scattered near Cúcuta; positions fixed after first paint (`useMemo`). */
  demoMarkerCount?: number
}

export function Map({ demoMarkerCount = 5 }: MapProps) {
  const demoPositions = useMemo(
    () => (demoMarkerCount > 0 ? randomPointsAround(CUCUTA_CENTER, demoMarkerCount) : []),
    [demoMarkerCount],
  )

  return (
    <div className="relative h-[min(420px,50vh)] w-full overflow-hidden rounded-lg border-2 border-gray-950 shadow-sm">
      <MapContainer
        center={CUCUTA_CENTER}
        zoom={CUCUTA_ZOOM}
        className="z-0 h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {demoPositions.map((position, index) => (
          <Marker key={`${position[0]}-${position[1]}-${index}`} position={position} icon={defaultMarkerIcon}>
            <Popup>
              Punto demo {index + 1}
              <br />
              {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
