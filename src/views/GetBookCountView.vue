<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      count: null,
      error: null
    }
  },
  methods: {
    async getBookCount() {
      try {
        // Use axios to fetch the book count from the cloud function
        const response = await axios.get('https://countbooks-xt5pag7ffa-uc.a.run.app')
        this.count = response.data.count
        this.error = null
      } catch (error) {
        // In case of an error, log it and show the error message
        console.error('Error fetching book count:', error)
        this.error = 'Error fetching book count'
        this.count = null
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

button {
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
