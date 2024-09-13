<template>
  <div class="add-book">
    <h2>Add a New Book</h2>
    <form @submit.prevent="addBook">
      <div class="form-group mb-3">
        <label for="isbn">ISBN</label>
        <input
          type="number"
          id="isbn"
          v-model="isbn"
          class="form-control"
          required
          placeholder="Enter ISBN number"
        />
      </div>
      <div class="form-group mb-3">
        <label for="name">Book Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="form-control"
          required
          placeholder="Enter Book Name"
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
    <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../Firebase/init'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const message = ref('')
const error = ref('')

const addBook = async () => {
  try {
    const booksCollection = collection(db, 'books')
    await addDoc(booksCollection, {
      isbn: Number(isbn.value),
      name: name.value
    })
    message.value = 'Book added successfully!'
    isbn.value = ''
    name.value = ''
    error.value = ''
  } catch (err) {
    error.value = 'Error adding book: ' + err.message
    message.value = ''
  }
}
</script>

<style scoped>
.add-book {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
