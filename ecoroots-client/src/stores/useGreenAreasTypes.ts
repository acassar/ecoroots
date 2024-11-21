import type { OverpassElement } from '@/types/overpassTurbo/OverpassTurboTypes'
import { computed, type Ref } from 'vue'

export function useGreenAreasTypes(greenAreasWays: Ref<OverpassElement[]>) {
  // - Filter green areas by type - //
  const parks = computed(() => greenAreasWays.value.filter((way) => way.tags?.leisure === 'park'))
  const gardens = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.leisure === 'garden'),
  )
  const pitchs = computed(() => greenAreasWays.value.filter((way) => way.tags?.leisure === 'pitch'))
  const playgrounds = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.leisure === 'playground'),
  )
  const forests = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.landuse === 'forest'),
  )
  const woods = computed(() => greenAreasWays.value.filter((way) => way.tags?.natural === 'wood'))
  // -- //

  return { parks, gardens, pitchs, playgrounds, forests, woods }
}
