import { useGreenAreasStore } from '@/stores/useGreenAreasStore'
import { ref } from 'vue'
import { fetchOverpassData } from '../../services/api/overpassQuery'
import { OVERPASS_GREEN_AREAS_QUERY } from '../../services/overpassTurbo/queries'

export const useFetchGreenAreas = () => {
  const isLoading = ref(false)
  const { setGreenAreas } = useGreenAreasStore()

  const fetchGreenAreas = async () => {
    try {
      isLoading.value = true
      const data = await fetchOverpassData(OVERPASS_GREEN_AREAS_QUERY)

      setGreenAreas(data.elements)
    } catch (error) {
      console.error('Error fetching Overpass data:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCachedGreenAreas = async () => {
    const { greenAreas } = useGreenAreasStore()

    if (!greenAreas.length) {
      await fetchGreenAreas()
    }
  }

  return { fetchCachedGreenAreas, fetchGreenAreas, isLoading }
}
