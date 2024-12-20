<template>
  <div class="bg-white rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="action in actions"
        :key="action.label"
        @click="action.handler"
        :class="`${action.bgColor} ${action.textColor} font-semibold py-2 px-4 rounded flex items-center justify-center`"
      >
        <component :is="action.icon" class="w-5 h-5 mr-1" />
        <h2 class="text-sm">{{ action.label }}</h2>
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
import { ref } from "vue";
import {
  DocumentArrowUpIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/vue/20/solid";

const actions = ref([
  {
    label: "Upload Invoice",
    bgColor: "bg-blue-100 hover:bg-blue-200",
    textColor: "text-blue-800",
    icon: DocumentArrowUpIcon,
    handler: () => {
      location.href = "/sales";
    },
  },
  {
    label: "Upload Recipts",
    bgColor: "bg-purple-100 hover:bg-purple-200",
    textColor: "text-purple-800",
    icon: DocumentArrowUpIcon,
    handler: () => {
      location.href = "/costs";
    },
  },
  {
    label: "View Report",
    bgColor: "bg-green-100 hover:bg-green-200",
    textColor: "text-green-800",
    icon: ChartBarIcon,
    handler: () => {
      pushToViewReports();
    },
  },
  {
    label: "Review Pending",
    bgColor: "bg-yellow-100 hover:bg-yellow-200",
    textColor: "text-yellow-800",
    icon: ClipboardDocumentCheckIcon,
    handler: () => {
      pushToViewPendingData();
    },
  },
]);

const pushToViewReports = () => {
  location.href = "/reports";
};

const pushToViewPendingData = () => {
  location.href = "/sales?status=MissingData";
};

const triggerFileUpload = () => {
  document.getElementById("fileUpload").click();
};

const props = defineProps({
  uploadFile: Function,
});

const uploadFile = props.uploadFile;
</script>
