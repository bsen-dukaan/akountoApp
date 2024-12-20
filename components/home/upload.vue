<template>
    <div class="bg-white rounded-lg p-6">
      <!-- <h3 class="text-md font-semibold text-gray-700 mb-4">Upload Documents</h3> -->
      <div
        @dragover.prevent="dragOver"
        @dragleave.prevent="dragLeave"
        @drop.prevent="handleDrop"
        :class="[
          'border-2 border-dashed rounded-lg p-8 text-center',
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500',
        ]"
      >
        <div v-if="!file">
          <DocumentArrowUpIcon class="mx-auto h-12 w-12 text-gray-400" />
          <p class="mt-2 text-sm text-gray-600">
            Drag and drop your file here, or
            <button
              @click="openFileDialog"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              browse
            </button>
          </p>
          <p class="mt-1 text-xs text-gray-500">
            PDF, PNG, JPG up to 10MB
          </p>
        </div>
        <div v-else>
          <DocumentIcon class="mx-auto h-12 w-12 text-blue-500" />
          <p class="mt-2 text-sm font-medium text-gray-900">
            {{ file.name }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            {{ formatFileSize(file.size) }}
          </p>
          <button
            @click="removeFile"
            class="mt-4 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="handleFileSelect"
        accept=".pdf,.png,.jpg,.jpeg"
      />
      <button
        v-if="file"
        @click="uploadFile"
        class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload Document
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { DocumentArrowUpIcon, DocumentIcon } from '@heroicons/vue/24/outline';
  
  const isDragging = ref(false);
  const file = ref(null);
  const fileInput = ref(null);
  
  const dragOver = () => {
    isDragging.value = true;
  };
  
  const dragLeave = () => {
    isDragging.value = false;
  };
  
  const handleDrop = (e) => {
    isDragging.value = false;
    const droppedFile = e.dataTransfer.files[0];
    if (isValidFile(droppedFile)) {
      file.value = droppedFile;
    } else {
      alert('Please upload a valid PDF, PNG, or JPG file under 10MB.');
    }
  };
  
  const openFileDialog = () => {
    fileInput.value.click();
  };
  
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (isValidFile(selectedFile)) {
      file.value = selectedFile;
    } else {
      alert('Please upload a valid PDF, PNG, or JPG file under 10MB.');
    }
  };
  
  const removeFile = () => {
    file.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };
  
  const isValidFile = (file) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return file && validTypes.includes(file.type) && file.size <= maxSize;
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const uploadFile = () => {
    // Implement your file upload logic here
    console.log('Uploading file:', file.value);
    // You would typically send this file to your server using an API call
    // After successful upload, you might want to reset the file state
    // file.value = null;
  };
  </script>