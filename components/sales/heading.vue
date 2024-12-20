<template>
  <div
    class="bg-white p-5 sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 -mx-8 -mt-10 mb-10"
  >
    <div class="flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight"
      >
        Manage Invoices
      </h2>
      <p class="mt-2 text-sm text-gray-500">
        Manage and process your sales invoices efficiently.
      </p>
    </div>
    <div class="flex">
      <button
        @click="triggerFileUpload"
        type="button"
        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <DocumentArrowUpIcon
          class="-ml-0.5 mr-1.5 h-5 w-5"
          aria-hidden="true"
        />
        Upload Documents
      </button>
      <input
        type="file"
        multiple
        id="fileUpload"
        class="hidden"
        @change="uploadFile"
      />
    </div>
  </div>
</template>

<script setup>
import { DocumentArrowUpIcon } from "@heroicons/vue/20/solid";

const triggerFileUpload = () => {
  document.getElementById("fileUpload").click();
};

const props = defineProps({
  uploadFile: Function,
});

const uploadFile = props.uploadFile;
</script>
