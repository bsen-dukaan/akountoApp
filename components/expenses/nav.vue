<template>
  <ul
    class="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 w-64"
  >
    <li v-for="item in navItems" :key="item.name">
      <NuxtLink
        :href="item.href"
        :class="[
          'inline-flex items-center px-4 py-3 rounded-lg w-full',
          item.current
            ? 'text-white bg-blue-700 active dark:bg-blue-600'
            : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white',
        ]"
        :aria-current="item.current ? 'page' : null"
      >
        <component
          :is="item.icon"
          class="w-4 h-4 me-2"
          :class="
            item.current ? 'text-white' : 'text-gray-500 dark:text-gray-400'
          "
          aria-hidden="true"
        />
        {{ item.name }}
        <span
          v-if="item.count"
          class="ml-auto text-white px-2 py-1 rounded-full text-xs"
          :class="item.color"
          >{{ item.count }}</span
        >
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const companyId = process.client ? localStorage.getItem("companyID") || "" : "";
const status = computed(() => route.query.status || "All");

const props = defineProps({
  documentCounts: {
    type: Object,
    required: true,
  },
});

const getCount = (status) => {
  return props.documentCounts[status] || 0;
};

const navItems = computed(() => [
  {
    name: "All",
    href: `/costs`,
    icon: DocumentDuplicateIcon,
    current: status.value === "All",
    count: getCount("Ready") + getCount("Extraction"),
    color: "bg-gray-500",
  },
  {
    name: "Extracting",
    href: `/costs?status=Extraction`,
    icon: DocumentDuplicateIcon,
    current: ["Inbox", "Extraction"].includes(status.value),
    count: getCount("Inbox") + getCount("Extraction"),
    color: "bg-gray-500",
  },
  {
    name: "Missing Data",
    href: `/costs?status=MissingData`,
    icon: XMarkIcon,
    current: status.value === "MissingData",
    count: getCount("MissingData"),
    color: "bg-red-500",
  },
  {
    name: "Ready",
    href: `/costs?status=Ready`,
    icon: DocumentTextIcon,
    current: status.value === "Ready",
    count: getCount("Ready"),
    color: "bg-green-500",
  },
  {
    name: "Processed",
    href: `/costs?status=Processed`,
    icon: FolderIcon,
    current: status.value === "Processed",
    count: getCount("Processed"),
    color: "bg-blue-500",
  },
  {
    name: "Archived",
    href: `/costs?status=archived`,
    icon: UsersIcon,
    current: status.value === "archived",
    count: getCount("archived"),
    color: "bg-yellow-500",
  },
]);
</script>
