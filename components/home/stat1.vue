<template>
  <div class="bg-white rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Quick Stats</h3>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
        <p class="text-sm text-gray-500">{{ stat.label }}</p>
        <p :class="`text-2xl font-bold ${stat.color}`">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const stats = ref([]);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const data = await $api.dashboard.get();

    console.log("quick stats data:", data.data);
    stats.value = [
      {
        label: "Documents Scanned",
        value: data.data.companyStats.totalDocuments || 0,
        color: "text-blue-500",
      },
      {
        label: "Processed",
        value: data.data.companyStats.completedDocuments || 0,
        color: "text-green-500",
      },
      {
        label: "Failed",
        value: data.data.companyStats.pendingDocuments || 0,
        color: "text-red-500",
      },
      {
        label: "Success Rate",
        value: isNaN(data.data.companyStats.successRate)
          ? 0
          : data.data.companyStats.successRate,
        color: "text-blue-500",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }
});
</script>
