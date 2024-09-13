<!-- <template>
  <div class="firebase-signin">
    <h2>Firebase Sign-in</h2>
    <button @click="signInWithFirebase">Sign in with Firebase</button>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const signInWithFirebase = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then((result) => {
      // Store user authentication status
      localStorage.setItem('isAuthenticated', 'true')
      console.log('User signed in:', result.user)
    })
    .catch((error) => {
      console.error('Error signing in:', error)
    })
}
</script> -->

<template>
  <div class="firebase-signin">
    <h2>Sign In with Firebase</h2>
    <form @submit.prevent="signInWithFirebase">
      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <button type="submit" class="btn btn-primary">Sign In</button>
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const signInWithFirebase = () => {
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // User signed in successfully
      console.log('User signed in:', userCredential.user)
      localStorage.setItem('isAuthenticated', 'true')
    })
    .catch((error) => {
      console.error('Error signing in:', error.message)
      errorMessage.value = error.message
    })
}
</script>

<style scoped>
.firebase-signin {
  max-width: 400px;
  margin: 0 auto;
}
</style>
