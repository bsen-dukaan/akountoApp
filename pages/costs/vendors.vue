<template>
  <div
    class="bg-white p-5 sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 -mx-8 -mt-10 mb-10"
  >
    <div class="flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight"
      >
        Manage Vendors
      </h2>
      <p class="mt-2 text-sm text-gray-500">
        Manage and oversee your customer interactions effectively.
      </p>
    </div>

    <button
      type="button"
      @click="isAddVendorModalOpen = true"
      class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add Vendor
    </button>
  </div>

  <div class="">
    <div
      v-if="isAddVendorModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    >
      <VendorsAdd
        :isAddVendorModalOpen="isAddVendorModalOpen"
        @close-dialog="closeAddCustomerModal"
      />
    </div>
    <div
      class="mt-8 flow-root mt-8 flow-root overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg mt-10"
    >
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden ring-1 ring-black ring-opacity-5">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Billing Address
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="vendor in vendors.results" :key="vendor.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ vendor.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ vendor.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ vendor.phone }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{
                      vendor.address
                        ? `${vendor.address.Line1 || ""}${vendor.address.City ? ", " + vendor.address.City : ""}${vendor.address.State ? ", " + vendor.address.State : ""}${vendor.address.ZipCode ? ", " + vendor.address.ZipCode : ""}`
                        : "N/A"
                    }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <VendorsEdit
                      :vendor="vendor"
                      :isEditModelOpen="isEditModelOpen"
                      @close-dialog="closeEditVendorModal"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div class="hidden sm:block">
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{
              (pagination.currentPage - 1) * 10 + 1
            }}</span>
            to
            <span class="font-medium">{{
              Math.min(pagination.currentPage * 10, pagination.totalCount)
            }}</span>
            of
            <span class="font-medium">{{ pagination.totalCount }}</span>
            results
          </p>
        </div>
        <div class="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            @click="fetchVendors(pagination.currentPage - 1)"
            v-if="pagination.currentPage > 1"
            >Previous</a
          >
          <a
            href="#"
            class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            @click="fetchVendors(pagination.currentPage + 1)"
            v-if="pagination.currentPage < pagination.totalPages"
            >Next</a
          >
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const vendors = ref({ stats: {}, results: [] });
const pagination = ref({ currentPage: 1, totalPages: 0, totalCount: 0 });
const isAddVendorModalOpen = ref(false);
const isEditModelOpen = ref(false);

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";

const token = process.client ? localStorage.getItem("token") || "" : "";

onMounted(() => {
  console.log("test");
  if (!token) {
    navigateTo("/auth/register");
  }
});

const closeAddCustomerModal = () => {
  isAddVendorModalOpen.value = false;
  fetchVendors();
};

const closeEditVendorModal = () => {
  isEditModelOpen.value = false;
  fetchVendors();
};

async function fetchVendors(page = 1) {
  try {
    const response = await useNuxtApp().$api.vendors.list(companyId, page);
    vendors.value = response.data;

    pagination.value.currentPage = response.data.stats.currentPage;
    pagination.value.totalPages = response.data.stats.totalPages;
    pagination.value.totalCount = response.data.stats.totalCount;
  } catch (error) {
    console.error("Failed to fetch vendors:", error);
  }
}

onMounted(() => {
  fetchVendors();
});
</script>
