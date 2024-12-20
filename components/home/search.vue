<template>
  <div>
    <!-- Normal view -->
    <div v-if="!isFullScreen" class="bg-white rounded-lg p-4 hidden">
      <h3 class="text-sm font-semibold text-gray-700 mb-3">AI Assistant</h3>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
        </div>
        <input
          v-model="query"
          @click="toggleFullScreen"
          type="text"
          placeholder="Ask anything...like revenue trend, expense breakdown, cash flow"
          class="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Full-screen modal -->
    <div v-else class="fixed inset-0 flex bg-neutral-100 z-50 overflow-hidden">
      <!-- Chat previews sidebar -->
      <div
        class="bg-gray-900 w-[18%] border-r border-gray-700 flex flex-col overflow-hidden"
      >
        <div class="p-3 border-b border-gray-800">
          <h2 class="text-3xl font-semibold text-indigo-500">akounto ai</h2>
        </div>
        <div
          class="flex-grow chat-previews-container p-2 overflow-y-auto"
          ref="chatPreviewsContainer"
          @scroll="handleScroll"
        >
          <div
            v-for="preview in chatPreviews"
            :key="preview.id"
            @click="loadChatData(preview.id)"
            class="p-2.5 hover:bg-gray-800 cursor-pointer rounded-xl"
          >
            <p class="text-sm text-gray-200 truncate">{{ preview.prompt }}</p>
          </div>
          <div v-if="isLoadingMore" class="text-center py-2 text-gray-400">
            Loading more...
          </div>
        </div>
        <div class="p-4 border-t border-gray-800">
          <button
            @click="startNewChat"
            class="w-full py-2 bg-indigo-600 text-indigo-50 font-bold rounded-lg focus:outline-none"
          >
            New Chat
          </button>
        </div>
      </div>

      <!-- Main chat area -->
      <div class="flex-1 flex flex-col bg-neutral-100 overflow-hidden">
        <div
          class="p-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h2 class="text-xl font-bold text-gray-800">Chat</h2>
          <button
            @click="closeFullScreen"
            class="text-gray-600 hover:text-gray-800"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <div class="flex-grow overflow-y-auto p-4" ref="chatContentArea">
          <div v-if="currentChatData">
            <div class="mb-4">
              <p class="font-bold">User:</p>
              <p>{{ currentChatData.prompt }}</p>
            </div>
            <div>
              <p class="font-bold">AI:</p>
              <p>{{ currentChatData.result }}</p>
            </div>
          </div>
          <div v-else-if="response" class="bg-white rounded-lg p-6 shadow">
            <p class="text-gray-700 mb-4">{{ response }}</p>
          </div>
        </div>
        <div
          v-if="!currentChatData && !response"
          class="p-4 border-t border-gray-200"
        >
          <div v-if="isLoading" class="text-center text-gray-700">
            Loading...
          </div>
          <div v-else class="relative">
            <input
              v-model="query"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Ask anything about your finances..."
              class="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <button
              @click="performSearch"
              class="absolute inset-y-0 right-0 px-4 py-2 bg-indigo-700 text-white rounded-r-lg focus:outline-none focus:ring-1 focus:ring-indigo-700 focus:ring-offset-1"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { useNuxtApp } from "#app";

const { $api } = useNuxtApp();
const query = ref("");
const response = ref(null);
const isLoading = ref(false);
const isFullScreen = ref(false);
const chatPreviews = ref([]);
const currentChatData = ref(null);
const chatPreviewsContainer = ref(null);
const chatContentArea = ref(null);
const page = ref(1);
const limit = ref(20);
const hasMore = ref(true);
const isLoadingMore = ref(false);

const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const enableBodyScroll = () => {
  document.body.style.overflow = "";
};

const toggleFullScreen = () => {
  isFullScreen.value = true;
  disableBodyScroll();
  getChatHistoryPreviews();
};

const performSearch = async () => {
  if (!query.value.trim()) return;

  isLoading.value = true;
  response.value = null;
  isFullScreen.value = true;
  currentChatData.value = null;

  try {
    const result = await $api.aiChat.post({
      companyId: localStorage.getItem("companyID") || "",
      prompt: query.value,
    });
    query.value = "";
    if (result.data && result.data.response) {
      response.value = result.data.response;
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    response.value =
      "Sorry, I encountered an error while processing your request.";
  } finally {
    await getChatHistoryPreviews();
    isLoading.value = false;
  }
};

const getChatHistoryPreviews = async (loadMore = false) => {
  if (!loadMore) {
    page.value = 1;
    chatPreviews.value = [];
    hasMore.value = true;
  }

  if (!hasMore.value) return;

  try {
    isLoadingMore.value = true;
    const result = await $api.chatHistoryPreview.get({
      params: { page: page.value, limit: limit.value },
    });
    chatPreviews.value = [...chatPreviews.value, ...result.data.data];
    hasMore.value = result.data.hasMore;
    page.value++;
  } catch (error) {
    console.error("Error fetching chat previews:", error);
  } finally {
    isLoadingMore.value = false;
  }
};

const loadChatData = async (chatId) => {
  try {
    const result = await $api.chatData.get(chatId);
    currentChatData.value = result.data.data;
    response.value = null;
  } catch (error) {
    console.error("Error fetching chat data:", error);
  }
};

const closeFullScreen = () => {
  isFullScreen.value = false;
  enableBodyScroll();
  response.value = null;
  currentChatData.value = null;
};

const startNewChat = () => {
  query.value = "";
  response.value = null;
  currentChatData.value = null;
  getChatHistoryPreviews();
};

const handleScroll = (event) => {
  event.preventDefault();
  const container = chatPreviewsContainer.value;
  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 20
  ) {
    if (!isLoadingMore.value && hasMore.value) {
      getChatHistoryPreviews(true);
    }
  }
};

watch(
  () => isFullScreen.value,
  (newValue) => {
    if (newValue) {
      disableBodyScroll();
      getChatHistoryPreviews();
    } else {
      enableBodyScroll();
    }
  },
);

onMounted(() => {
  if (isFullScreen.value) {
    getChatHistoryPreviews();
    disableBodyScroll();
  }
});

onUnmounted(() => {
  enableBodyScroll();
});
</script>

<style scoped>
.chat-previews-container {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0) transparent;
}

.chat-previews-container::-webkit-scrollbar {
  width: 6px;
}

.chat-previews-container::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0);
  border-radius: 3px;
}

/* Ensure the full-screen modal takes up the entire viewport */
.fixed.inset-0 {
  height: 100vh;
  width: 100vw;
}
</style>
