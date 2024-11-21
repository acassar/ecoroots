<script setup lang="ts">
import { useGreenAreasLayer } from '@/composables/layers/useGreenAreasLayer'
import type { TUseGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  greenAreasTypes: TUseGreenAreasTypes
}>()

const leafletMap = ref<L.Map | null>(null)

useGreenAreasLayer(leafletMap as Ref<L.Map | null>, props.greenAreasTypes)

const initMap = () => {
  const _map = L.map('map').setView([48.8566, 2.3522], 13) //Pointed to Paris

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(_map)
  leafletMap.value = _map
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map-container">
    <!-- <button @click="setPArks([])">clear store</button> -->
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map-container {
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  height: 90%;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 5px var(--color-text);
}
</style>
