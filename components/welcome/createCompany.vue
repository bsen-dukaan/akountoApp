<template>
    <div>
      <div class="border-b border-gray-200 -mx-8">
        <div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div class="mb-2 -mt-4">
            <div class="flex items-center">
              <div class="ml-4">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                  Step 1: Create your 1st company
                </h3>
                <p class="text-sm text-gray-500">
                  Create a company. You can create more companies later.
                </p>
              </div>
            </div>
          </div>
          <div class="ml-4 mt-4 flex flex-shrink-0"></div>
        </div>
      </div>
  
      <div class="mb-4 mt-4">
        <label class="block text-gray-700 font-bold mb-2" for="companyName">Company Name</label>
        <input
          v-model="companyName"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="companyName"
          placeholder="Enter company name"
        />
      </div>
      <button
        @click="createCompany"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        :disabled="creatingCompany"
      >
        <span v-if="!creatingCompany">Create Company</span>
        <span v-else>Creating Company <i class="ml-2 animate-spin">&#9696;</i></span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useNuxtApp } from '#app';
  
  const companyName = ref("");
  const creatingCompany = ref(false);
  const companyID = ref("");
  
  const emit = defineEmits(['company-created']);
  
  const createCompany = async () => {
    if (!companyName.value.trim()) {
      alert("Please enter a company name");
      return;
    }
  
    creatingCompany.value = true;
  
    const { $api } = useNuxtApp();
  
    try {
      const response = await $api.company.create({
        companyName: companyName.value,
      });
  
      companyID.value = response.data.id;
      localStorage.setItem("companyID", response.data.id);
  
      // Simulating async operation
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      emit('company-created', {
        success: true,
        message: 'Company created successfully!',
        companyID: companyID.value
      });
  
      // Reset form
      companyName.value = "";
    } catch (error) {
      console.error("Error creating company:", error);
      emit('company-created', {
        success: false,
        message: 'Failed to create company. Please try again.',
      });
      // You might want to show an error message to the user here
    } finally {
      creatingCompany.value = false;
    }
  };
  </script>