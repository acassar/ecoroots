import type { TUseGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import L from 'leaflet'
import { watchEffect, type Ref } from 'vue'
import { useLayerGroup } from './useLayerGroup'

export function useGreenAreasLayer(map: Ref<L.Map | null>, greenAreasTypes: TUseGreenAreasTypes) {
  const { forests, gardens, parks, pitchs, playgrounds, woods, greenAreaTypes } = greenAreasTypes

  //TODO: make variables for the colors
  const layerGroups = [
    useLayerGroup(forests, '#104911', 'forests'),
    useLayerGroup(gardens, '#548C2F', 'gardens'),
    useLayerGroup(parks, '#F2C14E', 'parks'),
    useLayerGroup(pitchs, '#FEDC97', 'pitchs'),
    useLayerGroup(playgrounds, '#033F63', 'playgrounds'),
    useLayerGroup(woods, '#B2CEDE', 'woods'),
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
