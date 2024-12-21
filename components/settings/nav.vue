<template>
  <aside
    class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-56 lg:flex-none lg:border-0 lg:py-20"
  >
    <nav class="flex-none px-4 sm:px-6 lg:px-0">
      <ul
        role="list"
        class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
      >
        <li v-for="item in secondaryNavigation" :key="item.name">
          <a
            :href="item.href"
            :class="[
              item.current
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
              'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6',
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
      <button
        @click="handleLogout"
        class="group flex w-full gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 mt-6"
      >
        <ArrowRightOnRectangleIcon
          class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
          aria-hidden="true"
        />
        Logout
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";

import { Bars3Icon } from "@heroicons/vue/20/solid";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  WalletIcon,
  CogIcon,
  PuzzlePieceIcon,
  ArrowsRightLeftIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const secondaryNavigation = [
  { name: "Plan", href: "/account/plan", icon: BanknotesIcon, current: false },
  {
    name: "History",
    href: "/account/history",
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: IdentificationIcon,
    current: false,
  },
  {
    name: "Integrations",
    href: "/account/integrations",
    icon: PuzzlePieceIcon,
    current: false,
  },
].map((item) => ({
  ...item,
  current: item.href === route.path,
}));

const handleLogout = () => {
  localStorage.clear();
  router.push("/auth/register");
};
</script>
