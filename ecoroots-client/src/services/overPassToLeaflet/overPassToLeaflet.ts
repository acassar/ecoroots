import type { OverpassRelation, OverpassWay } from '@/types/overpassTurbo/OverpassTurboTypes'
import type { LatLngExpression } from 'leaflet'

export const wayToLatLng = (way: OverpassWay): LatLngExpression[] => {
  return way.geometry?.map(({ lat, lon }) => [lat, lon]) ?? []
}

export const relationsToLatLngs = (relation: OverpassRelation): LatLngExpression[][] => {
  return relation.members
    .filter((member) => member.type === 'way')
    .map((member) => {
      return member.geometry?.map(({ lat, lon }) => [lat, lon]) ?? []
    })
}

export const getWaysInBounds = (ways: OverpassWay[], bounds: L.LatLngBounds): OverpassWay[] => {
  return ways.filter((way) => {
    return bounds.contains([
      [way.bounds?.minlat ?? 0, way.bounds?.minlon ?? 0],
      [way.bounds?.maxlat ?? 0, way.bounds?.maxlon ?? 0],
    ])
  })
}
