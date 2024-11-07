<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L, { type LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { fetchOverpassData } from '@/services/api/overpassQuery'
import { OVERPASS_PARKS_QUERY } from '@/services/overpassTurbo/queries'
import type {
  OverpassElement,
  OverpassGeometry,
  OverpassNode,
  OverpassRelation,
  OverpassWay,
} from '@/types/overpassTurbo/OverpassTurboTypes'
import { useParksStore } from '@/stores/parks'
import {
  relationsToLatLngs,
  waysToCoords,
  wayToLatLng,
} from '@/services/overPassToLeaflet/overPassToLeaflet'

const { parks, setPArks, parkNodes, parkRelations, parkWays } = useParksStore()

const map = ref<L.Map | null>(null)

const initMap = () => {
  const _map = L.map('map').setView([48.8566, 2.3522], 13) //Pointed to Paris

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(_map)
  map.value = _map
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

const addGreenAreasToMap = () => {
  try {
    if (map.value && parks) {
      parkRelations.forEach((element: OverpassRelation) => {
        if (!element.members) return
        element.members.forEach((member) => {
          if (member.type === 'way') {
            const membersCoords = relationsToLatLngs(element)
            membersCoords.forEach((coords) => {
              const polygon = L.polygon(coords, { color: 'red' }).addTo(map.value as L.Map)
              if (element.tags?.name) {
                polygon.bindPopup(element.tags?.name)
              }
            })
          }
        })
      })

      parkWays.forEach((element: OverpassWay) => {
        if (!element.geometry) return
        const coords = wayToLatLng(element)
        const polygon = L.polygon(coords, { color: 'green' }).addTo(map.value as L.Map)
        if (element.tags?.name) {
          polygon.bindPopup(element.tags?.name)
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  initMap()
  await fetchGreenAreas()
  addGreenAreasToMap()
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
