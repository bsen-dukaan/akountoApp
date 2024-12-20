<template>
  <div class="bg-white rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">
      Daily Document Uploads
    </h3>
    <div ref="chartRef" style="height: 300px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const chartRef = ref(null);
const uploadData = ref([]);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const data = await $api.dashboard.get();
    uploadData.value = data.data.dateWiseDocs;

    const options = {
      series: [
        {
          name: "Documents Uploaded",
          data: uploadData.value.map((item) => item.count),
        },
      ],
      chart: {
        height: 200,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: uploadData.value.map((item) => item.date),
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      colors: ["#3B82F6"], // Blue color to match your theme
    };

    const chart = new ApexCharts(chartRef.value, options);
    chart.render();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
});
</script>
