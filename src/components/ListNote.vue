<script setup lang="ts">
defineProps(['note', 'isDeleteVisible', 'toggleDeleteModal', 'deleteNote', 'editNote'])
</script>

<template>
  <li class="mb-2 bg-gray-100 shadow p-2 rounded">
        <p>Title: {{ note?.title }}</p>
        <p>snippet: {{ note?.description?.substring(0, 9) }}</p>
        <div class="mt-6 flex items-center justify-end gap-3">
          <button @click="toggleDeleteModal" class="py-2 px-4 bg-red-400 bg-delete-image bg-no-repeat bg-center w-8 h-8 rounded text-white"></button>
          <button @click="editNote(note?.id)" class="py-2 px-4 bg-blue-400 bg-edit-image bg-no-repeat bg-center w-8 h-8 rounded text-white"></button>
        </div>
        <div v-if="isDeleteVisible"
          class="fixed w-full h-full  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div class="max-w-sm w-full px-2 py-6 rounded bg-slate-50 mx-2 text-center">
            <p>Are you sure you want to delete</p>
            <div class="flex items-center mt-5">
              <button  @click="toggleDeleteModal" class="py-2 px-4 block mx-auto bg-blue-200 rounded text-black cursor-pointer">No, Not yet </button>
              <button @click="deleteNote(note?.id)"
                class="py-2 px-4 cursor-pointer block mx-auto bg-red-400 rounded text-white">Yes, Delete</button>
            </div>
          </div>
          <button class="absolute top-1 right-1 cursor-pointer" @click="toggleDeleteModal">close</button>
        </div>

      </li>
</template>
