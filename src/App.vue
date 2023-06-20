<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import ListNote from './components/ListNote.vue'

interface NotesType { id: string, title: string, description: string, wordCount: number,updatedAt:string }
let notes = ref([] as NotesType[])
localStorage.getItem('notes') ? notes.value = JSON.parse(localStorage.getItem('notes') as string) : localStorage.setItem('notes', JSON.stringify(notes.value))
let isFormVisible = ref(false)
let isDeleteVisible = ref(false)
let note = ref({} as NotesType)


// Format the date as desired (e.g., YYYY-MM-DD)


const handleInput = (e: Event) => {
  e.preventDefault()
  const el = e.target as HTMLInputElement
  note.value = {
    ...note.value,
    [el?.name]: el?.value
  }
}

const addNote = (e: Event) => {
  e.preventDefault()
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString();
  let words = note.value.description.trim().split(/\s+/);
  if (note?.value?.id) {
    updateNote(note.value, words.length)
  } else {
    notes.value.push({
      ...note.value,
      wordCount: words.length,
      updatedAt: formattedDate,
      id: Math.random().toString(36).substring(7)
    })
   sortNotes() 
  }
  note.value = {} as NotesType
     toggleForm()
}
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value
}
const toggleDeleteModal = () => {
  isDeleteVisible.value = !isDeleteVisible.value
}
const deleteNote = (id: string) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}

const editNote = (id: string) => {
  toggleForm()
  note.value = notes.value.find((note) => note.id === id) as NotesType
}

const updateNote = (value: NotesType, wordCount: number) => {
  let currentDate = new Date();
  let formattedDate = currentDate.toISOString(); 
  const { id, title, description } = value
  notes.value = notes.value.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        wordCount,
        title,
        description,
        updatedAt: formattedDate
      }
    }
    return note
  })
  sortNotes()

}
const sortNotes = () =>{
//sort notes by recently updated
notes.value = notes.value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  localStorage.setItem('notes', JSON.stringify(notes.value))
}


</script>

<template>
  <header class="p-4 border-b-2 border-current">
    <div>
      <h1 class="font-bold">Notes App</h1>
      <p class="text-sm text-gray-500">A simple notes app built with Vue 3 and Vite.</p>
    </div>
  </header>
  <main class="p-2 md:px-6 mt-5">
    <ul v-if="notes.length > 0" class="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <ListNote v-for="note in notes" :key="note?.id" :note="note" :isDeleteVisible="isDeleteVisible"
        :toggleDeleteModal="toggleDeleteModal" :deleteNote="deleteNote" :editNote="editNote" />
    </ul>
    <div class="flex items-center justify-center h-40" v-else>
      <p class="text-center font-medium ">
        No notes yet. Add one!
      </p>
    </div>
    <button class="py-2 px-4 bg-blue-400 rounded text-white cursor-pointer absolute bottom-20 right-2 z-20"
      @click="toggleForm">Create notes</button>
    <div v-if="isFormVisible"
      class="fixed w-full h-full  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <form @submit="addNote" class="max-w-sm w-full px-2 py-6 rounded bg-slate-50 mx-2">
        <label class="mb-4 block">
          <span class="block">Title</span>
          <input name="title" class="block w-full p-2 rounded-lg border-2 border-current" :value="note.title"
            @change="handleInput" type="text" placeholder="Title" />
        </label>
        <label class="mb-10 block">
          <span class="block">Description</span>
          <textarea name="description" class="block w-full p-2 rounded-lg border-2 border-current"
            :value="note.description" @change="handleInput" placeholder="Description"></textarea>
        </label>
        <button class="py-2 px-4 block mx-auto bg-blue-400 rounded text-white">Add notes</button>
      </form>
      <button class="absolute top-1 right-1 cursor-pointer" @click="toggleForm">close</button>
    </div>
  </main>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
