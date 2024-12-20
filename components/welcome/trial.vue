<template>
  <div class="">
    <div class="border-b border-gray-200 -mx-8 flex flex-wrap items-center justify-between sm:flex-nowrap">
      <div class="mb-2 -mt-6">
        <div class="flex items-center">
          <div class="ml-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Activate Your 14-Day Free Trial
            </h3>
            <p class="text-sm text-gray-500">
              Enter your credit card details to start your free trial.
            </p>
          </div>
        </div>
      </div>
      <div class="ml-4 mt-4 flex flex-shrink-0"></div>
    </div>

    <div class="py-6">
      <p class="text-gray-700 mb-4">Enter your credit card details to start your 14-day free trial. You won't be charged until the trial ends.</p>
      <form @submit.prevent="activateTrial" class="space-y-4">
        <div>
          <label for="cardElement" class="block text-sm font-medium text-gray-700">Credit or debit card</label>
          <div id="cardElement" class="mt-1 p-3 border rounded-md shadow-sm"></div>
          <div id="cardErrors" role="alert" class="text-red-600 text-sm mt-2"></div>
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name on Card</label>
          <input type="text" id="name" v-model="name" required
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 placeholder="John Doe">
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="terms" v-model="agreeToTerms" required
                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a>
          </label>
        </div>
        <div>
          <button type="submit" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :disabled="!agreeToTerms || isProcessing">
            {{ isProcessing ? 'Processing...' : 'Start My Free Trial' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stripe: null,
      card: null,
      name: '',
      agreeToTerms: false,
      isProcessing: false
    };
  },
  mounted() {
    this.initializeStripe();
  },
  methods: {
    initializeStripe() {
      this.stripe = Stripe('pk_test_51PXqaQIpsv0mU6RHn2vmubfPtvHUBVTsPbxonqxQHh6rAbA6t3KbraP9xWucXENQFuZvQsM6C0OzFFVSJXrmoDtF00X3kUu83V'); // Replace with your actual Stripe publishable key
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#cardElement');

      this.card.addEventListener('change', (event) => {
        const displayError = document.getElementById('cardErrors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    },
    async activateTrial() {
      if (!this.agreeToTerms) return;
      
      this.isProcessing = true;
      const { token, error } = await this.stripe.createToken(this.card, {
        name: this.name
      });

      if (error) {
        const errorElement = document.getElementById('cardErrors');
        errorElement.textContent = error.message;
        this.isProcessing = false;
      } else {
        // Send the token to your server
        this.sendTokenToServer(token);
      }
    },
    async sendTokenToServer(token) {
      // Here you would send the token to your server to activate the trial
      console.log('Sending token to server:', token.id);
      this.isProcessing = true;
      try {
        const { $api } = useNuxtApp();
        const response = await $api.subscription.startTrial(token.id);
        console.log("response", response);
        if (response.data.success) {
          this.$emit('trial-activated', {
            success: true,
            message: 'Trial activated successfully!',
            token: token.id
          });
        } else {
          throw new Error(response.data.message || 'Failed to activate trial');
        }
      } catch (error) {
        console.error('Error activating trial:', error);
        alert('Failed to activate trial. Please try again.');
      } finally {
        this.isProcessing = false;
      }
    }
  }
};
</script>
