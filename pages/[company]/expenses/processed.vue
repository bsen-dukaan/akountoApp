<template>
  <div class="relative border-b border-gray-200 pb-5 sm:pb-0 hidden">
    <div class="md:flex md:items-center md:justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Expenses</h3>
      <div class="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Share
        </button>
        <button
          type="button"
          class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </div>
    <div class="mt-4">
      <div class="sm:hidden">
        <label for="current-tab" class="sr-only">Select a tab</label>
        <select
          id="current-tab"
          name="current-tab"
          class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="-mb-px flex space-x-8">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}

            <span
              v-if="tab.count"
              :class="[
                tab.current
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-900',
                'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
              ]"
              >{{ tab.count }}</span
            >
          </a>
        </nav>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg overflow-hidden my-4">
    <div class="bg-white py-6">
      <div
        class="flex flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8"
      >
        <h1 class="text-base font-semibold leading-7 text-gray-900">
          Expenses
        </h1>
        <div
          class="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7"
        >
          <a href="#" class="text-indigo-600"
            >Inbox
            <span
              class="bg-indigo-100 text-indigo-600 ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
              >12</span
            >
          </a>
          <a href="#" class="text-gray-700"
            >Processing
            <span
              class="bg-gray-100 text-gray-900 ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
              >12</span
            >
          </a>
          <a href="#" class="text-gray-700"
            >Processed
            <span
              class="bg-gray-100 text-gray-900 ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
              >92</span
            >
          </a>
          <a href="#" class="text-gray-700"
            >Failed
            <span
              class="bg-gray-100 text-gray-900 ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
              >100</span
            >
          </a>
          <a href="#" class="text-gray-700"
            >Archived
            <span
              class="bg-gray-100 text-gray-900 ml-2 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block"
              >1020</span
            >
          </a>
        </div>
        <a
          href="#"
          class="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <svg
            class="-ml-1.5 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
            />
          </svg>
          Upload Expenses
        </a>
      </div>
    </div>
    <ExpensesList />
  </div>
</template>

<script setup>
const tabs = [
  { name: "Inbox", href: "#", current: true, count: 10 },
  { name: "Processing", href: "#", current: false, count: 2 },
  { name: "Processed", href: "#", current: false, count: 5 },
  { name: "Failed", href: "#", current: false, count: 9 },
  { name: "Archived", href: "#", current: false, count: 120 },
];
</script>
