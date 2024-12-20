<template>
  <Combobox as="div" v-model="selectedCategory">
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        @change="query = $event.target.value"
        :display-value="(category) => category?.name"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>
      <ComboboxOptions
        v-if="filteredCategories.length"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm"
      >
        <ComboboxOption
          v-for="category in filteredCategories"
          :key="category.id"
          :value="category"
        >
          <li
            :class="`relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`"
          >
            <span
              :class="`block truncate ${selected ? 'font-semibold' : ''}`"
              >{{ category.name }}</span
            >
            <span
              v-if="selected"
              :class="`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-indigo-600'}`"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

const categories = [
  { id: 1, name: "Automobile" },
  { id: 2, name: "Meals and Entertainment" },
  // More categories...
];

const query = ref("");
const selectedCategory = ref(
  categories.find((category) => category.name === "Automobile"),
);
const filteredCategories = computed(() =>
  query.value === ""
    ? categories
    : categories.filter((category) => {
        return category.name.toLowerCase().includes(query.value.toLowerCase());
      }),
);

onMounted(() => {
  if (!selectedCategory.value) {
    selectedCategory.value = categories.find(
      (category) => category.name === "Automobile",
    );
  }
});
</script>
