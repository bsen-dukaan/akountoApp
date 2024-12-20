<template>
  <div class="container mx-auto p-4 bg-white rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Edit Receipt</h2>
    <form v-if="receipt.id" @submit.prevent="updateReceipt">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="mb-3">
          <label
            for="accountRef"
            class="block text-sm font-medium text-gray-700"
            >Payee</label
          >
          <Listbox v-model="selectedPerson">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="block truncate">{{ selectedPerson.name }}</span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <ChevronUpDownIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="vendor in vendors"
                    :key="vendor.name"
                    :value="vendor"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ vendor.name }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mb-3">
          <label
            for="accountRef"
            class="block text-sm font-medium text-gray-700"
            >Payment account</label
          >
          <input
            type="text"
            id="accountRef"
            v-model="receipt.account_ref"
            disabled
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-3">
          <label for="txnDate" class="block text-sm font-medium text-gray-700"
            >Payment Date</label
          >
          <input
            type="date"
            id="txnDate"
            v-model="receipt.txn_date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <!-- <div class="mb-3">
          <label
            for="paymentType"
            class="block text-sm font-medium text-gray-700"
            >Payment method</label
          >
          <input
            type="text"
            id="paymentType"
            v-model="receipt.payment_type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div> -->
        <!-- <div class="mb-3">
          <label
            for="totalAmount"
            class="block text-sm font-medium text-gray-700"
            >Total Amount</label
          >
          <input
            type="number"
            id="totalAmount"
            v-model="receipt.total_amount"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div> -->
        <div class="mb-3 col-span-1 md:col-span-2 lg:col-span-3">
          <label class="block text-sm font-medium text-gray-700"
            >Line Items</label
          >
          <table class="min-w-full divide-y divide-gray-200 mt-2">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tax code
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in receipt.PurchaseLineItems"
                :key="item.id"
                class="hover:bg-slate-100 hover:cursor-pointer"
                @click="editFieldValue(item)"
              >
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.account_ref }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.amount }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.billable_status }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.tax_code_ref }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const route = useRoute();

const receipt = ref({});
const selectedPerson = ref({});
const vendors = ref([]);

const editField = ref(null);

const receiptStatus = ref("");

function editFieldValue(item) {
  editField.value = item;
}

(async function fetchVendors() {
  try {
    const companyId = process.client
      ? localStorage.getItem("companyID") || ""
      : "";

    const { $api } = useNuxtApp();

    const response = await $api.vendors.list(companyId, 1, -1);

    vendors.value = response.data.results;
  } catch (error) {
    console.error("Failed to fetch vendors:", error);
  }
})();

onMounted(async () => {
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";
  const id = route.query.id;

  const response = await useNuxtApp().$api.documents.get(companyId, id);

  let data = response.data?.receipt;

  receiptStatus.value = response.data.status;

  if (data.txn_date) {
    data.txn_date = moment(data.txn_date).format("YYYY-MM-DD");
  }

  receipt.value = data;
  selectedPerson.value = data.Vendor;
  lineItems.value = data.PurchaseLineItems;
});

async function updateReceipt() {
  const route = useRoute();
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";

  const { account_ref, txn_date, total_amount, payment_type } = receipt.value;

  try {
    if (receiptStatus.value === "Ready") {
      await useNuxtApp().$api.expenses.update(companyId, receipt.value.id, {
        account_ref,
        txn_date,
        total_amount,
        payment_type,
        VendorId: selectedPerson.value.id,
        items: receipt.value.PurchaseLineItems,
      });
    } else if (receiptStatus.value === "MissingData") {
      await useNuxtApp().$api.expenses.updateMissingItems(
        companyId,
        receipt.value.id,
        {
          account_ref,
          txn_date,
          total_amount,
          payment_type,
          VendorId: selectedPerson.value.id,
          items: receipt.value.PurchaseLineItems,
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
