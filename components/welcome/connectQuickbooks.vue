<template>
  <div class="border-b border-gray-200 -mx-8">
    <div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
      <div class="mb-2 -mt-4">
        <div class="flex items-center">
          <div class="ml-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Step 2: Setup accounting integration
            </h3>
            <p class="text-sm text-gray-500">
              Setup your accounting integration to get your financial data into
              Kounto.
            </p>
          </div>
        </div>
      </div>
      <div class="ml-4 mt-4 flex flex-shrink-0"></div>
    </div>
  </div>

  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 border-b border-gray-200 pb-10"
  >
    <div
      v-for="integration in integrations"
      :key="integration.id"
      class="group relative border bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
    >
      <img
        :src="`https://logo.clearbit.com/${integration.logo}`"
        :alt="integration.name"
        class="h-12 w-12 rounded-full"
      />
      <div class="mt-2 text-center">
        <div class="text-sm font-medium text-gray-900">
          {{ integration.name }}
        </div>
        <div
          v-if="integration.id !== 1"
          class="mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
        >
          soon
        </div>
      </div>
      <div
        v-if="selectedIntegration.id === integration.id"
        class="absolute inset-0 bg-indigo-600 bg-opacity-10 border border-indigo-600 rounded-lg"
      ></div>
    </div>
  </div>

  <div v-if="selectedIntegration.id === 1" class="p-5">
    <button
      @click="authQuickbooks"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
    >
      Connect with QuickBooks
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";

const integrations = ref([
  { id: 1, name: "QuickBooks", logo: "quickbooks.com" },
  { id: 2, name: "Xero", logo: "xero.com" },
  { id: 3, name: "Wave", logo: "wave.com" },
  { id: 4, name: "Freshbooks", logo: "freshbooks.com" },
]);

const selectedIntegration = ref({
  id: 1,
  name: "Quickbooks",
  logo: "quickBooks.com",
});

const authQuickbooks = async () => {
  const { $api } = useNuxtApp();

  try {
    console.log("authQuickbooks ---->>>>");
    const companyId = process.client
      ? localStorage.getItem("companyID") || ""
      : "";
    const auth = await $api.quickbooks.auth(companyId);
    console.log("authQuickbooks ---->>>>", auth);
    if (auth.data) {
      navigateTo(auth.data, { external: true });
    }
  } catch (error) {
    console.error("Error while authenticating QuickBooks:", error);
  }
};
</script>
