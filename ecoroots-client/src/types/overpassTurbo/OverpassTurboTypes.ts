export interface OverpassTurboResponse {
  elements: OverpassElement[]
}

export type OverpassElement = OverpassNode | OverpassWay | OverpassRelation

export interface OverpassNode {
  type: 'node'
  id: number
  lat: number
  lon: number
  tags?: { [key: string]: string }
}

export interface OverpassWay {
  type: 'way'
  id: number
  nodes: number[]
  tags?: { [key: string]: string }
  geometry?: OverpassGeometry[]
  bounds?: OverpassBounds
}

export interface OverpassRelation {
  type: 'relation'
  id: number
  members: OverpassMember[]
  tags?: { [key: string]: string }
  OverpassBounds?: OverpassBounds
}

export interface OverpassMember {
  type: 'node' | 'way' | 'relation'
  ref: number
  role: string
  geometry?: []
}

export type OverpassGeometry = { lat: number; lon: number }
export type OverpassBounds = { minlat: number; minlon: number; maxlat: number; maxlon: number }
