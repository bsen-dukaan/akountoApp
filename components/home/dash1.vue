<template>
  <div>
    <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3> -->
    <dl class="mt-0 grid grid-cols-1 gap-5 sm:grid-cols-4">
      <div v-for="item in stats" :key="item.name" class="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">
        <dt class="truncate text-sm font-medium text-gray-500">{{ item.name }}</dt>
        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ item.stat }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
const stats = [
  { name: 'Documents Scanned', stat: '1,234' },
  { name: 'Processed', stat: '1,012' },
  { name: 'Failed', stat: '222' },
  { name: 'Success Rate', stat: '82%' },
]
</script>