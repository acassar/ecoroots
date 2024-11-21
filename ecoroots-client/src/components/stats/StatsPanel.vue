<script setup lang="ts">
import { CssVariables } from '@/services/css/cssVarService'
import type { TUseGreenAreasTypes } from '@/stores/useGreenAreasTypes'
import type { TGreenAreasType } from '@/types/greenAreasTypes/greenAreasTypes'
import type { EChartsOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import type {
  PieCallbackDataParams,
  PieDataItemOption,
} from 'echarts/types/src/chart/pie/PieSeries.js'
import { computed } from 'vue'
import VChart from 'vue-echarts'

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const props = defineProps<{
  data: PieDataItemOption[]
  greenAreasTypes: TUseGreenAreasTypes
}>()

const getDataColor = (data: PieCallbackDataParams) => {
  return props.greenAreasTypes.getTypeColor(data.name as TGreenAreasType)
}

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '0%',
      left: 'center',
    },
    series: [
      {
        name: 'Espaces verts',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 5,
          borderColor: CssVariables.getCssVar('--color-background'),
          borderWidth: 5,
          color: getDataColor,
        },
        data: props.data,
      },
    ],
  }
})

// echart doesn't export types for events
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legendSelectChanged = (event: any) => {
  console.log(event)
  if (props.greenAreasTypes.greenAreaTypes.value.has(event.name))
    props.greenAreasTypes.removeGreenAreaType(event.name)
  else props.greenAreasTypes.addGreenAreaType(event.name)
}
</script>

<template>
  <div class="stats-container">
    <div class="panel">
      <span>
        <h1>Statistiques</h1>
      </span>
      <div>
        <v-chart class="pie" :option="option" @legendselectchanged="legendSelectChanged" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  height: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.panel {
  padding: 0.5rem 2rem;
  margin: var(--panel-margin);
  border-radius: 1rem;
  width: var(--panel-width);
}

.panel > span {
  text-align: center;
}

.pie {
  height: 300px;
  width: 100%;
}
</style>
