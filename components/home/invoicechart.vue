<template>
    <div class="bg-white rounded-lg  p-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Invoice Status</h3>
      <div ref="chartRef" style="height: 200px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  
  const chartRef = ref(null);
  
  onMounted(() => {
    const options = {
      series: [44, 55, 13, 33],
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: ['Processed', 'Pending', 'Rejected', 'Draft'],
      colors: ['#10B981', '#F59E0B', '#EF4444', '#6B7280'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  
    const chart = new ApexCharts(chartRef.value, options);
    chart.render();
  });
  </script>