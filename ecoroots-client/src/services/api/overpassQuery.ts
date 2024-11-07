import type { OverpassTurboResponse } from "@/types/overpassTurbo/OverpassTurboTypes";

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter';

export async function fetchOverpassData(query: string): Promise<OverpassTurboResponse> {
    const response = await fetch(OVERPASS_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
}