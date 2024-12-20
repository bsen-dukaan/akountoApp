<template>
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold mb-4">Breakdown by Visitor interaction</h3>
      <div ref="chartRef" class="h-64"></div>
      <div class="mt-4 space-y-2">
        <div v-for="(item, index) in interactionData" :key="index" class="flex items-center justify-between">
          <div class="flex items-center">
            <div :style="{ backgroundColor: item.color }" class="w-3 h-3 rounded-full mr-2"></div>
            <span class="text-sm text-gray-600">{{ item.label }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-sm font-medium mr-2">{{ item.percentage }}%</span>
            <span class="text-sm text-gray-500">{{ item.count }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    name: 'VisitorInteractionChart',
    setup() {
      const chartRef = ref(null)
      const interactionData = ref([
        { label: 'Generated new Support Request', count: 198, percentage: 66.7, color: '#6366f1' },
        { label: 'Replied to message or bot', count: 117, percentage: 45.8, color: '#60a5fa' },
        { label: 'Requested human support', count: 18, percentage: 7, color: '#4ade80' },
        { label: 'No interaction', count: 83, percentage: 28.5, color: '#d1d5db' },
      ])
  
      onMounted(() => {
        const options = {
          series: [{
            data: interactionData.value.map(item => item.percentage)
          }],
          chart: {
            type: 'bar',
            height: '100%',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: interactionData.value.map(item => item.label),
            labels: {
              formatter: function (val) {
                return val + "%"
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '12px',
                fontFamily: 'inherit'
              }
            }
          },
          colors: interactionData.value.map(item => item.color),
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "%"
              }
            }
          }
        }
  
        const chart = new ApexCharts(chartRef.value, options)
        chart.render()
      })
  
      return { chartRef, interactionData }
    }
  }
  </script>