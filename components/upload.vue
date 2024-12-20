<template>
  <div class="flex-1">
    <div class="bg-white rounded-lg">
      <form action="/upload" class="dropzone" id="expenseDropzone">
        <div class="dz-message">
          <p>Drag and drop files here or click to upload.</p>
          <p class="text-gray-600">(Images or PDFs only)</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Dropzone from "dropzone";

const props = defineProps({
  type: {
    type: String,
    default: "Invoice",
  },
});

onMounted(() => {
  Dropzone.autoDiscover = false;

  const companyId = useRoute().params.company;
  const baseUrl = useNuxtApp().$api.baseURL;

  const uploadUrl = `${baseUrl}/companies/${companyId}/documents/upload`;

  const expenseDropzone = new Dropzone("#expenseDropzone", {
    url: uploadUrl,
    maxFiles: 10,
    maxFilesize: 5, // MB
    acceptedFiles: "image/*,application/pdf",
    createImageThumbnails: true,
    thumbnailWidth: 120,
    thumbnailHeight: 120,
    previewTemplate: `
        <div class="dz-preview dz-file-preview">
          <div class="dz-image">
            <img data-dz-thumbnail />
          </div>
          <div class="dz-progress">
            <span class="dz-upload" data-dz-uploadprogress></span>
          </div>
        </div>
      `,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    sending: function (file, xhr, formData) {
      formData.append("type", props.type);
    },
  });

  // Fake upload progress
  expenseDropzone.on("addedfile", function (file) {
    const uploadProgress = file.previewElement.querySelector(".dz-upload");
    let progressWidth = 0;

    const progressInterval = setInterval(() => {
      progressWidth += 10;
      uploadProgress.style.width = progressWidth + "%";

      if (progressWidth >= 100) {
        clearInterval(progressInterval);
        // Simulating successful upload after a short delay
        setTimeout(() => {
          expenseDropzone.emit("success", file);
          expenseDropzone.emit("complete", file);
        }, 500);
      }
    }, 100);
  });
});
</script>

<style scoped>
.dropzone {
  border: 2px dashed #cbd5e0;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.dropzone:hover {
  border-color: #a0aec0;
}

.dropzone .dz-message {
  text-align: center;
  font-size: 1.25rem;
  color: #a0aec0;
}

.dropzone .dz-preview {
  margin: 0.5rem;
}

.dropzone .dz-preview .dz-progress {
  opacity: 1;
  z-index: 1000;
  pointer-events: none;
  position: absolute;
  height: 10px;
  left: 50%;
  top: 50%;
  margin-top: -5px;
  width: 80px;
  margin-left: -40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  overflow: hidden;
}

.dropzone .dz-preview .dz-progress .dz-upload {
  background: #333;
  background: linear-gradient(to bottom, #666, #444);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0;
  transition: width 300ms ease-in-out;
}
</style>
