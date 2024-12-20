<template>
  <!-- <HomeDash1 /> -->

  <div class="grid grid-cols-12 gap-4 -mt-6">
    <div class="col-span-8">
      <HomeSearch class="mb-4" />

      <div class="grid grid-cols-2 gap-4 py-0 mt-0">
        <HomeStat1 :stats="userStats" />

        <HomeQuickactions class="" />
      </div>

      <HomeTrend class="my-4 h-72" />

      <div class="grid grid-cols-2 gap-4 mt-2">
        <HomePlanused :usage="planUsage" />
        <HomeRecent class="" />
      </div>
    </div>

    <div class="col-span-4">
      <!-- <HomePlanused class=" max-w-sm md:p-6 ml-0"/> -->

      <div
        class="max-w-sm w-full bg-white rounded-lg dark:bg-gray-800 p-4 md:p-6 ml-0 mt-0"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Account Overview
            </h3>

            <p class="text-xs text-gray-500 my-1">
              Resource uses and available resources
            </p>
          </div>
        </div>

        <hr class="my-4 border-gray-200 dark:border-gray-700" />

        <!-- Radial Chart -->
        <HomeRadial :name="'name'" />

        <div class="">
          <hr class="my-4 border-gray-200 dark:border-gray-700" />

          <div class="flex items-center justify-between text-sm text-gray-400">
            <p class="font-medium text-gray-600 dark:text-gray-200 pb-2">
              Documents Scanned
            </p>
            <p class="font-semibold text-gray-900 dark:text-white pb-2">
              {{ companyStats.totalDocuments }}/100
            </p>
          </div>

          <div class="w-full h-2 mb-4 bg-green-200 rounded-full">
            <div
              class="h-full text-xs text-center text-white bg-green-500 rounded-full"
              :style="{
                width: `${(companyStats.totalDocuments / 100) * 100}%`,
              }"
            ></div>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-400">
            <p class="font-medium text-gray-600 dark:text-gray-200 pb-2">
              Users
            </p>
            <p class="font-semibold text-gray-900 dark:text-white pb-2">
              {{ companyStats.totalUsers }}/10
            </p>
          </div>
          <div class="w-full h-2 mb-4 bg-indigo-200 rounded-full">
            <div
              class="h-full text-xs text-center text-white bg-indigo-500 rounded-full"
              :style="{ width: `${(companyStats.totalUsers / 10) * 100}%` }"
            ></div>
          </div>
          <div
            class="flex items-center justify-between text-sm text-gray-400 pb-2"
          >
            <p class="font-medium text-gray-600 dark:text-gray-200">Storage</p>
            <p class="font-semibold text-gray-900 dark:text-white pb-2">2/8</p>
          </div>
          <div class="w-full h-2 mb-4 bg-blue-200 rounded-full hidden">
            <div
              class="w-1/4 h-full text-xs text-center text-white bg-blue-500 rounded-full"
            ></div>
          </div>

          <!-- <hr class="my-4 border-gray-200 dark:border-gray-700">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upgrade Plan
          </button> -->
        </div>
      </div>

      <HomeOnboarding class="max-w-sm md:p-6 ml-0 mt-4" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const userStats = ref({});
const companyStats = ref({});
const planUsage = ref({});

const token = process.client ? localStorage.getItem("token") || "" : "";

onMounted(async () => {
  console.log("test");
  if (!token) {
    navigateTo("/auth/register");
  } else {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.dashboard.get();
      userStats.value = response.data.userStats;
      companyStats.value = response.data.companyStats;
      planUsage.value = response.data.planUsage;
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }
});
</script>
