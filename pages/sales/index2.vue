<template>
    <div class="bg-gray-900 text-white p-8 rounded-xl shadow-2xl">
      <h2 class="text-2xl font-bold mb-6 text-center">AI-Powered Document Processing Pipeline</h2>
      <div class="relative">
        <div class="flex justify-between items-center mb-8">
          <div v-for="(stage, index) in processingStages" :key="index" class="flex flex-col items-center w-1/4 z-10">
            <div 
              :class="[
                'rounded-full h-20 w-20 flex items-center justify-center text-3xl mb-4 relative',
                stage.active ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400',
                { 'animate-pulse': stage.active && stage.processing }
              ]"
            >
              <span :class="{ 'animate-spin': stage.active && stage.processing }">{{ stage.icon }}</span>
              <div v-if="stage.active" class="absolute -inset-1 bg-blue-500 rounded-full blur opacity-30"></div>
            </div>
            <span class="text-sm font-medium text-center" :class="{ 'text-blue-400': stage.active }">{{ stage.name }}</span>
          </div>
        </div>
        <div class="absolute top-10 left-0 w-full h-1 bg-gray-700">
          <div class="h-full bg-blue-500 transition-all duration-1000 ease-in-out" :style="{ width: progressWidth }"></div>
        </div>
      </div>
  
      <div class="mt-12 bg-gray-800 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">Processing Details</h3>
        <div v-if="currentStage < processingStages.length" class="space-y-2">
          <p><span class="text-blue-400 font-semibold">Current Stage:</span> {{ processingStages[currentStage].name }}</p>
          <p><span class="text-blue-400 font-semibold">Status:</span> {{ processingStages[currentStage].processing ? 'Processing...' : 'Complete' }}</p>
          <p><span class="text-blue-400 font-semibold">AI Confidence:</span> {{ aiConfidence }}%</p>
          <div class="w-full bg-gray-700 rounded-full h-2.5">
            <div class="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out" :style="{ width: `${aiConfidence}%` }"></div>
          </div>
        </div>
        <div v-else class="text-green-400 font-semibold">
          Processing Complete! Document ready for QuickBooks.
        </div>
      </div>
  
      <button 
        @click="startProcessing" 
        class="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        :disabled="isProcessing"
      >
        {{ isProcessing ? 'Processing...' : 'Start Processing' }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const currentStage = ref(0);
  const aiConfidence = ref(0);
  const isProcessing = ref(false);
  
  const processingStages = ref([
    { name: 'Document Upload', icon: '📄', active: false, processing: false },
    { name: 'Data Extraction', icon: '🔍', active: false, processing: false },
    { name: 'AI Analysis', icon: '🧠', active: false, processing: false },
    { name: 'QuickBooks Sync', icon: '🔄', active: false, processing: false }
  ]);
  
  const progressWidth = computed(() => {
    return `${(currentStage.value / (processingStages.value.length - 1)) * 100}%`;
  });
  
  const advanceStage = () => {
    if (currentStage.value < processingStages.value.length) {
      processingStages.value[currentStage.value].active = true;
      processingStages.value[currentStage.value].processing = true;
      
      // Simulate AI processing
      const processInterval = setInterval(() => {
        aiConfidence.value += Math.floor(Math.random() * 10);
        if (aiConfidence.value >= 100) {
          aiConfidence.value = 100;
          clearInterval(processInterval);
          setTimeout(() => {
            processingStages.value[currentStage.value].processing = false;
            currentStage.value++;
            aiConfidence.value = 0;
            if (currentStage.value < processingStages.value.length) {
              advanceStage();
            } else {
              isProcessing.value = false;
            }
          }, 1000);
        }
      }, 200);
    }
  };
  
  const startProcessing = () => {
    if (!isProcessing.value) {
      isProcessing.value = true;
      currentStage.value = 0;
      processingStages.value.forEach(stage => {
        stage.active = false;
        stage.processing = false;
      });
      advanceStage();
    }
  };
  </script>