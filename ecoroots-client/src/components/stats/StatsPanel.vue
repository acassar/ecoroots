<script setup lang="ts">
import { cssVars } from '@/main'
import type { EChartsOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed } from 'vue'
import VChart from 'vue-echarts'

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const props = defineProps<{
  data: {
    value: number
    name: string
  }[]
}>()

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
          borderColor: cssVars.getPropertyValue('--color-background'),
          borderWidth: 5,
        },
        data: props.data,
      },
    ],
  }
})
</script>

<template>
  <div class="stats-container">
    <div class="panel">
      <span>
        <h1>Statistiques</h1>
      </span>
      <div>
        <v-chart class="pie" :option="option" />
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
