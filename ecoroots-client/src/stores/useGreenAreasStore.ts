import type { OverpassElement } from '@/types/overpassTurbo/OverpassTurboTypes'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store to manage green areas
 */
export const useGreenAreasStore = defineStore(
  'greenAreas',
  () => {
    const greenAreas = ref<OverpassElement[]>([])

    function setGreenAreas(newAreas: OverpassElement[]) {
      greenAreas.value = newAreas
    }

    const greenAreasNodes = computed(() =>
      greenAreas.value.filter((element) => element.type === 'node'),
    )
    const greenAreasWays = computed(() =>
      greenAreas.value.filter((element) => element.type === 'way'),
    )
    const greenAreasRelations = computed(() =>
      greenAreas.value.filter((element) => element.type === 'relation'),
    )

    // - Filter green areas by type - //
    const parks = computed(() => greenAreasWays.value.filter((way) => way.tags?.leisure === 'park'))
    const gardens = computed(() =>
      greenAreasWays.value.filter((way) => way.tags?.leisure === 'garden'),
    )
    const pitchs = computed(() =>
      greenAreasWays.value.filter((way) => way.tags?.leisure === 'pitch'),
    )
    const playgrounds = computed(() =>
      greenAreasWays.value.filter((way) => way.tags?.leisure === 'playground'),
    )
    // -- //

    return {
      greenAreas,
      setGreenAreas,
      greenAreasNodes,
      greenAreasRelations,
      greenAreasWays,
      parks,
      gardens,
      pitchs,
      playgrounds,
    }
  },
  { persist: true },
)
