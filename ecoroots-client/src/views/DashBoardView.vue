<script setup lang="ts">
import MapComponent from '@/components/map/MapComponent.vue'
import { Button } from 'primevue'
</script>

<template>
  <div id="dashboard-container">
    <MapComponent />
    <div>
      <Button>
        <v-icon id="stats-btn-icon" alt="stats button icon" scale="1" name="bi-chevron-left" />
      </Button>
    </div>
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
