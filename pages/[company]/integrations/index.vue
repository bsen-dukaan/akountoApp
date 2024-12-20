<template>
  <div>
    <header class="mb-8">
      <h2 class="text-2xl font-bold">Integrations</h2>
      <p class="text-gray-600">
        Connect your Finny account with your favorite accounting systems.
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Integration Cards -->
      <div class="bg-white rounded-lg p-6">
        <img
          src="https://logo.clearbit.com/quickbooks.com"
          alt="QuickBooks Logo"
          class="h-12 mb-4"
        />
        <h3 class="text-xl font-semibold mb-2">QuickBooks</h3>
        <p class="text-gray-600 mb-4">
          Connect with QuickBooks for seamless accounting integration.
        </p>
        <button
          :class="{
            'border border-blue-500 text-blue-500 bg-white py-2 px-4 rounded-md hover:opacity-50':
              integratedTo.quickbooks,
            'bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600':
              !integratedTo.quickbooks,
          }"
        >
          {{ integratedTo.quickbooks ? "Disconnect" : "Connect" }}
        </button>
        <button
          class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-4 float-right"
        >
          Settings
        </button>
      </div>
      <!-- <div class="bg-white rounded-lg  p-6">
                        <img src="https://logo.clearbit.com/xero.com" alt="Xero Logo" class="h-12 mb-4">
                        <h3 class="text-xl font-semibold mb-2">Xero</h3>
                        <p class="text-gray-600 mb-4">Integrate with Xero to streamline your accounting processes.</p>
                        <button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Connect</button>
                    </div>
                    <div class="bg-white rounded-lg  p-6">
                        <img src="https://logo.clearbit.com/sage.com" alt="Sage Logo" class="h-12 mb-4">
                        <h3 class="text-xl font-semibold mb-2">Sage</h3>
                        <p class="text-gray-600 mb-4">Connect with Sage for efficient accounting management.</p>
                        <button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Connect</button>
                    </div> -->
      <!-- Add more integration cards -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const route = useRoute();

const integrations = ref([]);
const integratedTo = ref({
  quickbooks: false,
});

async function fetchIntegrations() {
  try {
    const response = await useNuxtApp().$api.integrations.list(
      route.params.company,
    );

    const hasQuickBooks = response.data.filter(
      (item) => item.service_type === "Quickbooks",
    );

    if (hasQuickBooks.length > 0) {
      integratedTo.value.quickbooks = true;
    }

    response.data = integrations.value;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchIntegrations();
});
</script>
