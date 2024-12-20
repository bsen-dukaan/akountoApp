<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Visitors Widget -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <Users class="text-gray-400" :size="20" />
            <span class="text-sm font-medium text-gray-500">Visitors</span>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <h3 class="text-2xl font-bold">{{ visitors }}</h3>
          <div class="flex items-center space-x-1 text-green-500">
            <ArrowUpRight :size="16" />
            <span class="text-sm font-medium">{{ visitorIncrease }}%</span>
          </div>
        </div>
      </div>
  
      <!-- Support Requests Widget -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <MessageSquare class="text-gray-400" :size="20" />
            <span class="text-sm font-medium text-gray-500">Support Requests</span>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <h3 class="text-2xl font-bold">{{ supportRequests }}</h3>
          <div class="flex items-center space-x-1 text-red-500">
            <ArrowDownRight :size="16" />
            <span class="text-sm font-medium">{{ supportDecrease }}%</span>
          </div>
        </div>
      </div>
  
      <!-- Median Response Time Widget -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <Clock class="text-gray-400" :size="20" />
            <span class="text-sm font-medium text-gray-500">Median Response Time</span>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <h3 class="text-2xl font-bold">{{ medianResponseTime }}s</h3>
          <div class="flex items-center space-x-1 text-green-500">
            <ArrowDownRight :size="16" />
            <span class="text-sm font-medium">{{ responseTimeDecrease }}%</span>
          </div>
        </div>
      </div>
  
      <!-- Customer Score Widget -->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <ThumbsUp class="text-gray-400" :size="20" />
            <span class="text-sm font-medium text-gray-500">Customer Score</span>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <h3 class="text-2xl font-bold">{{ customerScore }}%</h3>
          <div class="flex items-center space-x-1 text-green-500">
            <ArrowUpRight :size="16" />
            <span class="text-sm font-medium">{{ customerScoreIncrease }}%</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { Users, MessageSquare, Clock, ThumbsUp, ArrowUpRight, ArrowDownRight } from 'lucide-vue-next'
  
  export default {
    name: 'DashboardMetricsRow',
    components: {
      Users,
      MessageSquare,
      Clock,
      ThumbsUp,
      ArrowUpRight,
      ArrowDownRight
    },
    setup() {
      const visitors = ref(248)
      const visitorIncrease = ref(12.4)
      const supportRequests = ref(210)
      const supportDecrease = ref(5.7)
      const medianResponseTime = ref(2.08)
      const responseTimeDecrease = ref(7.1)
      const customerScore = ref(88)
      const customerScoreIncrease = ref(15.4)
  
      return {
        visitors,
        visitorIncrease,
        supportRequests,
        supportDecrease,
        medianResponseTime,
        responseTimeDecrease,
        customerScore,
        customerScoreIncrease
      }
    }
  }
  </script>