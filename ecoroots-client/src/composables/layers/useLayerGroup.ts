import { wayToLatLng } from '@/services/overPassToLeaflet/overPassToLeaflet'
import type { TGreenAreasType } from '@/types/greenAreasTypes/greenAreasTypes'
import type { OverpassWay } from '@/types/overpassTurbo/OverpassTurboTypes'
import L from 'leaflet'
import { computed, type Ref } from 'vue'

/**
 * Creates a layer group of polygons from the given OverpassWay objects.
 *
 * @param ways - A reference to an array of OverpassWay objects.
 * @param color - The color to be used for the polygons.
 * @param type - The type of green areas.
 * @returns An object containing the computed polygons, layer group, and type.
 */
export function useLayerGroup(ways: Ref<OverpassWay[]>, color: string, type: TGreenAreasType) {
  const polygons = computed(() => {
    return ways.value.map((forest) => {
      const coords = wayToLatLng(forest)
      return L.polygon(coords, { color: color })
    })
  })

  const layerGroup = computed(() => L.layerGroup(polygons.value))

  return { polygons, layerGroup, type }
}
