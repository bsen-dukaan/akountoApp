<template>
    <div class="bg-white rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Onboarding Progress</h3>
      <div class="space-y-4">
        <div v-for="(step, index) in steps" :key="index" class="flex items-center">
          <div :class="`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`">
            <component :is="step.completed ? CheckIcon : step.icon" class="w-5 h-5" />
          </div>
          <div class="flex-grow">
            <p :class="`font-medium ${step.completed ? 'text-green-500' : 'text-gray-700'}`">{{ step.label }}</p>
            <p v-if="!step.completed" class="text-sm text-gray-500">{{ step.description }}</p>
          </div>
          <div v-if="!step.completed" class="flex-shrink-0 ml-3">
            <button @click="step.action" class="text-blue-500 hover:text-blue-700 text-sm font-medium">
              {{ step.actionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { CheckIcon, UserCircleIcon, CreditCardIcon, DocumentTextIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';
  
  const steps = ref([
    {
      label: 'Signup Complete',
      icon: UserCircleIcon,
      completed: true,
      description: 'Your account has been created successfully.',
      action: () => {},
      actionText: ''
    },
    {
      label: 'Connect QuickBooks',
      icon: CreditCardIcon,
      completed: false,
      description: 'Link your QuickBooks account for seamless integration.',
      action: () => console.log('Connecting to QuickBooks...'),
      actionText: 'Connect'
    },
    {
      label: 'Upload First Invoice',
      icon: DocumentTextIcon,
      completed: false,
      description: 'Upload your first invoice to get started.',
      action: () => console.log('Uploading first invoice...'),
      actionText: 'Upload'
    },
    // {
    //   label: 'Sync Data',
    //   icon: ArrowPathIcon,
    //   completed: false,
    //   description: 'Synchronize your data to complete the setup.',
    //   action: () => console.log('Syncing data...'),
    //   actionText: 'Sync'
    // }
  ]);
  </script>