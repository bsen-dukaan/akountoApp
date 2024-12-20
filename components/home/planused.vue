<template>
  <div class="bg-white rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-2">Your Current Plan</h3>
    <!-- <p class="text-sm text-gray-500 mb-4">Here's how much you've used of your current plan:</p> -->
    <div class="mb-4">
      <div class="flex justify-between mb-1">
        <span class="text-sm text-gray-500">Documents Processed</span>
        <span class="text-sm font-semibold text-gray-700"
          >{{ usage.current }} / {{ usage.limit }}</span
        >
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div
          class="bg-blue-600 h-2.5 rounded-full"
          :style="{ width: `${usagePercentage}%` }"
        ></div>
      </div>
    </div>
    <p class="text-sm text-gray-500 mb-4">
      Need more? upgrade to a higher plan!
    </p>
    <button
      @click="upgradePlan"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Upgrade
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";

const usage = ref({ current: 0, limit: 100 });
const usagePercentage = computed(
  () => (usage.value.current / usage.value.limit) * 100,
);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const data = await $api.dashboard.get();
    usage.value.current = data.data.companyStats.completedDocuments;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }
});

const upgradePlan = () => {
  location.href = "/account/plan";
};
</script>
