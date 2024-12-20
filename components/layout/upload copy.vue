<template>


    <div class="mt-0 h-full ">
        <!-- Activity table (small breakpoint and up) -->
        <div class="hidden sm:block">
            <div class="">
                <div class="mt-2 flex flex-col">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle  sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                        scope="col"> Customer</th>
                                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                        scope="col">Order</th>
                                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900 hidden"
                                        scope="col">Date & Time</th>


                                    <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                        scope="col">Amount</th>


                                    <th class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                                        scope="col">Status</th>

                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="transaction in txns" :key="transaction.id" class="bg-white">

                                    <td class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                        <div class="flex">
                                            <a :href="transaction.href"
                                                class="group inline-flex space-x-2 truncate text-sm">
                                                <BanknotesIcon
                                                    class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true" />
                                                <div>
                                                    <p class="truncate text-gray-500 group-hover:text-gray-900">{{
                                    transaction.customer_name }} <br> {{ transaction.customer_phone
                                                        }} </p>

                                                </div>
                                            </a>
                                        </div>
                                    </td>


                                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                        <span class="truncate text-gray-500">{{ transaction?.system_order_id?.slice(-6)
                                            }}</span>


                                    </td>

                                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 hidden">
                                        <span class="truncate text-gray-500">{{ new
                                    Date(transaction.createdAt).toLocaleString('en-IN', {
                                        timeZone:
                                            'Asia/Kolkata', year: 'numeric', month: '2-digit', day:
                                            '2-digit'
                                    }).replace(',', '') }}</span>
                                        {{ new Date(transaction.createdAt).toLocaleString('en-IN', {
                                    timeZone:
                                        'Asia/Kolkata', hour: '2-digit', minute: '2-digit'
                                }).replace(',', '') }}
                                    </td>



                                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                        <span class="text-gray-500">₹{{ transaction.order_amount }}</span>
                                        {{ transaction.currency }}
                                    </td>

                                    <td class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">

                                        <span
                                            :class="[statusStyles[transaction.payment_status], 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize']">{{
                                    transaction.payment_status }}</span>
                                    </td>

                                    <!-- <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            <time :datetime="transaction.datetime">{{ transaction.createdAt }}</time>
                          </td> -->
                                </tr>
                            </tbody>
                        </table>
                        <!-- Pagination -->
                        <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                            aria-label="Pagination">
                            <div class="hidden sm:block">
                                <p class="text-sm text-gray-700">
                                    Showing
                                    {{ ' ' }}
                                    <span class="font-medium">{{ (currentPage - 1) * 10 + 1 }}</span>
                                    {{ ' ' }}
                                    to
                                    {{ ' ' }}
                                    <span class="font-medium">{{ Math.min(currentPage * 10, count) }}</span>
                                    {{ ' ' }}
                                    of
                                    {{ ' ' }}
                                    <span class="font-medium">{{ count }}</span>
                                    {{ ' ' }}
                                    results
                                </p>
                            </div>
                            <div class="flex flex-1 justify-between gap-x-3 sm:justify-end">
                                <button v-if="currentPage > 1" @click="fetchTransactions(currentPage - 1)"
                                    :disabled="currentPage === 1"
                                    class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400">Previous</button>
                                <button @click="fetchTransactions(currentPage + 1)"
                                    :disabled="currentPage * 10 >= count"
                                    class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:ring-gray-400">Next</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3CenterLeftIcon,
    BellIcon,
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import {
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'



const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
    created: 'bg-yellow-100 text-yellow-800',
    FAILED: 'bg-red-100 text-red-800',
    SUCCESS: 'bg-green-100 text-green-800',
    PROCESSING: 'bg-yellow-100 text-yellow-800',
    CREATED: 'bg-yellow-100 text-yellow-800',

}


const txns = ref([]);
const count = ref(0);
const pages = ref(0);
const currentPage = ref(1);

const fetchTransactions = async (pageNo) => {
    try {
        const response = await axios.get(`https://api.wavepay.money/api/payment/transactions/?page=${pageNo}&limit=6`, {
            headers: {
                'x-api-key': localStorage.apitoken,
                'Content-Type': 'application/json'
            }
        });
        txns.value = response.data.transactions;
        count.value = response.data.count;
        pages.value = response.data.pages;

        if (pageNo) {
            currentPage.value = pageNo
        }


    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};


const timeout = ref()

const getData = async () => {
    fetchTransactions();
    timeout.value = setInterval(async () => {
        await fetchTransactions(1)
    }, 3000)
}

onUnmounted(() => {
    clearInterval(timeout.value);
});

onMounted(getData);



</script>