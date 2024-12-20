<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-4">Breakdown by Visitor type</h3>
    <div class="h-64">
      <DoughnutChart :data="chartData" :options="chartOptions" />
    </div>
    <div class="mt-4 grid grid-cols-3 gap-4">
      <div v-for="(item, index) in visitorTypeData" :key="index" class="text-center">
        <div :class="['w-3 h-3 rounded-full mx-auto mb-1', item.color]"></div>
        <div class="text-sm font-medium">{{ item.percentage }}%</div>
        <div class="text-xs text-gray-500">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { DoughnutChart } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'VisitorTypeChart',
  components: { DoughnutChart },
  setup() {
    const visitorTypeData = ref([
      { label: 'Visitor', percentage: 44.7, color: 'bg-indigo-500' },
      { label: 'Lead', percentage: 16.8, color: 'bg-blue-400' },
      { label: 'Customer', percentage: 55.5, color: 'bg-green-400' },
    ])

    const chartData = computed(() => ({
      labels: visitorTypeData.value.map(item => item.label),
      datasets: [{
        data: visitorTypeData.value.map(item => item.percentage),
        backgroundColor: visitorTypeData.value.map(item => item.color.replace('bg-', '')),
        borderColor: 'white',
        borderWidth: 2,
      }]
    }))

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.formattedValue}%`
          }
        }
      },
      cutout: '70%'
    }

    return { visitorTypeData, chartData, chartOptions }
  }
}
</script>