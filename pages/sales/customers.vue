<template>
  <SalesCustomerheading>
    <button
      type="button"
      @click="isAddCustomerModalOpen = true"
      class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add Customer
    </button>
  </SalesCustomerheading>

  <div class="">
    <div
      v-if="isAddCustomerModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    >
      <CustomersAdd
        :isAddCustomerModalOpen="isAddCustomerModalOpen"
        @close-dialog="closeAddCustomerModal"
      />
      {{ isAddCustomerModalOpen }}
    </div>

    <div class="">
      <div
        class="mt-8 flow-root overflow-hidden ring-1 ring-black ring-opacity-5 rounded-lg mt-10"
      >
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div class="overflow-hidden ring-1 ring-black ring-opacity-5">
              <table
                class="min-w-full divide-y divide-gray-300 overflow-x-hidden"
              >
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
                  <tr v-for="customer in customers.results" :key="customer.id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-9000 sm:pl-6"
                    >
                      {{ customer.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ customer.email }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ customer.phone }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{
                        customer.billing_address
                          ? `${customer.billing_address.Line1 || ""}${customer.billing_address.City ? ", " + customer.billing_address.City : ""}${customer.billing_address.State ? ", " + customer.billing_address.State : ""}${customer.billing_address.ZipCode ? ", " + customer.billing_address.ZipCode : ""}`
                          : "N/A"
                      }}
                    </td>

                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <CustomersEdit
                        :customer="customer"
                        :isEditModelOpen="isEditModelOpen"
                        @close-dialog="closeEditCustomerModal"
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
              @click="fetchCustomers(pagination.currentPage - 1)"
              v-if="pagination.currentPage > 1"
              >Previous</a
            >
            <a
              href="#"
              class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              @click="fetchCustomers(pagination.currentPage + 1)"
              v-if="pagination.currentPage < pagination.totalPages"
              >Next</a
            >
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const customers = ref({ stats: {}, results: [] });
const pagination = ref({ currentPage: 1, totalPages: 0, totalCount: 0 });
const isAddCustomerModalOpen = ref(false);
const isEditModelOpen = ref(false);

const token = process.client ? localStorage.getItem("token") || "" : "";

onMounted(() => {
  console.log("test");
  if (!token) {
    navigateTo("/auth/register");
  }
});

const closeAddCustomerModal = () => {
  isAddCustomerModalOpen.value = false;
  fetchCustomers();
};

const closeEditCustomerModal = () => {
  isEditModelOpen.value = false;
  fetchCustomers();
};

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";

async function fetchCustomers(page = 1) {
  try {
    const response = await useNuxtApp().$api.customers.list(companyId, page);
    customers.value = response.data;
    pagination.value.currentPage = response.data.stats.currentPage;
    pagination.value.totalPages = response.data.stats.totalPages;
    pagination.value.totalCount = response.data.stats.totalCount;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  }
}

onMounted(() => {
  fetchCustomers();
});
</script>
