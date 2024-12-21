<template>
  <div class="mx-auto p-6 bg-white rounded-lg shadow-sm">
    <!-- Header -->
    <div class="mb-8">
      <h2
        class="text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200"
      >
        QuickBooks Integration
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Connect your account with QuickBooks to sync your financial data.
      </p>
    </div>

    <!-- Integration Status Card -->
    <div class="bg-gray-50 rounded-lg p-6 mb-6">
      <!-- QuickBooks Info -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <img
            src="https://media.licdn.com/dms/image/D4D12AQFduz3E6g6COg/article-cover_image-shrink_600_2000/0/1697053235030?e=2147483647&v=beta&t=c2Ia7g8fJ6wAHNlnogLV_Ii765HMqSw16HxgawsxmTw"
            alt="QuickBooks Logo"
            class="w-12 h-12 rounded-lg shadow-sm"
          />
          <div>
            <h3 class="text-lg font-medium text-gray-800">QuickBooks Online</h3>
            <p class="text-sm text-gray-600">Accounting Software Integration</p>
          </div>
        </div>

        <!-- Connection Status Badge -->
        <div
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            isConnected
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800',
          ]"
        >
          {{ isConnected ? "Connected" : "Not Connected" }}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <button
          v-if="!isConnected"
          @click="handleConnect"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Connecting...</span>
          <span v-else>Connect QuickBooks</span>
        </button>

        <button
          v-else
          @click="handleDisconnect"
          class="px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Disconnecting...</span>
          <span v-else>Disconnect</span>
        </button>
      </div>
    </div>

    <!-- Connection Details -->
    <div v-if="isConnected" class="bg-white rounded-lg">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Connection Status</span>
          <span class="text-sm font-medium text-green-600">Active</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Last Synced</span>
          <span class="text-sm text-gray-900">
            {{ formatDate(lastSyncedAt) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <p class="text-gray-700">{{ loadingMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuickBooksIntegration",

  data() {
    return {
      isConnected: false,
      isLoading: false,
      loadingMessage: "",
      integrationId: null,
      companyId: "",
      lastSyncedAt: null,
      error: null,
    };
  },

  methods: {
    formatDate(date) {
      if (!date) return "Never";
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    async handleConnect() {
      this.isLoading = true;
      this.loadingMessage = "Initiating QuickBooks connection...";

      try {
        const companyId = localStorage.getItem("companyID");
        if (!companyId) throw new Error("Company ID not found");

        const response = await this.$api.quickbooks.auth(companyId);
        if (response.data) {
          window.location.href = response.data;
        }
      } catch (error) {
        console.error("Connection error:", error);
        this.error = "Failed to connect to QuickBooks. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },

    async handleDisconnect() {
      if (!confirm("Are you sure you want to disconnect QuickBooks?")) return;

      this.isLoading = true;
      this.loadingMessage = "Disconnecting from QuickBooks...";

      try {
        const companyId = localStorage.getItem("companyID");
        if (!companyId || !this.integrationId) {
          throw new Error("Required IDs not found");
        }

        await this.$api.integrations.update(companyId, this.integrationId, {
          status: "Disconnected",
        });

        this.isConnected = false;
        this.integrationId = null;
        await this.fetchIntegrationStatus();
      } catch (error) {
        console.error("Disconnection error:", error);
        this.error = "Failed to disconnect QuickBooks. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchIntegrationStatus() {
      this.isLoading = true;
      this.loadingMessage = "Checking integration status...";

      try {
        const companyId = localStorage.getItem("companyID");
        if (!companyId) throw new Error("Company ID not found");

        const response = await this.$api.integrations.list(companyId);

        // Update connected status based on response status code
        this.isConnected = response.status === 200;

        // Handle any additional data if needed
        if (response.data) {
          this.integrationId = response.data.integrationId;
          this.lastSyncedAt = response.data.lastSyncedAt;
        }
      } catch (error) {
        console.error("Status check error:", error);
        this.error = "Failed to check integration status.";
        this.isConnected = false;
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    await this.fetchIntegrationStatus();
  },

  watch: {
    $route: {
      handler() {
        this.fetchIntegrationStatus();
      },
      immediate: true,
    },
  },
};
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
