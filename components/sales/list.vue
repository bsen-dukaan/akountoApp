<template>
  <div class="mt-0 h-full">
    <SalesEditdocument
      :document="selectedDocument"
      :customers="customers"
      v-if="selectedDocument"
    />

    <div class="hidden sm:block">
      <div class="mt-0 flex flex-col">
        <div
          class="min-w-full overflow-hidden overflow-x-auto align-middle sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  FileName
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Invoice#
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Customer
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Amount
                </th>
                <th
                  class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                  scope="col"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="invoice in documents"
                :key="invoice.id"
                class="bg-white"
              >
                <template v-if="!invoice.processed_data">
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {{ invoice.file_path.slice(-10) }}
                  </td>
                  <td colspan="3" class="px-6 py-4">
                    <div class="animate-pulse flex space-x-4">
                      <div class="flex-1 space-y-1 py-1">
                        <div class="h-2 bg-gray-300 rounded"></div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-3 gap-4"></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <span
                      :class="[
                        statusStyles[invoice.status],
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                      ]"
                      >{{ getStatus(invoice) }}</span
                    >
                  </td>
                </template>
                <template v-else>
                  <td
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 flex items-center"
                  >
                    <DocumentTextIcon class="w-4 h-4 mr-2" />
                    <span
                      class="cursor-pointer text-blue-500"
                      @click="selectDocument(invoice)"
                      >{{ invoice.file_path.slice(-10) }}</span
                    >
                  </td>
                  <td
                    class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 truncate"
                  >
                    {{
                      invoice?.processed_data?.processed_json?.InvoiceNumber.slice(
                        0,
                        10,
                      ) || "-"
                    }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-1 text-sm text-gray-500">
                    <!-- <input
                      v-if="invoice.Invoice.Customer"
                      list="customers"
                      v-model="invoice.Invoice.Customer.name"
                      class="bg-white border border-gray-300 rounded text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-xs h-6 py-0 px-1"
                      placeholder="Select or type"
                    />
                    <span v-else class="animate-pulse">Extracting...</span>
                    <datalist id="customers">
                      <option
                        v-for="customer in customers"
                        :value="customer.name"
                      ></option>
                    </datalist> -->
                    <span>{{ invoice.Invoice.Customer.name }}</span>
                  </td>
                  <td
                    class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
                  >
                    {{
                      invoice?.processed_data?.processed_json?.TotalAmount ||
                      "-"
                    }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <span
                      :class="[
                        statusStyles[invoice.status],
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                      ]"
                      >{{ getStatus(invoice) }}</span
                    >
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { DocumentTextIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  documents: Array,
  customers: Array,
});

const selectedDocument = ref(null);

const selectDocument = (document) => {
  selectedDocument.value = document;
};

const statusStyles = {
  Uploading: "bg-blue-100 text-blue-800",
  Extraction: "bg-orange-100 text-orange-800",
  MissingData: "bg-red-100 text-red-800",
  Ready: "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Processed: "bg-purple-100 text-purple-800",
};

const getStatus = (invoice) => {
  if (invoice.status === "Extraction") {
    return "Extracting Data";
  }

  return invoice.status;
};

watch(
  () => props.customers,
  (newVal, oldVal) => {
    console.log("Customers data changed:", newVal);
  },
);



</script>
