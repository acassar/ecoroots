import './assets/main.css'

import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiChevronLeft, BiChevronRight } from 'oh-vue-icons/icons'

import { definePreset, palette } from '@primevue/themes'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

//TODO: make a service
export const cssVars = getComputedStyle(document.getElementsByTagName('html')[0])
console.log(cssVars.getPropertyValue('--color-primary'))

const customPrimary = palette('#a8c686')

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: customPrimary,
  },
})

addIcons(BiChevronLeft, BiChevronRight)
app.component('v-icon', OhVueIcon)

app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
})

app.mount('#app')
