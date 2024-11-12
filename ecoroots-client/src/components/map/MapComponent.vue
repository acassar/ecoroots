<script setup lang="ts">
import { useGreenAreas } from '@/composables/useGreenAreas'
import { fetchOverpassData } from '@/services/api/overpassQuery'
import { OVERPASS_PARKS_QUERY } from '@/services/overpassTurbo/queries'
import { useParksStore } from '@/stores/parks'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref, type Ref } from 'vue'

const { parks, setPArks, parkNodes, parkRelations, parkWays } = useParksStore()

const leafletMap = ref<L.Map | null>(null)

const { greenAreas, init: initGreenAreas } = useGreenAreas(leafletMap as Ref<L.Map | null>)

const initMap = () => {
  const _map = L.map('map').setView([48.8566, 2.3522], 13) //Pointed to Paris

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(_map)
  leafletMap.value = _map
}

const fetchGreenAreas = async () => {
  try {
    if (!parks.length) {
      const data = await fetchOverpassData(OVERPASS_PARKS_QUERY)

      console.log(data)
      setPArks(data.elements)
    } else {
      console.log('Parks already fetched ', parks)
    }
  } catch (error) {
    console.error('Error fetching Overpass data:', error)
  }
}
const initLayers = () => {
  initGreenAreas()
}

const handleLayersDisplay = () => {
  greenAreas.value?.addTo(leafletMap.value as L.Map)
}

onMounted(async () => {
  initMap()
  await fetchGreenAreas()
  initLayers()
  handleLayersDisplay()

  // leafletMap.value?.on('moveend', handleLayersDisplay)

  console.log('ways:', parkNodes, parkRelations, parkWays)
})
</script>

<template>
  <div id="map-container">
    <button @click="setPArks([])">clear store</button>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#map {
  height: 90vh;
  width: 90vw;
}
</style>
