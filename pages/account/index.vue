<template>
    
    <div class="bg-white p-5 sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 -mx-8 -mt-10 ">
    <div class="flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-9000 sm:text-3xl sm:tracking-tight">Account settings</h2>
            <p class="mt-2 text-sm text-gray-500">Manage your account settings.</p>
    </div>
    
  </div>
  
    <div class="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 bg-gray-100">
      <h1 class="sr-only">General Settings</h1>
  
      <aside class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
        <nav class="flex-none px-4 sm:px-6 lg:px-0">
          <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            <li v-for="item in secondaryNavigation" :key="item.name">
              <a :href="item.href" :class="[item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600', 'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6']">
                <component :is="item.icon" :class="[item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
  
      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what you share.</p>
  
            <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">Tom Cook</div>
                  <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                </dd>
              </div>
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">tom.cook@example.com</div>
                  <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                </dd>
              </div>
              <div class="pt-6 sm:flex">
                <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div class="text-gray-900">Human Resources Manager</div>
                  <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
                </dd>
              </div>
            </dl>
          </div>
  
          
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
            <p class="mt-1 text-sm leading-6 text-gray-500">Connect applications to your account.</p>
  
            <ul role="list" class="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <li class="flex justify-between gap-x-6 py-6">
                <div class="font-medium text-gray-900">QuickBooks</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500">Update</button>
              </li>
            </ul>
  
            <!-- <div class="flex border-t border-gray-100 pt-6">
              <button type="button" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><span aria-hidden="true">+</span> Add another application</button>
            </div> -->
          </div>
  
          
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import { Bars3Icon } from '@heroicons/vue/20/solid'
  import {
    BellIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'
  
  
  const secondaryNavigation = [
  { name: 'Plan', href: '/account/plan', icon: UsersIcon, current: false },
    { name: 'Profile', href: '/account/', icon: UserCircleIcon, current: true },
    { name: 'Integrations', href: '/account/integrations', icon: UsersIcon, current: false },
    { name: 'Payment Methods', href: '/account/payment-methods', icon: CreditCardIcon, current: false },
    { name: 'Team members', href: '/account/team-members', icon: UsersIcon, current: false },
  ]
  
  const mobileMenuOpen = ref(false)
  const automaticTimezoneEnabled = ref(true)
  </script>


