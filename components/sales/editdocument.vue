<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="close()">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-full">
                <form
                  @submit.prevent="updateInvoice"
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                >
                  <div class="flex-1">
                    <!-- Header -->
                    <div class="bg-gray-50 px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle
                            class="text-base font-semibold leading-6 text-gray-900"
                            >Edit Document
                          </DialogTitle>
                          <p class="text-sm text-gray-500">
                            Edit the document below to update the existing
                            document.
                          </p>
                        </div>
                        <div class="flex h-7 items-center">
                          <button
                            type="button"
                            class="relative text-gray-400 hover:text-gray-500"
                            @click="open = false"
                          >
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-wrap -mx-3">
                      <div class="w-1/2 px-3 mb-6">
                        <div class="mb-3 overflow-auto" style="height: 70vh">
                          <div
                            v-if="
                              document.length &&
                              document.processed_image_file_paths.length > 1
                            "
                          >
                            <div
                              class="bg-blue-100 border border-blue-500 text-blue-700 px-4 py-3 rounded relative"
                              role="alert"
                            >
                              <span class="block sm:inline mx-auto my-auto"
                                >Multiple images available. Scroll to view
                                all.</span
                              >
                            </div>
                          </div>
                          <div
                            v-for="(
                              imagePath, index
                            ) in document.processed_image_file_paths"
                            :key="index"
                          >
                            <img
                              :src="imagePath"
                              :alt="'Processed Document Image ' + (index + 1)"
                              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm"
                            />
                            <hr
                              class="my-4 border-t border-dashed border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="w-1/2 px-3 mb-6">
                        <div class="container mx-auto p-4 bg-gray-50">
                          <form
                            v-if="invoice.id"
                            @submit.prevent="updateInvoice"
                          >
                            <fieldset
                              :disabled="loading"
                              class="disabled:opacity-70"
                            >
                              <div
                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                              >
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
                                  <label
                                    for="date"
                                    class="block text-sm font-medium text-gray-700"
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
                                  <label
                                    for="dueDate"
                                    class="block text-sm font-medium text-gray-700"
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
                                    >Customer Name *</label
                                  >

                                  <Listbox v-model="selectedPerson">
                                    <div class="relative mt-1">
                                      <ListboxButton
                                        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                      >
                                        <span class="block truncate">{{
                                          selectedPerson.name
                                        }}</span>
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
                                                  selected
                                                    ? 'font-medium'
                                                    : 'font-normal',
                                                  'block truncate',
                                                ]"
                                                >{{ customer.name }}</span
                                              >
                                              <span
                                                v-if="selected"
                                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                              >
                                                <CheckIcon
                                                  class="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            </li>
                                          </ListboxOption>
                                        </ListboxOptions>
                                      </transition>
                                    </div>
                                  </Listbox>
                                </div>
                                <!-- Billing and Shipping Address in two columns -->
                                <div
                                  class="mb-3 col-span-1 md:col-span-2 lg:col-span-3 overflow-auto"
                                  style="height: 200px"
                                >
                                  <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Line Items *</label
                                  >
                                  <table
                                    class="min-w-full divide-y divide-gray-200 mt-2"
                                  >
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
                                    <tbody
                                      class="bg-white divide-y divide-gray-200"
                                    >
                                      <tr
                                        v-for="item in invoice.InvoiceLineItems"
                                        :key="item.id"
                                      >
                                        <td
                                          class="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                                        >
                                          {{ item.description }}
                                        </td>
                                        <td
                                          class="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                                        >
                                          {{ item.quantity }}
                                        </td>
                                        <td
                                          class="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                                        >
                                          {{ item.unit_price }}
                                        </td>
                                        <td
                                          class="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                                        >
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
                                        invoice.bill_address.Line1
                                          ? invoice.bill_address.Line1
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="billingAddressCity"
                                      name="billingAddressCity"
                                      placeholder="city"
                                      :defaultValue="
                                        invoice.bill_address.City
                                          ? invoice.bill_address.City
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="billingAddressState"
                                      name="billingAddressState"
                                      placeholder="state"
                                      :defaultValue="
                                        invoice.bill_address.State
                                          ? invoice.bill_address.State
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="billingAddressZip"
                                      name="billingAddressZip"
                                      placeholder="zip code"
                                      :defaultValue="
                                        invoice.bill_address.ZipCode
                                          ? invoice.bill_address.ZipCode
                                          : ''
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
                                        invoice.ship_address.Line1
                                          ? invoice.ship_address.Line1
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="shippingAddressCity"
                                      name="shippingAddressCity"
                                      placeholder="city"
                                      :defaultValue="
                                        invoice.ship_address.City
                                          ? invoice.ship_address.City
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="shippingAddressState"
                                      name="shippingAddressState"
                                      placeholder="state"
                                      :defaultValue="
                                        invoice.ship_address.State
                                          ? invoice.ship_address.State
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <input
                                      id="shippingAddressZip"
                                      name="shippingAddressZip"
                                      placeholder="zip code"
                                      :defaultValue="
                                        invoice.ship_address.ZipCode
                                          ? invoice.ship_address.ZipCode
                                          : ''
                                      "
                                      rows="5"
                                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <!-- Additional customer details fields -->
                                <div
                                  class="mb-3 col-span-1 md:col-span-2 lg:col-span-3"
                                >
                                  <label
                                    for="notes"
                                    class="block text-sm font-medium text-gray-700"
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
                            </fieldset>
                          </form>
                        </div>
                      </div>
                    </div>

                    <!-- Divider container -->
                  </div>

                  <!-- Action buttons -->
                  <div
                    class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6"
                  >
                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        :disabled="loading"
                        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        @click="open = false"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        :disabled="loading"
                        class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ loading ? "Updating..." : "Update" }}
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import moment from "moment";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  document: Object,
  customers: Array,
});

const open = ref(false);
const document = ref({});
const document_status = ref();

const invoice = ref({});
const selectedPerson = ref({});
const loading = ref(false);

const close = () => {
  open.value = false;
  document.value = {};
  invoice.value = {};
};

const fetchDocument = async () => {
  const route = useRoute();
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";
  const id = document.value.id;

  const response = await useNuxtApp().$api.documents.get(companyId, id);

  let data = response.data?.invoice;
  // if (data.Customer.billing_address) {
  //   data.Customer.billing_address = Object.values(data.Customer.billing_address)
  //     .filter((value) => value?.trim())
  //     .join("\n");
  // }
  // if (data.Customer.shipping_address) {
  //   data.Customer.shipping_address = Object.values(
  //     data.Customer.shipping_address,
  //   )
  //     .filter((value) => value.trim())
  //     .join("\n");
  // }

  if (data.date) {
    data.date = moment(data.date).format("YYYY-MM-DD");
  }

  if (data.due_date) {
    data.due_date = moment(data.due_date).format("YYYY-MM-DD");
  }

  invoice.value = data;
  selectedPerson.value = invoice.value.Customer;

  document_status.value = response.data.status;
};

onUnmounted(() => {
  invoice.value = {};
});

watch(
  () => props.document,
  (newVal) => {
    document.value = newVal;
    open.value = true;
    fetchDocument();
  },
  { immediate: true },
);

watch(
  () => props.customers,
  (newVal, oldVal) => {
    console.log("Customers data changed:", newVal);
  },
);

async function updateInvoice(e) {
  const route = useRoute();
  const companyId = process.client
    ? localStorage.getItem("companyID") || ""
    : "";
  const formData = new FormData(e.target);

  loading.value = true;

  const {
    id,
    invoice_number,
    date,
    due_date,
    total_amount,
    notes,
    CustomerId,
  } = invoice.value;

  const data = {
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
  };

  try {
    if (document_status.value === "Ready") {
      await useNuxtApp().$api.invoices.update(companyId, id, data);
    } else if (document_status.value === "MissingData") {
      await useNuxtApp().$api.invoices.updateMissingItems(companyId, id, data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
