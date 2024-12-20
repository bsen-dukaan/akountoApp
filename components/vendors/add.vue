<template>
  <TransitionRoot as="template" :show="isAddVendorModalOpen">
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
                  @submit.prevent="addVendor"
                >
                  <div class="flex-1">
                    <!-- Header -->
                    <div class="bg-gray-50 px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between space-x-3">
                        <div class="space-y-1">
                          <DialogTitle
                            class="text-lg leading-6 font-medium text-gray-900"
                            >Add Vendor</DialogTitle
                          >
                          <p class="text-sm text-gray-500">
                            Fill in the information below to add a new vendor.
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
                      <!-- Name -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="name"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Name</label
                          >
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            type="text"
                            v-model="newVendor.Name"
                            id="name"
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
                            v-model="newVendor.Email"
                            id="primaryEmail"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <!-- Phone -->

                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="phone"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Phone</label
                          >
                        </div>
                        <div class="sm:col-span-2">
                          <input
                            type="text"
                            v-model="newVendor.Phone"
                            id="phone"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <!-- Address -->
                      <div
                        class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
                      >
                        <div>
                          <label
                            for="address"
                            class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >Address</label
                          >
                        </div>
                        <div class="sm:col-span-2 flex flex-col gap-2">
                          <input
                            type="text"
                            v-model="newVendor.Address.Line1"
                            placeholder="Line 1"
                            id="line1"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newVendor.Address.City"
                            placeholder="City"
                            id="city"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newVendor.Address.State"
                            placeholder="State"
                            id="state"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            v-model="newVendor.Address.ZipCode"
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

const newVendor = ref({
  Name: "",
  Email: "",
  Phone: "",
  Address: {
    Line1: "",
    City: "",
    State: "",
    ZipCode: "",
  },
});

const route = useRoute();

const companyId = process.client ? localStorage.getItem("companyID") || "" : "";

const props = defineProps(["isAddVendorModalOpen"]);
const emit = defineEmits(["close-dialog"]);

const closeDialog = () => {
  emit("close-dialog");
};

const addVendor = async () => {
  try {
    await useNuxtApp().$api.vendors.create(companyId, {
      name: newVendor.value.Name,
      email: newVendor.value.Email,
      phone: newVendor.value.Phone,
      address: {
        Line1: newVendor.value.Address.Line1,
        Line2: "",
        City: newVendor.value.Address.City,
        State: newVendor.value.Address.State,
        ZipCode: newVendor.value.Address.ZipCode,
      },
    });
    // Assuming there's a way to update the parent component's vendor list
    // vendors.value.push(response.data)
  } catch (error) {
    console.error("Failed to add vendor:", error);
  } finally {
    closeDialog();
    newVendor.value = {
      CompanyName: "",
      PrimaryEmailAddr: { Address: "" },
      BillAddr: { Line1: "" },
    }; // Reset form
  }
};
</script>
