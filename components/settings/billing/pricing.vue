<template>
  <div class="container mx-auto px-4 py-0">

    

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div v-for="plan in plans" :key="plan.id" 
           class="border rounded-lg bg-white p-6 flex flex-col"
           :class="{ 'border-blue-500 shadow-blue-200': plan.isUserCurrentPlan }">
        <h2 class="text-2xl font-semibold mb-2">{{ plan.name }}</h2>
        <p class="text-gray-600 mb-4">{{ plan.description }}</p>
        <div class="text-3xl font-bold mb-4">${{ plan.price }}<span class="text-lg font-normal">/{{ plan.billing_cycle }}</span></div>
        <ul class="mb-6 flex-grow">
          <li v-for="(value, key) in JSON.parse(plan.features)" :key="key" class="flex items-center mb-2">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ formatFeature(key, value) }}
          </li>
        </ul>
        <button 
          class="w-full py-2 px-4 rounded font-semibold relative"
          :class="plan.isUserCurrentPlan ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'"
          @click="changePlan(plan.stripe_price_id)"
          :disabled="isChangingPlan"
        >
          <span v-if="!isChangingPlan">{{ plan.isUserCurrentPlan ? 'Current Plan' : 'Choose Plan' }}</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Changing Plan...
          </span>
        </button>
      </div>
    </div>

    <div class="mt-10 bg-white rounded-lg p-6 ">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col items-center">
          <svg class="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Secure & Reliable</h3>
          <p class="text-center text-gray-600">Your data is always protected with industry-standard encryption.</p>
        </div>
        <div class="flex flex-col items-center">
          <svg class="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p class="text-center text-gray-600">Our optimized systems ensure quick processing and syncing.</p>
        </div>
        <div class="flex flex-col items-center">
          <svg class="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
          <p class="text-center text-gray-600">Our dedicated team is always ready to assist you.</p>
        </div>
      </div>
    </div>


    <div v-if="showSuccessMessage" class="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500" :class="{ 'opacity-100': showSuccessMessage, 'opacity-0': !showSuccessMessage }">
      Plan changed successfully!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [],
      isChangingPlan: false,
      showSuccessMessage: false
    };
  },
  created() {
    const { $api } = useNuxtApp();
    $api.subscription.getPlans().then(response => {
      this.plans = response.data.plans;
    });
  },
  methods: {
    formatFeature(key, value) {
      if (typeof value === 'boolean') {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      } else if (typeof value === 'number') {
        return `${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`;
      }
      return `${key}: ${value}`;
    },
    changePlan(priceId) {
      this.isChangingPlan = true;
      const { $api } = useNuxtApp();
      $api.subscription.changePlan(priceId).then(response => {
        console.log(response);
        this.isChangingPlan = false;
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        // Refresh plans after changing
        $api.subscription.getPlans().then(response => {
          this.plans = response.data.plans;
        });
      }).catch(error => {
        console.error('Error changing plan:', error);
        this.isChangingPlan = false;
        // You might want to show an error message to the user here
      });
    }
  }
}
</script>