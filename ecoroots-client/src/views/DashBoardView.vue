<script setup lang="ts">
import MapComponent from '@/components/map/MapComponent.vue'
import StatsPanel from '@/components/stats/StatsPanel.vue'
import { useGreenAreasStore } from '@/stores/useGreenAreasStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { gardens, parks, pitchs, playgrounds, forests, woods } = storeToRefs(useGreenAreasStore())

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
</script>

<template>
  <div id="dashboard-container">
    <MapComponent />
    <StatsPanel :data />
  </div>
</template>

<style scoped>
#dashboard-container {
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

#dashboard-container > :first-child {
  flex: 10;
}

#dashboard-container > :last-child {
  flex: 1;
}
</style>
