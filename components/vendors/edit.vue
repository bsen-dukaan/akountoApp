<template>
  <button
    type="button"
    @click="isEditModelOpen = true"
    class="text-indigo-600 hover:text-indigo-900"
  >
    Edit
  </button>
  <TransitionRoot appear :show="isEditModelOpen" as="template">
    <Dialog as="div" @close="isEditModelOpen = false" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Edit vendor
              </DialogTitle>

              <div class="mt-4">
                <form action="post" @submit.prevent="editVendor">
                  <fieldset :disabled="loading" class="disabled:opacity-70">
                    <div class="mb-5">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Vendor Name</label
                      >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        :defaultValue="vendor.name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Vendor Email</label
                      >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        :defaultValue="vendor.email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700"
                        >Phone number</label
                      >
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        :defaultValue="vendor.phone"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Address</label
                      >
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            for="line1"
                            class="block text-xs font-medium text-gray-700"
                            >Line 1</label
                          >
                          <input
                            type="text"
                            id="line1"
                            name="line1"
                            :defaultValue="vendor.address.Line1 ?? null"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="state"
                            class="block text-xs font-medium text-gray-700"
                            >State</label
                          >
                          <input
                            type="text"
                            id="state"
                            name="state"
                            :defaultValue="vendor.address.State"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="city"
                            class="block text-xs font-medium text-gray-700"
                            >City</label
                          >
                          <input
                            type="text"
                            id="city"
                            name="city"
                            :defaultValue="vendor.address.City"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="zipCode"
                            class="block text-xs font-medium text-gray-700"
                            >Zip Code</label
                          >
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            :defaultValue="vendor.address.ZipCode"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 flex justify-end w-full">
                      <button
                        type="submit"
                        :disabled="loading"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps(["vendor", "isEditModelOpen"]);

const emit = defineEmits(["close-dialog"]);

const closeDialog = () => {
  emit("close-dialog");
};
const loading = ref(false);

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";

async function editVendor(event) {
  loading.value = true;

  try {
    const formData = new FormData(event.target);
    await useNuxtApp().$api.vendors.update(companyId, props.vendor.id, {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: {
        Line1: formData.get("line1"),
        Line2: "",
        City: formData.get("city"),
        State: formData.get("state"),
        ZipCode: formData.get("zipCode"),
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    closeDialog();
    loading.value = false;
  }
}
</script>
