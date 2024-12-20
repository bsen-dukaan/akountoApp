<template>
  <ExpensesHeading :uploadFile="uploadFile" />
  <div class="md:flex">
    <ExpensesNav :active="status" :documentCounts="documentCounts" />
    <div
      class="px-6 bg-gray-100 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full"
    >
      <div v-if="loading" class="loading-shimmer">
        <!-- Add loading shimmer effect here -->
        <div
          class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 max-w-full mb-4"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 max-w-full mb-4"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-full dark:bg-gray-800 max-w-full mb-4"
        ></div>
      </div>
      <div v-else>
        <ExpensesList
          v-if="documents.length > 0"
          :documents="documents"
          :vendors="vendors"
          :companyId="companyId"
          :status="status"
        />
        <ExpensesEmpty v-else class="w-1/2 pl-20" :uploadFile="uploadFile" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

const documents = ref([]);
const documentCounts = ref({});
const vendors = ref([]);
const loading = ref(false);

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";
const status = computed(() => route.query.status || "All");

let intervalId;

const token = process.client ? localStorage.getItem("token") || "" : "";

onMounted(() => {
  console.log("test");
  if (!token) {
    navigateTo("/auth/register");
  }
});

onMounted(async () => {
  await fetchVendors();
  await fetchDocuments();
  await fetchDocumentStats();
  intervalId = setInterval(async () => {
    await fetchDocuments();
    await fetchDocumentStats();
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
watch(status, async () => {
  loading.value = true;
  documents.value = [];
  await fetchDocuments();
  loading.value = false;
});
const fetchDocuments = async () => {
  try {
    let query = {
      type: "Receipt",
      status: status.value,
    };
    if (status.value === "All") delete query.status;

    const response = await useNuxtApp().$api.documents.list(companyId, query);
    documents.value = response.data.documents;
  } catch (error) {
    console.error("Failed to fetch receipts:", error);
  }
};

const fetchDocumentStats = async () => {
  try {
    const response = await useNuxtApp().$api.documents.stats(
      companyId,
      "Receipt",
    );
    documentCounts.value = response.data.reduce((counts, stat) => {
      counts[stat.status] = stat.count;
      return counts;
    }, {});
  } catch (error) {
    console.error("Failed to fetch document stats:", error);
  }
};

const fetchVendors = async () => {
  const response = await useNuxtApp().$api.vendors.list(companyId, 1, -1);
  vendors.value = response.data.results;
};

const uploadFile = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const uploadUrl = `${useNuxtApp().$api.baseURL}/companies/${companyId}/documents/upload`;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "Receipt");

      fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error uploading file:", error));
    });
  }
};
</script>
