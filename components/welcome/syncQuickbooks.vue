<template>
    <div v-if="step === 3">


        <div class="mb-4 pt-7">
            <h4 class="sr-only">Status</h4>
            <p class="text-sm font-medium text-gray-900">
                Connecting and Syncing with QuickBooks...
            </p>
            <div class="mt-6" aria-hidden="true">
                <div class="overflow-hidden rounded-full bg-gray-200">
                    <div class="h-2 rounded-full bg-green-500" style="width: 50%"></div>
                </div>
                <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
                    <div class="text-green-500">Connecting to QuickBooks</div>
                    <div class="text-center text-indigo-500">
                        Syncing Customers
                    </div>
                    <div class="text-right">Syncing Vendors</div>
                </div>
            </div>
        </div>

        <button @click="goToDashboard"
            class="mt-10 bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center">
            Go to Dashboard
        </button>
    </div>
</template>

<script setup>

</script>