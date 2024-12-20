<template>
  <div class="bg-gray-100 -mt-20">
    <div class="flex">
      <div class="w-1/5 bg-gray-50 min-h-screen">
        <LayoutSteps
          :steps="steps"
          class="w-full flex items-center justify-center pt-20 mt-20 px-4"
        />
      </div>
      <div class="w-1/12"></div>
      <div class="w-3/4">
        <div class="flex mt-10">
          <div
            class="bg-white p-8 rounded-lg w-full max-w-4xl items-center content-center mt-20 pt-10 ml-10"
          >
            <WelcomeTrial
              @trial-activated="handleTrialActivation"
              v-if="step === 0"
            />
            <WelcomeCreateCompany
              v-if="step === 2"
              @company-created="handleCompanyCreated"
            />
            <WelcomeConnectQuickbooks
              v-if="step === 3"
              @connected="handleQuickbooksConnected"
            />
            <WelcomeSyncQuickbooks
              v-if="step === 4"
              @synced="handleQuickbooksSynced"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 0,

      steps: [
        {
          name: "Create Account",
          description: "Start by creating an account",
          href: "#",
          status: "complete",
        },
        {
          name: "Activate 14 day free plan",
          description: "Choose your plan and activate it",
          href: "#",
          status: "current",
        },
        {
          name: "Create your company",
          description: "Create your first company ",
          href: "#",
          status: "upcoming",
        },

        {
          name: "Connect with QuickBooks",
          description: "to automatically sync your data",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Sync Data from QuickBooks",
          description: " QuickBooks data",
          href: "#",
          status: "upcoming",
        },
      ],
    };
  },

  computed: {},
  methods: {
    checkQueryParamStep() {
      const router = useRoute();
      const stepQueryParam = router.query.step;

      if (stepQueryParam == 3) {
        this.step = 3;
        this.steps[2].status = "complete";
        this.steps[3].status = "current";
      }
    },

    goToDashboard() {
      this.$router.push(`/sales/invoices`);
    },
    handleTrialActivation(data) {
      if (data.success) {
        this.steps[1].status = "complete";
        this.steps[2].status = "current";
        this.step = 2;
        // Show a success message

        // You might want to store the token or perform other actions
        console.log("Token received:", data.token);
      } else {
        // Handle any error cases if you decide to emit failed activations as well
      }
    },

    handleCompanyCreated(data) {
      console.log("Company created:", data);

      this.steps[2].status = "complete";
      this.steps[3].status = "current";
      this.step = 3;
    },
  },
  mounted() {
    this.checkQueryParamStep();
  },
};
</script>

<script setup>
definePageMeta({
  layout: "blank",
});
</script>
