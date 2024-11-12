<script setup lang="ts">
import MapComponent from '@/components/map/MapComponent.vue'
import StatsPanel from '@/components/stats/StatsPanel.vue'
</script>

<template>
  <div id="dashboard-container">
    <MapComponent />
    <StatsPanel />
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
