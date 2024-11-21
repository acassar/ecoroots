import type { TUseGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import L from 'leaflet'
import { watchEffect, type Ref } from 'vue'
import { useLayerGroup } from './useLayerGroup'

export function useGreenAreasLayer(map: Ref<L.Map | null>, greenAreasTypes: TUseGreenAreasTypes) {
  const { forests, gardens, parks, pitchs, playgrounds, woods, greenAreaTypes, getTypeColor } =
    greenAreasTypes

  const layerGroups = [
    useLayerGroup(forests, getTypeColor('forests'), 'forests'),
    useLayerGroup(gardens, getTypeColor('gardens'), 'gardens'),
    useLayerGroup(parks, getTypeColor('parks'), 'parks'),
    useLayerGroup(pitchs, getTypeColor('pitchs'), 'pitchs'),
    useLayerGroup(playgrounds, getTypeColor('playgrounds'), 'playgrounds'),
    useLayerGroup(woods, getTypeColor('woods'), 'woods'),
  ]

  const init = () => {
    if (map.value) {
      layerGroups.forEach((layerGroup) => {
        layerGroup.layerGroup.value?.removeFrom(map.value as L.Map)
        if (greenAreaTypes.value.has(layerGroup.type)) {
          layerGroup.layerGroup.value?.addTo(map.value as L.Map)
        }
      })
    }
  }

  watchEffect(() => init())

  return { init }
}
