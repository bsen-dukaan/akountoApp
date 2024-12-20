<template>
  <div class="h-full min-h-screen bg-gray-100">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>

                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            :href="item.href"
                            :class="[
                              item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              :class="[
                                item.current
                                  ? 'text-indigo-600'
                                  : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0',
                              ]"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div
                        class="text-xs font-semibold leading-6 text-gray-400"
                      >
                        Your companies
                      </div>
                      <ul role="list" class="-mx-2 mt-2 space-y-1">
                        {{
                          companies
                        }}
                        <li v-for="company in companies" :key="company.name">
                          <a
                            :href="company.href"
                            :class="[
                              company.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <span
                              :class="[
                                company.current
                                  ? 'text-indigo-600 border-indigo-600'
                                  : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                              ]"
                              >{{ company.initial }}</span
                            >
                            <span class="truncate">{{ company.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a
                        href="#"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
      >
        <div class="flex h-16 shrink-0 items-center">
          <NuxtLink to="/"
            ><img
              class="h-8 w-auto"
              src="https://www.akounto.com/images/logo.svg"
              alt="Your Company"
          /></NuxtLink>
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <div>
                <div class="text-xs font-semibold leading-6 text-gray-400">
                  Sales
                </div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/sales/invoices`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <DocumentDuplicateIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Process Invoices
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/sales/customers`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <UsersIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Manage Customers
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="mt-4">
                <div class="text-xs font-semibold leading-6 text-gray-400">
                  Expenses
                </div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/expenses/receipts`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <ChartPieIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Process Expenses
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/expenses/vendors`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <FolderIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Manage Vendors
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="mt-4">
                <div class="text-xs font-semibold leading-6 text-gray-400">
                  Settings
                </div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/integrations`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <Cog6ToothIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Integrations
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/settings`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <Cog6ToothIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Settings
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      :to="`/${companyid}/billing`"
                      class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                      <CalendarIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Billing
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="mt-4">
                <div class="text-xs font-semibold leading-6 text-gray-400">
                  Your companies
                </div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li v-for="company in companies" :key="company.name">
                    <NuxtLink
                      :to="`/${companyid}/${company.href}`"
                      :class="[
                        company.current
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                      ]"
                    >
                      <span
                        :class="[
                          company.current
                            ? 'text-indigo-600 border-indigo-600'
                            : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                        ]"
                      >
                        {{ company.initial }}
                      </span>
                      <span class="truncate">{{ company.name }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li class="mt-auto">
              <a
                href="#"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
              >
                <Cog6ToothIcon
                  class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                  aria-hidden="true"
                />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8 hidden"
      >
        <!-- Separator -->
        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="relative flex flex-1" action="#" method="GET">
            <div class="pb-5 sm:flex sm:items-center sm:justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 mt-4">
                kounto Dashbord
              </h3>
            </div>
          </div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="mt-3 sm:ml-4 sm:mt-0">
              <label for="mobile-search-candidate" class="sr-only"
                >Search</label
              >
              <label for="desktop-search-candidate" class="sr-only"
                >Search</label
              >
              <div class="flex rounded-md shadow-sm">
                <div class="relative flex-grow focus-within:z-10">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="mobile-search-candidate"
                    id="mobile-search-candidate"
                    class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                    placeholder="Search receipts"
                  />
                  <input
                    type="text"
                    name="desktop-search-candidate"
                    id="desktop-search-candidate"
                    class="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                    placeholder="Search receipts"
                  />
                </div>
                <button
                  type="button"
                  class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Search
                </button>
              </div>
            </div>

            <!-- Separator -->
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              aria-hidden="true"
            />

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                    >Tom Cook</span
                  >
                  <ChevronDownIcon
                    class="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-4">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const companies = [
  { id: 1, name: "Byson Realtors", href: "#", initial: "H", current: false },
  { id: 2, name: "Keller Williams", href: "#", initial: "T", current: false },
  { id: 3, name: "Douglas Elliman", href: "#", initial: "W", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

const sidebarOpen = ref(false);

import { useRoute } from "vue-router";

const route = useRoute();
const companyIdFromRoute = ref(route.params.company);

const companyid = ref(companyIdFromRoute.value);
</script>

<style scoped>
.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(79 70 229 / 1);
  color: rgb(79 70 229 / var(--tw-text-opacity));
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
</style>
