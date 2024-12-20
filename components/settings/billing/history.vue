<template>
    <div class="container mx-auto px-4 py-8">
      
      <div class="overflow-x-auto  sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Action</th>
              <th scope="col" class="px-6 py-3">Details</th>
              <th scope="col" class="px-6 py-3">Plan</th>
              <th scope="col" class="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4">{{ formatDate(item.date) }}</td>
              <td class="px-6 py-4">
                <span :class="getActionClass(item.action)">
                  {{ capitalizeFirstLetter(item.action) }}
                </span>
              </td>
              <td class="px-6 py-4">{{ item.details }}</td>
              <td class="px-6 py-4">{{ item.PricingPlan.name }}</td>
              <td class="px-6 py-4">
                ${{ item.PricingPlan.price }} / {{ item.PricingPlan.billing_cycle }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        history: [
          {
            "id": "174a627d-a5ee-4f16-bba1-82e1a468be6f",
            "action": "subscribe",
            "date": "2024-07-01T19:56:24.887Z",
            "details": "Initial subscription to Pro plan",
            "createdAt": "2024-07-01T19:56:24.888Z",
            "updatedAt": "2024-07-01T19:56:24.888Z",
            "UserId": "951f9fb3-314a-422e-9df0-a13e07512b04",
            "PricingPlanId": "3a87aa03-16db-4ad1-bcbf-d4acd77e2abf",
            "PricingPlan": {
              "name": "Pro",
              "price": 99.99,
              "billing_cycle": "monthly"
            }
          }
          // Add more history items here as needed
        ]
      };
    },
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      getActionClass(action) {
        switch (action) {
          case 'subscribe':
            return 'text-green-600 bg-green-100 px-2 py-1 rounded';
          case 'unsubscribe':
            return 'text-red-600 bg-red-100 px-2 py-1 rounded';
          case 'upgrade':
            return 'text-blue-600 bg-blue-100 px-2 py-1 rounded';
          case 'downgrade':
            return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded';
          default:
            return 'text-gray-600 bg-gray-100 px-2 py-1 rounded';
        }
      }
    }

  ,
  async mounted() {
    try {
      const { $api } = useNuxtApp();
      const response = await $api.subscription.getHistory();
      this.history = response.data.history.map(item => ({
        ...item,
        PricingPlan: {
          name: item.PricingPlan.name,
          price: item.PricingPlan.price,
          billing_cycle: item.PricingPlan.billing_cycle
        }
      }));
    } catch (error) {
      console.error('Error fetching subscription history:', error);
      // You might want to add error handling here, such as setting an error message in data
    }
  }

  }
  </script>