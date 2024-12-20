<template>
  <div class="bg-white rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
    <ul class="space-y-3">
      <li
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center text-sm"
      >
        <span :class="`w-2 h-2 bg-green-400 rounded-full mr-2`"></span>
        <span class="text-gray-600">{{ activity.description }}</span>
        <span class="ml-auto text-gray-400">{{ activity.timeAgo }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const activities = ref([]);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    const data = await $api.dashboard.get();
    console.log("recent activity data:", data.data.recentActivities);
    activities.value = data.data.recentActivities.map((activity) => ({
      ...activity,
      description: formatDescription(activity.description),
      timeAgo: formatTimeAgo(activity.timestamp),
    }));
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }
});

function formatTimeAgo(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}

function formatDescription(description) {
  const invoicePattern = /#([a-f0-9-]{36})/;
  return description.replace(
    invoicePattern,
    (match, p1) => `#${p1.slice(0, 5)}`,
  );
}
</script>
