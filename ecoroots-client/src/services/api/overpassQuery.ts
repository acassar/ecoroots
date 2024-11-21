import type { OverpassTurboResponse } from '@/types/overpassTurbo/OverpassTurboTypes'

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter'

/**
 * Retrieves data from the overpass API
 * @param query the overpass query to fetch data
 * @returns data from the overpass query
 */
export async function fetchOverpassData(query: string): Promise<OverpassTurboResponse> {
  const response = await fetch(OVERPASS_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`)
  }

  return response.json()
}
