<template>
  <header
    class="pb-4 pt-6 sm:pb-6 bg-white mt-0 mb-10 rounded-lg sticky top-5 z-10"
    v-if="documents"
  >
    <div
      class="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap"
    >
      <h1 class="text-base font-semibold leading-7 text-gray-900">Expenses</h1>
      <div
        class="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7"
      >
        <button
          :class="{
            'text-indigo-600': documentStatus === 'Ready',
            'text-gray-700': documentStatus !== 'Ready',
          }"
          @click="changeDocumentStatus('Ready')"
        >
          Ready
          <span
            class="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full"
            >{{ documentCounts.ready }}</span
          >
        </button>
        <button
          :class="{
            'text-indigo-600': documentStatus === 'MissingData',
            'text-gray-700': documentStatus !== 'MissingData',
          }"
          @click="changeDocumentStatus('MissingData')"
        >
          Missing Data
          <span
            class="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
            >{{ documentCounts.missing }}</span
          >
        </button>

        <button
          :class="{
            'text-indigo-600': documentStatus === 'Extraction',
            'text-gray-700': documentStatus !== 'Extraction',
          }"
          @click="changeDocumentStatus('Extraction')"
        >
          Processing
          <span
            class="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-blue-100 bg-blue-600 rounded-full"
            >{{ documentCounts.processing }}</span
          >
        </button>
      </div>

      <button
        @click="triggerFileUpload"
        class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg
          class="-ml-1.5 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 4a1 1 0 112 0v4a1 1 0 11-2 0V7zm4 0a1 1 0 112 0v4a1 1 0 11-2 0V7zm4 0a1 1 0 112 0v4a1 1 0 11-2 0V7z"
            clip-rule="evenodd"
          />
        </svg>
        Upload Receipts
      </button>
      <input
        type="file"
        multiple
        id="fileUpload"
        class="hidden"
        @change="uploadFile"
      />
    </div>
  </header>

  <section class="pt-0 pb-10 overflow-hidden" v-if="documents.length == 0">
    <div class="container px-0 mx-auto">
      <div class="p-6 bg-white border rounded-lg">
        <div class="flex flex-wrap -m-2.5">
          <div class="w-full sm:w-1/3 p-2.5">
            <div class="flex flex-col justify-between pl-10 pt-4">
              <div>
                <h3 class="font-heading mb-2 text-lg font-semibold">
                  Automate Expense Management
                </h3>
                <p class="mb-6 text-neutral-500">
                  Manage your expenses with ease and efficiency using AI-powered
                  automation
                </p>
              </div>
              <div class="block">
                <ul class="mb-10">
                  <li class="flex items-center mb-3.5">
                    <svg
                      class="mr-2.5"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#564AF7"></circle>
                      <path
                        d="M5.91602 10.5833L8.24935 12.9166L14.0827 7.08325"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span class="font-medium">AI-Powered Expense Scanning</span>
                  </li>

                  <li class="flex items-center">
                    <svg
                      class="mr-2.5"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#564AF7"></circle>
                      <path
                        d="M5.91602 10.5833L8.24935 12.9166L14.0827 7.08325"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span class="font-medium"
                      >Seamless Accounting Integration</span
                    >
                  </li>
                </ul>

                <a
                  class="hidden inline-flex flex-wrap items-center justify-center px-3 py-2 text-center text-neutral-50 font-medium bg-indigo-700 hover:bg-indigo-500 rounded-lg transition duration-300"
                  href="#"
                >
                  <span class="mr-3 font-medium">Get Started</span>
                  <svg
                    width="16"
                    height="16"
                    viewbox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 3.3335L14 8.00016M14 8.00016L9.33333 12.6668M14 8.00016L2 8.00016"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/6 p-2.5"></div>
          <div class="w-full sm:w-1/2 p-2.5 border-l border-gray-200">
            <Upload class="m-6" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto"
  >
    <div
      class="bg-white rounded-lg shadow-md"
      v-for="document in filteredDocuments"
      :key="document.id"
    >
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold mb-0">Expense Receipt #1</h3>
      </div>
      <img
        v-if="document.processed_image_file_paths"
        :src="document.processed_image_file_paths[0]"
        alt="Processed Expense Receipt"
        class="w-full h-48 object-fill rounded-t-lg"
        height="50px"
      />
      <div v-else class="animate-pulse w-full h-56 bg-gray-300"></div>

      <div class="p-4 border-t border-gray-200">
        <!-- <h3 class="text-lg font-semibold mb-1">Expense Receipt #1</h3> -->
        <p class="text-gray-600 text-sm mb-2 border-b border-gray-200 pb-4">
          <span class="font-semibold">Date: </span
          >{{ moment(document.Purchase.txn_date).format("YYYY-MM-DD") }}<br />
          <span class="font-semibold">Type:</span> Receipt
        </p>
        <div class="flex justify-between items-center pt-2">
          <span
            v-if="document.status === 'Inbox'"
            class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
            >Inbox</span
          >
          <span
            v-else-if="document.status === 'Extraction'"
            class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
            >Extracting Data</span
          >
          <span
            v-else-if="document.status === 'Ready'"
            class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
            >Ready</span
          >
          <span
            v-else-if="document.status === 'MissingData'"
            class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
            >Missing Data</span
          >
          <span
            v-else-if="document.status === 'Processed'"
            class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
            >Processed</span
          >
          <span
            v-else-if="document.status === 'Failed'"
            class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
            >Failed</span
          >
          <span
            v-else-if="document.status === 'Processing'"
            class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >Processing</span
          >
          <NuxtLink
            :to="`/${$route.params.company}/expenses/edit/?id=${document.id}`"
            class="text-blue-500 hover:text-blue-600 text-sm"
            >View Details</NuxtLink
          >
        </div>
      </div>
    </div>
    <!-- Add more expense cards -->
  </div>

  <div class="bg-white rounded-lg overflow-hidden hidden">
    <div class="bg-white overflow-hidden">
      <div class="bg-white rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Document ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vendor
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
              </tr>
            </thead>
            {{}}
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="document in documents" :key="document.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  <NuxtLink
                    :to="`/${$route.params.company}/sales/invoices/edit/?id=${document.id}`"
                    >{{ document.id }}
                  </NuxtLink>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    v-if="document.status === 'Inbox'"
                    class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
                    >Inbox</span
                  >
                  <span
                    v-else-if="document.status === 'Extraction'"
                    class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
                    >Extraction</span
                  >
                  <span
                    v-else-if="document.status === 'Ready'"
                    class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >Ready</span
                  >
                  <span
                    v-else-if="document.status === 'MissingData'"
                    class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
                    >Missing Data</span
                  >
                  <span
                    v-else-if="document.status === 'Processed'"
                    class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                    >Processed</span
                  >
                  <span
                    v-else-if="document.status === 'Failed'"
                    class="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
                    >Failed</span
                  >
                  <span
                    v-else-if="document.status === 'Processing'"
                    class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                    >Processing</span
                  >
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ document.createdAt }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Select Vendor</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Select Category</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">1</span>
                to
                <span class="font-medium">10</span>
                of
                <span class="font-medium">{{ pagination.totalItems }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import moment from "moment";

const tabs = [
  { name: "Inbox", href: "#", current: true, count: 10 },
  { name: "Processing", href: "#", current: false, count: 2 },
  { name: "Processed", href: "#", current: false, count: 5 },
  { name: "Failed", href: "#", current: false, count: 9 },
  { name: "Archived", href: "#", current: false, count: 9 },
];

const documents = ref([]);

const pagination = ref({
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 0,
});

const documentStatus = ref("Ready");

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";

const triggerFileUpload = () => {
  document.getElementById("fileUpload").click();
};

const changeDocumentStatus = (status) => {
  documentStatus.value = status;
  console.log("clicked", status, documentStatus.value);
};

const uploadFile = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const uploadUrl = `${useNuxtApp().$api.baseURL}/companies/${useRoute().params.company}/documents/upload`;

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

onMounted(async () => {
  fetchDocuments();
  setInterval(fetchDocuments, 1000);
});

const fetchDocuments = async () => {
  try {
    const response = await useNuxtApp().$api.documents.list(
      companyId,
      "Receipt",
    );
    documents.value = response.data.documents;

    pagination.value = response.data.pagination;
  } catch (error) {
    console.error("Failed to fetch receipt:", error);
  }
};

const filteredDocuments = computed(() => {
  return documents.value.filter(
    (document) => document.status === documentStatus.value,
  );
});

const documentCounts = computed(() => {
  const counts = {
    missing: documents.value.filter((doc) => doc.status === "MissingData")
      .length,
    ready: documents.value.filter((doc) => doc.status === "Ready").length,
    processing: documents.value.filter((doc) => doc.status === "Extraction")
      .length,
  };

  return counts;
});
</script>
