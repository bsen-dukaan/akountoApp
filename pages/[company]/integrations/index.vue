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
          @click="handleQuickbooksToggle"
          :disabled="isLoading"
          :class="{
            'border border-blue-500 text-blue-500 bg-white py-2 px-4 rounded-md hover:opacity-50':
              integratedTo.quickbooks,
            'bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600':
              !integratedTo.quickbooks,
          }"
        >
          <span v-if="isLoading">{{ loadingMessage }}</span>
          <span v-else>{{
            integratedTo.quickbooks ? "Disconnect" : "Connect"
          }}</span>
        </button>
        <button
          class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-4 float-right"
        >
          Settings
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2"
      >
        <div class="loader"></div>
        <p class="text-gray-700">{{ loadingMessage }}</p>
      </div>
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
const isLoading = ref(false);
const loadingMessage = ref("");
const error = ref(null);

async function fetchIntegrations() {
  try {
    const response = await useNuxtApp().$api.integrations.list(
      route.params.company,
    );

    const hasQuickBooks = response.data.filter(
      (item) => item.service_type === "Quickbooks",
    );

    integratedTo.value.quickbooks = hasQuickBooks.length > 0;
    integrations.value = response.data;
  } catch (error) {
    console.error("Error fetching integrations:", error);
  }
}

async function handleConnect() {
  isLoading.value = true;
  loadingMessage.value = "Initiating QuickBooks connection...";

  try {
    const companyId = route.params.company;
    if (!companyId) throw new Error("Company ID not found");

    const response = await useNuxtApp().$api.quickbooks.auth(companyId);
    if (response.data) {
      window.location.href = response.data;
    }
  } catch (error) {
    console.error("Connection error:", error);
    error.value = "Failed to connect to QuickBooks. Please try again.";
  } finally {
    isLoading.value = false;
    loadingMessage.value = "";
  }
}

async function handleDisconnect() {
  try {
    isLoading.value = true;
    loadingMessage.value = "Disconnecting from QuickBooks...";

    const companyId = route.params.company;
    if (!companyId) throw new Error("Company ID not found");

    const response = await fetch(
      `http://localhost:4000/api/delete-quickbooks-integration/${companyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to disconnect QuickBooks");
    }

    integratedTo.value.quickbooks = false;
    await fetchIntegrations();
  } catch (error) {
    console.error("Disconnection error:", error);
    error.value = error.message;
  } finally {
    isLoading.value = false;
    loadingMessage.value = "";
  }
}

async function handleQuickbooksToggle() {
  if (integratedTo.value.quickbooks) {
    await handleDisconnect();
  } else {
    await handleConnect();
  }
}

onMounted(() => {
  fetchIntegrations();
});
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
