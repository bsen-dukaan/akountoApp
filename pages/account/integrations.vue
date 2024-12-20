<template>
    
    <div class="bg-white p-5 sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 -mx-8 -mt-10 ">
    <div class="flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-9000 sm:text-3xl sm:tracking-tight">Account settings</h2>
            <p class="mt-2 text-sm text-gray-500">Manage your account settings.</p>
    </div>
    
  </div>
  
    <div class="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 bg-gray-100">
      <h1 class="sr-only">General Settings</h1>
  
      <SettingsNav />
     
      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <SettingsIntegration />
          </div>
  
          
          
          
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  
  const mobileMenuOpen = ref(false)
  const automaticTimezoneEnabled = ref(true)
  </script>


