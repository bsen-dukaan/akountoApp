<template>
  <div class="flex-1 p-0">
    <header class="mb-8 hidden">
      <h2 class="text-2xl font-bold">Expenses Inbox</h2>
      <p class="text-gray-600">
        Review and manage your scanned expense receipts.
      </p>
    </header>

    <main>
      <!-- Expense Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg">
          <img
            src="https://placehold.co/600x400"
            alt="Expense Receipt"
            class="w-full h-32 object-cover rounded-t-lg"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">Expense Receipt #1</h3>
            <p class="text-gray-600 text-sm mb-2">
              <span class="font-semibold">Date:</span> 2023-03-30<br />
              <span class="font-semibold">Amount:</span> $250.00<br />
              <span class="font-semibold">Category:</span> Office Supplies
            </p>
            <div class="flex justify-between items-center">
              <span
                class="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs"
                >To Review</span
              >
              <a href="#" class="text-blue-500 hover:text-blue-600 text-sm"
                >View Details</a
              >
            </div>
          </div>
        </div>
        <!-- Add more expense cards -->
      </div>
    </main>
  </div>
</template>
