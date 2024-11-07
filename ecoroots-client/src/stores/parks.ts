import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { OverpassElement } from '@/types/overpassTurbo/OverpassTurboTypes'

export const useParksStore = defineStore('parks', () => {
  const parks = ref<OverpassElement[]>([])

  function setParks(newParks: OverpassElement[]) {
    parks.value = newParks
  }

  const parkNodes = computed(() => parks.value.filter((element) => element.type === 'node'))
  const parkWays = computed(() => parks.value.filter((element) => element.type === 'way'))
  const parkRelations = computed(() => parks.value.filter((element) => element.type === 'relation'))

  return { parks, setPArks: setParks, parkNodes, parkRelations, parkWays }
}, {persist: true})
