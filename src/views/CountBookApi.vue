<template>
  <div id="app">
    <h1>All Books</h1>

    <pre>{{ books }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: null,
      error: null
    }
  },
  mounted() {
    this.getAllBooksAPI()
  },
  methods: {
    async getAllBooksAPI() {
      try {
        const response = await axios.get(
          'https://us-central1-week7-mostakkhan.cloudfunctions.net/getAllBooksAPI'
        )
        this.books = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching books:', error.message)
        this.error = 'Error fetching books.'
        this.books = null
      }
    }
  }
}
</script>

<style scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
