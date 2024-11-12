import { getWaysInBounds, wayToLatLng } from '@/services/overPassToLeaflet/overPassToLeaflet'
import { useParksStore } from '@/stores/parks'
import L from 'leaflet'
import { ref, type Ref } from 'vue'

export function useGreenAreas(map: Ref<L.Map | null>) {
  const greenAreas = ref<L.LayerGroup>()
  const { parkWays } = useParksStore()

  const init = () => {
    if (!map.value) throw Error('Map not initialized')

    const mapBounds = map.value.getBounds()
    const ways = getWaysInBounds(parkWays, mapBounds)

    const polygons = ways.map((way) => {
      const coords = wayToLatLng(way)
      const polygon = L.polygon(coords, { color: 'green' })
      return polygon
    })
    greenAreas.value = L.layerGroup(polygons)
  }

  return { greenAreas, init }
}