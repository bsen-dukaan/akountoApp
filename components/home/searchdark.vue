<template>
    <div>
      <!-- Normal view -->
      <div class="bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
        <h3 class="text-sm font-semibold text-gray-300 mb-3">AI Assistant</h3>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-blue-400 animate-pulse" />
          </div>
          <input
            v-model="query"
            @keyup.enter="performSearch"
            @focus="isInputFocused = true"
            @blur="isInputFocused = false"
            type="text"
            placeholder="Ask anything..."
            class="w-full pl-10 pr-4 py-2 text-lg bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            :class="{ 'ring-2 ring-blue-500 border-blue-500': isInputFocused }"
          />
          <div 
            class="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
            :style="{ width: inputAnimationWidth }"
          ></div>
        </div>
      </div>
  
      <!-- Full-screen modal -->
      <div v-if="isFullScreen" class="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 overflow-auto transition-opacity duration-300 ease-in-out">
        <div class="max-w-4xl mx-auto p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-white">AI Assistant</h2>
            <button @click="closeFullScreen" class="text-gray-400 hover:text-white transition-colors duration-200">
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
          <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-blue-400 animate-pulse" />
            </div>
            <input
              v-model="query"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Ask anything about your finances..."
              class="w-full pl-10 pr-4 py-3 text-lg bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
            <button
              @click="performSearch"
              class="absolute inset-y-0 right-0 px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Ask
            </button>
          </div>
          <div v-if="isLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <div v-else-if="response" class="bg-gray-800 rounded-lg p-6 shadow-lg animate-fadeIn">
            <p class="text-gray-200 mb-4">{{ response.text }}</p>
            <div v-if="response.chart" ref="chartRef" class="w-full h-64"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, computed } from 'vue';
  import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/solid';
  
  const query = ref('');
  const response = ref(null);
  const isLoading = ref(false);
  const isFullScreen = ref(false);
  const chartRef = ref(null);
  const isInputFocused = ref(false);
  let chart = null;
  
  const inputAnimationWidth = computed(() => {
    return isInputFocused.value ? '100%' : '0%';
  });
  
  const performSearch = async () => {
    if (!query.value.trim()) return;
  
    isLoading.value = true;
    response.value = null;
    isFullScreen.value = true;
  
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      response.value = generateAIResponse(query.value);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      response.value = { text: 'Sorry, I encountered an error while processing your request.' };
    } finally {
      isLoading.value = false;
    }
  };
  
  const closeFullScreen = () => {
    isFullScreen.value = false;
    response.value = null;
    if (chart) {
      chart.destroy();
      chart = null;
    }
  };
  
  const generateAIResponse = (question) => {
  const lowercaseQuestion = question.toLowerCase();
  
  if (lowercaseQuestion.includes('revenue trend')) {
    return {
      text: "Here's the revenue trend for the last 6 months:",
      chart: {
        type: 'line',
        series: [{
          name: 'Revenue',
          data: [30000, 40000, 35000, 50000, 49000, 60000]
        }],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        }
      }
    };
  } else if (lowercaseQuestion.includes('expense breakdown')) {
    return {
      text: "Here's the breakdown of your expenses this month:",
      chart: {
        type: 'pie',
        series: [44, 55, 13, 43, 22],
        labels: ['Rent', 'Utilities', 'Salaries', 'Marketing', 'Others']
      }
    };
  } else if (lowercaseQuestion.includes('cash flow')) {
    return {
      text: "Here's your cash flow projection for the next 6 months:",
      chart: {
        type: 'bar',
        series: [{
          name: 'Cash In',
          data: [44000, 55000, 57000, 56000, 61000, 58000]
        }, {
          name: 'Cash Out',
          data: [76000, 85000, 101000, 98000, 87000, 105000]
        }],
        xaxis: {
          categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      }
    };
  }

  // Default response if no chart is needed
  return {
    text: "I'm sorry, I don't have specific data to visualize for that question. Could you try asking about revenue trends, expense breakdowns, or cash flow projections?"
  };
};

  
  watch(() => response.value, (newResponse) => {
    if (newResponse && newResponse.chart) {
      setTimeout(() => {
        if (chart) {
          chart.destroy();
        }
        chart = new ApexCharts(chartRef.value, {
          ...newResponse.chart,
          chart: {
            ...newResponse.chart,
            height: 350,
            width: '100%',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            },
            background: '#1F2937',
            foreColor: '#E5E7EB'
          },
          theme: {
            mode: 'dark'
          }
        });
        chart.render();
      }, 0);
    }
  });
  
  onMounted(() => {
    watch(() => isFullScreen.value, (newValue) => {
      if (!newValue && chart) {
        chart.destroy();
        chart = null;
      }
    });
  });
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
  </style>