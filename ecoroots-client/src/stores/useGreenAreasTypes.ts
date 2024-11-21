import type { TGreenAreasType } from '@/types/greenAreasTypes/greenAreasTypes'
import type { OverpassWay } from '@/types/overpassTurbo/OverpassTurboTypes'
import { computed, ref, type Ref } from 'vue'

export function useGreenAreasTypes(greenAreasWays: Ref<OverpassWay[]>) {
  // - Filter green areas by type - //
  const parks = computed(() => greenAreasWays.value.filter((way) => way.tags?.leisure === 'park'))
  const gardens = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.leisure === 'garden'),
  )
  const pitchs = computed(() => greenAreasWays.value.filter((way) => way.tags?.leisure === 'pitch'))
  const playgrounds = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.leisure === 'playground'),
  )
  const forests = computed(() =>
    greenAreasWays.value.filter((way) => way.tags?.landuse === 'forest'),
  )
  const woods = computed(() => greenAreasWays.value.filter((way) => way.tags?.natural === 'wood'))
  // -- //

  /**
   * Set of green areas types to display on the map
   */
  const greenAreaTypes = ref<Set<TGreenAreasType>>(
    new Set(['forests', 'woods', 'parks', 'gardens', 'pitchs', 'playgrounds']),
  )

  /**
   * Adds a new green area type to the collection if it does not already exist.
   *
   * @param type - The green area type to be added.
   */
  function addGreenAreaType(type: TGreenAreasType) {
    if (!greenAreaTypes.value.has(type)) {
      greenAreaTypes.value.add(type)
    }
  }

  /**
   * Removes a specified green area type from the collection.
   *
   * @param {TGreenAreasType} type - The type of green area to be removed.
   * @returns {void}
   */
  function removeGreenAreaType(type: TGreenAreasType) {
    console.log('before ', greenAreaTypes.value)
    greenAreaTypes.value.delete(type)
    console.log('after ', greenAreaTypes.value)
  }

  const getTypeColor = (type: TGreenAreasType) => {
    switch (type) {
      case 'forests':
        return '#104911'
      case 'gardens':
        return '#548C2F'
      case 'parks':
        return '#AD7A99'
      case 'pitchs':
        return '#FEDC97'
      case 'playgrounds':
        return '#033F63'
      case 'woods':
        return '#B2CEDE'
      default:
        throw Error('Invalid green area type')
    }
  }

  return {
    parks,
    gardens,
    pitchs,
    playgrounds,
    forests,
    woods,
    greenAreaTypes,
    addGreenAreaType,
    removeGreenAreaType,
    getTypeColor,
  }
}

export type TUseGreenAreasTypes = ReturnType<typeof useGreenAreasTypes>
