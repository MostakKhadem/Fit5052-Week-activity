<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <!-- Show the logout button only if the user is logged in -->
        <li v-if="isAuthenticated" class="nav-item">
          <button class="btn btn-link nav-link" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { getAuth, signOut } from 'firebase/auth'

// Inject the global `isAuthenticated` state
const isAuthenticated = inject('isAuthenticated')

const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      console.log('User has logged out successfully')
      localStorage.removeItem('isAuthenticated') // Clear local storage
      isAuthenticated.value = false // Update authentication status
    })
    .catch((error) => {
      console.error('Error during logout:', error)
    })
}
</script>

<style scoped>
.btn-link {
  cursor: pointer;
}
</style>
