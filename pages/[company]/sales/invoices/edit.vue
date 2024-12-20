<template>
  <div class="container mx-auto p-4 bg-white rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Edit Invoice</h2>
    <form v-if="invoice.id" @submit.prevent="updateInvoice">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="mb-3">
          <label
            for="invoiceNumber"
            class="block text-sm font-medium text-gray-700"
            >Invoice Number</label
          >
          <input
            type="text"
            id="invoiceNumber"
            v-model="invoice.invoice_number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-3">
          <label for="date" class="block text-sm font-medium text-gray-700"
            >Date</label
          >
          <input
            type="date"
            id="date"
            v-model="invoice.date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-3">
          <label for="dueDate" class="block text-sm font-medium text-gray-700"
            >Due Date</label
          >
          <input
            type="date"
            id="dueDate"
            v-model="invoice.due_date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-3">
          <label
            for="totalAmount"
            class="block text-sm font-medium text-gray-700"
            >Total Amount</label
          >
          <input
            type="number"
            id="totalAmount"
            v-model="invoice.total_amount"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            readonly
          />
        </div>
        <div class="mb-3">
          <label
            for="customerName"
            class="block text-sm font-medium text-gray-700"
            >Customer Name</label
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
                    v-for="customer in customers"
                    :key="customer.name"
                    :value="customer"
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
                        >{{ customer.name }}</span
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
        <!-- Billing and Shipping Address in two columns -->
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
                  Description
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unit Price
                </th>
                <th
                  scope="col"
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="item in invoice.InvoiceLineItems"
                :key="item.id"
                class="hover:bg-slate-100 hover:cursor-pointer"
                @click="editFieldValue(item)"
              >
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.description }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.quantity }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.unit_price }}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {{ item.total_amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-3 col-span-3">
          <label
            for="billingAddress"
            class="block text-sm font-medium text-gray-700"
            >Billing Address</label
          >
          <div class="grid grid-cols-2 gap-4 w-full">
            <input
              id="billingAddressLine1"
              name="billingAddressLine1"
              placeholder="line 1"
              :defaultValue="
                invoice.bill_address.Line1 ? invoice.bill_address.Line1 : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="billingAddressCity"
              name="billingAddressCity"
              placeholder="city"
              :defaultValue="
                invoice.bill_address.City ? invoice.bill_address.City : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="billingAddressState"
              name="billingAddressState"
              placeholder="state"
              :defaultValue="
                invoice.bill_address.State ? invoice.bill_address.State : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="billingAddressZip"
              name="billingAddressZip"
              placeholder="zip code"
              :defaultValue="
                invoice.bill_address.ZipCode ? invoice.bill_address.ZipCode : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="mb-3 col-span-3">
          <label
            for="shippingAddress"
            class="block text-sm font-medium text-gray-700"
            >Shipping Address</label
          >
          <div class="grid grid-cols-2 gap-4 w-full">
            <input
              id="shippingAddressLine1"
              name="shippingAddressLine1"
              placeholder="line 1"
              :defaultValue="
                invoice.ship_address.Line1 ? invoice.ship_address.Line1 : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="shippingAddressCity"
              name="shippingAddressCity"
              placeholder="city"
              :defaultValue="
                invoice.ship_address.City ? invoice.ship_address.City : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="shippingAddressState"
              name="shippingAddressState"
              placeholder="state"
              :defaultValue="
                invoice.ship_address.State ? invoice.ship_address.State : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              id="shippingAddressZip"
              name="shippingAddressZip"
              placeholder="zip code"
              :defaultValue="
                invoice.ship_address.ZipCode ? invoice.ship_address.ZipCode : ''
              "
              rows="5"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- Additional customer details fields -->
        <div class="mb-3 col-span-1 md:col-span-2 lg:col-span-3">
          <label for="notes" class="block text-sm font-medium text-gray-700"
            >Notes</label
          >
          <textarea
            id="notes"
            v-model="invoice.notes"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
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
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const invoice = ref({});

const invoiceStatus = ref("");

const customers = ref([]);
const selectedPerson = ref({});

const editField = ref(null);

const route = useRoute();

(async function fetchCustomers() {
  try {
    const companyId = process.client
      ? localStorage.getItem("companyID") || ""
      : "";

    const { $api } = useNuxtApp();

    const response = await $api.customers.list(companyId, 1, -1);

    customers.value = response.data.results;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  }
})();

onMounted(async () => {
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";
  const id = route.query.id;
  const response = await useNuxtApp().$api.documents.get(companyId, id);

  let data = response.data?.invoice;
  invoiceStatus.value = response.data.status;

  if (data.date) {
    data.date = moment(data.date).format("YYYY-MM-DD");
  }

  if (data.due_date) {
    data.date = moment(data.due_date).format("YYYY-MM-DD");
  }

  invoice.value = data;
  selectedPerson.value = data.Customer;
});

async function updateInvoice(e) {
  const route = useRoute();
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";
  const formData = new FormData(e.target);

  const {
    id,
    invoice_number,
    date,
    due_date,
    total_amount,
    notes,
    CustomerId,
  } = invoice.value;

  try {
    if (invoiceStatus.value === "Ready") {
      await useNuxtApp().$api.invoices.update(companyId, id, {
        invoice_number,
        date,
        due_date,
        total_amount,
        notes,
        ship_address: {
          Line1: formData.get("shippingAddressLine1"),
          City: formData.get("shippingAddressCity"),
          State: formData.get("shippingAddressState"),
          ZipCode: formData.get("shippingAddressZip"),
        },
        bill_address: {
          Line1: formData.get("billingAddressLine1"),
          City: formData.get("billingAddressCity"),
          State: formData.get("billingAddressState"),
          ZipCode: formData.get("billingAddressZip"),
        },
        CustomerId: selectedPerson.value.id,
        items: invoice.value.InvoiceLineItems,
      });
    } else if (invoiceStatus.value === "MissingData") {
      await useNuxtApp().$api.invoices.updateMissingItems(companyId, id, {
        invoice_number,
        date,
        due_date,
        total_amount,
        notes,
        ship_address: {
          Line1: formData.get("shippingAddressLine1"),
          City: formData.get("shippingAddressCity"),
          State: formData.get("shippingAddressState"),
          ZipCode: formData.get("shippingAddressZip"),
        },
        bill_address: {
          Line1: formData.get("billingAddressLine1"),
          City: formData.get("billingAddressCity"),
          State: formData.get("billingAddressState"),
          ZipCode: formData.get("billingAddressZip"),
        },
        CustomerId: selectedPerson.value.id,
        items: invoice.value.InvoiceLineItems,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
