<template>
  <div
    class="bg-white p-5 sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 -mx-8 -mt-10 mb-10"
  >
    <div class="flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight"
      >
        Manage Customer
      </h2>
      <p class="mt-2 text-sm text-gray-500">
        Manage and oversee your customer interactions effectively.
      </p>
    </div>
    <div class="flex">
      <slot />
    </div>
  </div>
</template>
