<script setup lang="ts">
import { onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const initMap = () => {
    const map = L.map('map').setView([48.8566, 2.3522], 13); //Pointed to Paris

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
};

onMounted(() => {
    initMap();
});
</script>

<template>
    <div id="map-container">
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
