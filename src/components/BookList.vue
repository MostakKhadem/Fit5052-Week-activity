<template>
  <div>
    <h3>Book List</h3>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})
        <button @click="prepareUpdate(book)" class="btn btn-warning btn-sm ms-2">Update</button>
        <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm ms-2">Delete</button>
      </li>
    </ul>
    <div v-if="books.length === 0">No books found with ISBN greater than 1000.</div>

    <!-- Update form -->
    <div v-if="isUpdating">
      <h4>Update Book</h4>
      <form @submit.prevent="updateBook">
        <div class="form-group mb-3">
          <label for="isbn">ISBN</label>
          <input type="number" id="isbn" v-model="isbn" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label for="name">Book Name</label>
          <input type="text" id="name" v-model="name" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Update Book</button>
        <button @click="cancelUpdate" class="btn btn-secondary ms-2">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../Firebase/init'
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const books = ref([])
const isUpdating = ref(false)
const selectedBookId = ref(null)
const isbn = ref('')
const name = ref('')

const fetchBooks = async () => {
  try {
    const booksCollection = collection(db, 'books')
    const q = query(booksCollection, where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)

    books.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Error fetching books:', err)
  }
}

onMounted(fetchBooks)

const prepareUpdate = (book) => {
  selectedBookId.value = book.id
  isbn.value = book.isbn
  name.value = book.name
  isUpdating.value = true
}

const updateBook = async () => {
  if (!selectedBookId.value) return

  try {
    const bookDoc = doc(db, 'books', selectedBookId.value)
    await updateDoc(bookDoc, {
      isbn: Number(isbn.value),
      name: name.value
    })
    console.log('Book updated successfully!')
    fetchBooks()
    cancelUpdate()
  } catch (err) {
    console.error('Error updating book:', err)
  }
}

// Cancel the update operation
const cancelUpdate = () => {
  selectedBookId.value = null
  isbn.value = ''
  name.value = ''
  isUpdating.value = false
}

// Delete a book
const deleteBook = async (bookId) => {
  try {
    const bookDoc = doc(db, 'books', bookId)
    await deleteDoc(bookDoc)
    console.log('Book deleted successfully!')
    fetchBooks()
  } catch (err) {
    console.error('Error deleting book:', err)
  }
}
</script>

<style scoped>
h3 {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
</style>
