<template>
  <TransitionRoot as="template" :show="isAddCustomerModalOpen">
    <Dialog as="div" class="fixed inset-0 z-50" @close="closeDialog">
      <div class="fixed inset-0 bg-black opacity-30" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
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
              <DialogPanel class="pointer-events-auto w-screen max-w-2xl">
                <form
                  class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  @submit.prevent="addCustomer"
                >
                  <div class="flex-1">
                    <!-- Header -->
                    <div class="bg-gray-50 px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle
                            class="text-lg leading-6 font-medium text-gray-900"
                            >Add Customer</DialogTitle
                          >
                          <p class="text-sm text-gray-500">
                            Fill in the information below to add a new customer.
                          </p>
                        </div>
                        <div class="flex h-7 items-center">
                          <button
                            type="button"
                            class="text-gray-400 hover:text-gray-500"
                            @click="closeDialog"
                          >
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Form Fields -->
                    <div
                      class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0"
                    >
                      <!-- Display Name -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="displayName"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Display Name</label
                          >
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            type="text"
                            v-model="newCustomer.DisplayName"
                            id="displayName"
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <!-- Primary Email -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="primaryEmail"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Primary Email</label
                          >
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            type="email"
                            v-model="newCustomer.PrimaryEmailAddr.Address"
                            id="primaryEmail"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <!-- Phone Number -->

                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="phoneNumber"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Phone Number</label
                          >
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            type="text"
                            v-model="newCustomer.PhoneNumber"
                            id="phoneNumber"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <!-- Billing Address -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="billingAddress"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Billing Address</label
                          >
                        </div>
                        <div class="sm:col-span-2 flex flex-col gap-2">
                          <input
                            type="text"
                            v-model="newCustomer.BillAddr.Line1"
                            placeholder="Line 1"
                            id="line1"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.BillAddr.City"
                            placeholder="City"
                            id="city"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.BillAddr.State"
                            placeholder="State"
                            id="state"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.BillAddr.ZipCode"
                            placeholder="Zip Code"
                            id="billingAddress"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <!-- Shipping Address -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="billingAddress"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Shipping Address</label
                          >
                        </div>
                        <div class="sm:col-span-2 flex flex-col gap-2">
                          <input
                            type="text"
                            v-model="newCustomer.ShipAddr.Line1"
                            placeholder="Line 1"
                            id="line1"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.ShipAddr.City"
                            placeholder="City"
                            id="city"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.ShipAddr.State"
                            placeholder="State"
                            id="state"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newCustomer.ShipAddr.ZipCode"
                            placeholder="Zip Code"
                            id="billingAddress"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Action buttons -->
                  <div
                    class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6"
                  >
                    <div class="flex justify-end space-x-3">
                      <button
                        type="button"
                        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                        @click="closeDialog"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="inline-flex justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      >
                        Add
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
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  isAddCustomerModalOpen: {
    type: Boolean,
  },
});

const { isAddCustomerModalOpen } = toRefs(props);

const emit = defineEmits(["close-dialog"]);

const closeDialog = () => {
  emit("close-dialog");
};

const newCustomer = ref({
  DisplayName: "",
  PhoneNumber: "",
  PrimaryEmailAddr: { Address: "" },
  BillAddr: { Line1: "", City: "", State: "", ZipCode: "" },
  ShipAddr: { Line1: "", City: "", State: "", ZipCode: "" },
});

const addCustomer = async () => {
  try {
    const companyId = process.client ? localStorage.getItem("companyID") || "" : "";
    await useNuxtApp().$api.customers.create(companyId, {
      name: newCustomer.value.DisplayName,
      email: newCustomer.value.PrimaryEmailAddr.Address,
      phone: newCustomer.value.PhoneNumber,
      billing_address: {
        Line1: newCustomer.value.BillAddr.Line1,
        Line2: "",
        City: newCustomer.value.BillAddr.City,
        State: newCustomer.value.BillAddr.State,
        ZipCode: newCustomer.value.BillAddr.ZipCode,
      },
      shipping_address: {
        Line1: newCustomer.value.ShipAddr.Line1,
        Line2: "",
        City: newCustomer.value.ShipAddr.City,
        State: newCustomer.value.ShipAddr.State,
        ZipCode: newCustomer.value.ShipAddr.ZipCode,
      },
    });
    // Assuming there's a way to update the parent component's customer list
    // customers.value.push(response.data)
  } catch (error) {
    console.error("Failed to add customer:", error);
  } finally {
    closeDialog();
    newCustomer.value = {
      DisplayName: "",
      PhoneNumber: "",
      PrimaryEmailAddr: { Address: "" },
      BillAddr: { Line1: "", City: "", State: "", ZipCode: "" },
      ShipAddr: { Line1: "", City: "", State: "", ZipCode: "" },
    }; // Reset form
  }
};
</script>
