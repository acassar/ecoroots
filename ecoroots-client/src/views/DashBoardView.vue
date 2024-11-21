<script setup lang="ts">
import LoadingComponent from '@/components/loading/loadingComponent.vue'
import MapComponent from '@/components/map/MapComponent.vue'
import StatsPanel from '@/components/stats/StatsPanel.vue'
import { useFetchGreenAreas } from '@/composables/fetcher/greenAreasFetcher'
import { useGreenAreasStore } from '@/stores/useGreenAreasStore'
import { useGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import { storeToRefs } from 'pinia'
import { Button } from 'primevue'
import { computed } from 'vue'

const { greenAreas: greenAreasData } = useGreenAreasStore()
const { greenAreasWays } = storeToRefs(useGreenAreasStore())
const { gardens, parks, pitchs, playgrounds, forests, woods } = useGreenAreasTypes(greenAreasWays)
const { fetchCachedGreenAreas, isLoading, fetchGreenAreas } = useFetchGreenAreas()

const data = computed(() => {
  return [
    { value: gardens.value.length, name: 'Jardins' },
    { value: parks.value.length, name: 'Parcs' },
    { value: pitchs.value.length, name: 'Terrains' },
    { value: playgrounds.value.length, name: 'Terrains de jeux' },
    { value: forests.value.length, name: 'Forêts' },
    { value: woods.value.length, name: 'Bois' },
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
      <MapComponent />
      <StatsPanel :data />
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
