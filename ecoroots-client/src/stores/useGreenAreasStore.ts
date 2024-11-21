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

    return {
      greenAreas,
      setGreenAreas,
      greenAreasNodes,
      greenAreasRelations,
      greenAreasWays,
    }
  },
  { persist: true },
)
