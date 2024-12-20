<template>
  <ExpensesStats />

  <section class="py-4 overflow-hidden">
    <div class="container px-4 mx-auto">
      <div class="p-6 bg-white border rounded-lg">
        <div class="flex flex-wrap -m-2.5">
          <div class="w-full sm:w-1/3 p-2.5">
            <div class="flex flex-col justify-between pl-10 pt-4">
              <div>
                <h3 class="font-heading mb-2 text-lg font-semibold">
                  Automate Expense Management
                </h3>
                <p class="mb-6 text-neutral-500">
                  Manage your expenses with ease and efficiency using AI-powered
                  automation
                </p>
              </div>
              <div class="block">
                <ul class="mb-7">
                  <li class="flex items-center mb-3.5">
                    <svg
                      class="mr-2.5"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#564AF7"></circle>
                      <path
                        d="M5.91602 10.5833L8.24935 12.9166L14.0827 7.08325"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span class="font-medium">AI-Powered Expense Scanning</span>
                  </li>
                  <li class="flex items-center mb-3.5">
                    <svg
                      class="mr-2.5"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#564AF7"></circle>
                      <path
                        d="M5.91602 10.5833L8.24935 12.9166L14.0827 7.08325"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span class="font-medium"
                      >Automated Expense Categorization</span
                    >
                  </li>
                  <li class="flex items-center">
                    <svg
                      class="mr-2.5"
                      width="20"
                      height="20"
                      viewbox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="10" cy="10" r="10" fill="#564AF7"></circle>
                      <path
                        d="M5.91602 10.5833L8.24935 12.9166L14.0827 7.08325"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span class="font-medium"
                      >Seamless Accounting Integration</span
                    >
                  </li>
                </ul>
                <a
                  class="hidden inline-flex flex-wrap items-center justify-center px-3 py-2 text-center text-neutral-50 font-medium bg-indigo-700 hover:bg-indigo-500 rounded-lg transition duration-300"
                  href="#"
                >
                  <span class="mr-3 font-medium">Get Started</span>
                  <svg
                    width="16"
                    height="16"
                    viewbox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 3.3335L14 8.00016M14 8.00016L9.33333 12.6668M14 8.00016L2 8.00016"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/6 p-2.5"></div>
          <div class="w-full sm:w-1/2 p-2.5 border-l border-gray-200">
            <Upload class=" " />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
