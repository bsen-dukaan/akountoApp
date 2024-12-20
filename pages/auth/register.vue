<template>
  <section
    class="-min-h-screen relative pt-16 md:py-32 bg-white"
    style="
      background-image: url(&quot;https://shuffle.dev/flex-ui-assets/elements/pattern-white.svg&quot;);
      background-position: center;
    "
  >
    <div class="container px-4 mx-auto mb-16 md:mb-0">
      <div class="w-full md:w-1/2 md:pr-4">
        <div class="max-w-sm mx-auto">
          <div class="mb-6 text-center">
            <a class="inline-block mb-6" href="#">
              <img
                class="h-16"
                src="https://shuffle.dev/flex-ui-assets/logos/flex-circle-green.svg"
                alt=""
              />
            </a>
            <h3 class="mb-4 text-2xl md:text-3xl font-bold">
              Let's get started
            </h3>
            <p class="text-lg text-gray-500 font-medium">
              Create your account with Kounto
            </p>
          </div>
          <form @submit.prevent="register">
            <div class="mb-6">
              <label class="block mb-2 text-gray-800 font-medium">Name*</label>
              <input
                v-model="name"
                class="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                placeholder="Patryk"
              />
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-gray-800 font-medium" for="email"
                >Email*</label
              >
              <input
                v-model="email"
                class="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="email"
                placeholder="dev@shuffle.dev"
              />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-gray-800 font-medium" for="password"
                >Password*</label
              >
              <input
                v-model="password"
                class="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="password"
                placeholder="************"
              />
            </div>
            <button
              :disabled="isRegistering"
              type="submit"
              class="inline-block py-3 px-7 mb-4 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
            >
              <span v-if="isRegistering">Creating Account...</span>
              <span v-else>Create Account</span>
            </button>
            <div v-if="error" class="mb-4 text-center">
              <span
                class="inline-block py-2 px-4 text-base text-red-600 bg-red-100 rounded-lg"
              >
                {{ error }}
              </span>
            </div>
          </form>
          <p class="text-center">
            <span class="text-xs font-medium">Already have an account?</span>
            <NuxtLink
              to="/auth/login"
              class="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline ml-2"
              href="#"
            >
              Sign In</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>
    <div class="md:absolute md:top-0 md:right-0 md:w-1/2 md:h-full md:pl-4">
      <div
        class="flex items-center justify-center h-full px-8 py-14 bg-gray-50"
      >
        <div class="md:max-w-xl mx-auto text-center">
          <span
            class="relative z-10 inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm"
            >Quotes</span
          >
          <div class="relative mb-16">
            <img
              class="absolute -top-10 left-0 2xl:-left-12"
              src="https://shuffle.dev/flex-ui-assets/elements/sign-up/quotes-top.svg"
              alt=""
            />
            <img
              class="absolute -bottom-16 right-0"
              src="https://shuffle.dev/flex-ui-assets/elements/sign-up/quotes-bottom.svg"
              alt=""
            />
            <h3
              class="relative text-2xl md:text-3xl leading-tight font-medium text-gray-800"
            >
              Love the simplicity of the service and the prompt customer
              support. We can’t imagine working without it.
            </h3>
          </div>
          <div class="relative text-center">
            <img
              class="w-24 h-24 mb-6 mx-auto rounded-full"
              src="https://shuffle.dev/flex-ui-assets/images/sign-up/avatar-men-sign-up.png"
              alt=""
            />
            <h4 class="mb-2 text-lg text-gray-800 font-semibold">John Doe</h4>
            <span class="block mb-8 text-lg text-gray-400"
              >CEO & Founder at Flex.co</span
            >
            <div class="flex items-center justify-center">
              <a class="w-3 h-3 mr-3 bg-gray-100 rounded-full" href="#"></a
              ><a class="w-3 h-3 mr-3 bg-green-500 rounded-full" href="#"></a
              ><a class="w-3 h-3 bg-gray-100 rounded-full" href="#"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";
import { onMounted } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const { $api } = useNuxtApp();

const isRegistering = ref(false);
const error = ref(null);

watch(error, (newValue) => {
  if (newValue) {
    // Handle the error state here, e.g., show an error message
    console.error("Registration Error:", newValue);
  }
});

const token = process.client ? localStorage.getItem("token") || "" : "";

onMounted(() => {
  if (token) {
    navigateTo("/");
  }
});

const register = async () => {
  isRegistering.value = true;
  error.value = "";
  try {
    let user = await $api.auth.register({
      email: email.value,
      password: password.value,
      name: name.value,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    isRegistering.value = false;
    console.log({ user: user });
    if (user.token) {
      router.push("/welcome");
    } else {
      error.value = "Unable to create account :  " + user.message;
    }
  } catch (error) {
    isRegistering.value = false;
    console.error("Registration failed:", error);
  }
};

definePageMeta({
  layout: "blank",
});
</script>
