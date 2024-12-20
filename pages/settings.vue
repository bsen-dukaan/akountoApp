<template>
    <div class="bg-white rounded-lg p-8">
      <h3 class="text-xl font-semibold mb-6">Profile Settings</h3>
      <form>
        <div class="mb-6">
          <label for="name" class="block text-gray-700 font-semibold mb-2"
            >Name</label
          >
          <input
            type="text"
            id="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value="John Doe"
          />
        </div>
        <div class="mb-6">
          <label for="email" class="block text-gray-700 font-semibold mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value="johndoe@example.com"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <div class="mb-6">
          <label
            for="confirmPassword"
            class="block text-gray-700 font-semibold mb-2"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  </template>
  