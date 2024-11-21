<script setup lang="ts">
import LoadingComponent from '@/components/loading/loadingComponent.vue'
import MapComponent from '@/components/map/MapComponent.vue'
import StatsPanel from '@/components/stats/StatsPanel.vue'
import { useFetchGreenAreas } from '@/composables/fetcher/greenAreasFetcher'
import { useGreenAreasStore } from '@/stores/useGreenAreasStore'
import { useGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import type { TGreenAreasType } from '@/types/greenAreasTypes/greenAreasTypes'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'
import { computed } from 'vue'

const { greenAreas: greenAreasData } = useGreenAreasStore()
const { greenAreasWays } = storeToRefs(useGreenAreasStore())
const greenAreasTypes = useGreenAreasTypes(greenAreasWays)
const { gardens, parks, pitchs, playgrounds, forests, woods } = greenAreasTypes
const { fetchCachedGreenAreas, isLoading, fetchGreenAreas } = useFetchGreenAreas()

const data = computed<{ value: number; name: TGreenAreasType }[]>(() => {
  return [
    { value: gardens.value.length, name: 'gardens' },
    { value: parks.value.length, name: 'parks' },
    { value: pitchs.value.length, name: 'pitchs' },
    { value: playgrounds.value.length, name: 'playgrounds' },
    { value: forests.value.length, name: 'forests' },
    { value: woods.value.length, name: 'woods' },
  ]
})

fetchCachedGreenAreas()
</script>

<template>
  <div v-if="!greenAreasData">
    <!-- TODO: no data component -->
  </div>
  <div v-else id="dashboard-container">
    <Button color="primary" @click="fetchGreenAreas">Recharger les données</Button>

    <div id="dashboard-main-components" v-if="!isLoading">
      <MapComponent :greenAreasTypes />
      <StatsPanel :greenAreasTypes :data />
    </div>
    <LoadingComponent v-else></LoadingComponent>
  </div>
</template>

<style scoped>
#dashboard-container {
  height: inherit;
  width: inherit;
}

#dashboard-main-components {
  height: 95%;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

#dashboard-main-components > :first-child {
  flex: 10;
}

#dashboard-main-components > :last-child {
  flex: 1;
}

button {
  margin: 1rem;
}
</style>
