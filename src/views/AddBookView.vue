<!-- <template>
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
</style> -->

<!--- those avove code is week 8 and 9 to add book to firestore database--->
<template>
  <div class="add-book">
    <h2>Add a New Book</h2>
    <!-- Form to add a new book -->
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

    <!-- Success and Error Messages -->
    <div v-if="message" class="alert alert-success mt-3">{{ message }}</div>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Book List Display -->
    <div v-if="books.length">
      <h3>Books List</h3>
      <ul>
        <li v-for="book in books" :key="book.id">{{ book.name }} (ISBN: {{ book.isbn }})</li>
      </ul>
    </div>
    <p v-else>No books available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init'
import { collection, addDoc, getDocs } from 'firebase/firestore'

// Reactive variables
const isbn = ref('')
const name = ref('')
const message = ref('')
const error = ref('')
const books = ref([])

const addBook = async () => {
  try {
    const booksCollection = collection(db, 'books')
    await addDoc(booksCollection, {
      isbn: Number(isbn.value),
      name: name.value
    })
    message.value = 'Book added successfully! The data will be capitalized.'
    isbn.value = ''
    name.value = ''
    error.value = ''

    await fetchBooks()
  } catch (err) {
    error.value = 'Error adding book: ' + err.message
    message.value = ''
  }
}

const fetchBooks = async () => {
  try {
    const booksCollection = collection(db, 'books')
    const querySnapshot = await getDocs(booksCollection)
    books.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    error.value = 'Error fetching books: ' + err.message
  }
}

onMounted(fetchBooks)
</script>

<style scoped>
.add-book {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

button {
  margin-top: 10px;
}

.alert {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
