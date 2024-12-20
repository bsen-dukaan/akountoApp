<template>
  <button
    type="button"
    @click="isEditModelOpen = true"
    class="text-indigo-600 hover:text-indigo-900"
  >
    Edit
  </button>
  <TransitionRoot appear :show="isEditModelOpen" as="template">
    <Dialog as="div" @close="closeDialog" class="relative z-10">
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
                Edit customer
              </DialogTitle>

              <div class="mt-4">
                <form @submit.prevent="editCustomer">
                  <fieldset :disabled="loading" class="disabled:opacity-70">
                    <div class="mb-5">
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Customer Name</label
                      >
                      <input
                        type="text"
                        id="name"
                        v-model="editedCustomer.name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Customer Email</label
                      >
                      <input
                        type="email"
                        id="email"
                        v-model="editedCustomer.email"
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
                        v-model="editedCustomer.phone"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Billing Address</label
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
                            :defaultValue="
                              customer.billing_address
                                ? customer.billing_address.Line1 || ''
                                : ''
                            "
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
                            :defaultValue="
                              customer.billing_address
                                ? customer.billing_address.State || ''
                                : ''
                            "
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
                            :defaultValue="
                              customer.billing_address
                                ? customer.billing_address.City || ''
                                : ''
                            "
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
                            :defaultValue="
                              customer.billing_address
                                ? customer.billing_address.ZipCode || ''
                                : ''
                            "
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-5">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Shipping Address</label
                      >
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            for="shippingLine1"
                            class="block text-xs font-medium text-gray-700"
                            >Line 1</label
                          >
                          <input
                            type="text"
                            id="shippingLine1"
                            name="shippingLine1"
                            :defaultValue="
                              customer.shipping_address
                                ? customer.shipping_address.Line1 || ''
                                : ''
                            "
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="shippingState"
                            class="block text-xs font-medium text-gray-700"
                            >State</label
                          >
                          <input
                            type="text"
                            id="shippingState"
                            name="shippingState"
                            :defaultValue="
                              customer.shipping_address
                                ? customer.shipping_address.State || ''
                                : ''
                            "
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="shippingCity"
                            class="block text-xs font-medium text-gray-700"
                            >City</label
                          >
                          <input
                            type="text"
                            id="shippingCity"
                            name="shippingCity"
                            :defaultValue="
                              customer.shipping_address
                                ? customer.shipping_address.City || ''
                                : ''
                            "
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label
                            for="shippingZipCode"
                            class="block text-xs font-medium text-gray-700"
                            >Zip Code</label
                          >
                          <input
                            type="text"
                            id="shippingZipCode"
                            name="shippingZipCode"
                            :defaultValue="
                              customer.shipping_address
                                ? customer.shipping_address.ZipCode || ''
                                : ''
                            "
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
import { ref, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps(["customer", "isEditModelOpen"]);

const emit = defineEmits(["close-dialog"]);

const closeDialog = () => {
  emit("close-dialog");
};

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";
const loading = ref(false);

const editedCustomer = ref({
  name: "",
  email: "",
  phone: "",
  billing_address: {
    Line1: "",
    Line2: "",
    State: "",
    City: "",
    ZipCode: "",
  },
  shipping_address: {
    Line1: "",
    Line2: "",
    State: "",
    City: "",
    ZipCode: "",
  },
});

watch(
  () => props.customer,
  (newCustomer) => {
    editedCustomer.value = {
      ...newCustomer,
      shipping_address: newCustomer.shipping_address || {
        Line1: "",
        Line2: "",
        State: "",
        City: "",
        ZipCode: "",
      },
    };
  },
  { immediate: true, deep: true },
);
async function editCustomer(e) {
  const formData = new FormData(e.target);
  loading.value = true;

  try {
    await useNuxtApp().$api.customers.update(companyId, props.customer.id, {
      name: editedCustomer.value.name,
      email: editedCustomer.value.email,
      phone: editedCustomer.value.phone,
      billing_address: {
        Line1: formData.get("line1") || "",
        Line2: editedCustomer.value.billing_address.Line2 || "",
        State: formData.get("state") || "",
        City: formData.get("city") || "",
        ZipCode: formData.get("zipCode") || "",
      },
      shipping_address: {
        Line1: formData.get("shippingLine1") || "",
        Line2: editedCustomer.value.shipping_address.Line2 || "",
        State: formData.get("shippingState") || "",
        City: formData.get("shippingCity") || "",
        ZipCode: formData.get("shippingZipCode") || "",
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
