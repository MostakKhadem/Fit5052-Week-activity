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
          <router-link to="/GetWeather" class="nav-link" active-class="active">Get Weather</router-link>
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
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active"
            >Get Book Count</router-link
          >
        </li>


        
        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/CountBookApi" class="nav-link" active-class="active"
            >Count Book API</router-link
          >
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <button class="btn btn-link nav-link" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { auth } from '../firebase/init'
import { signOut } from 'firebase/auth'

const isAuthenticated = inject('isAuthenticated')

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('User has logged out successfully')
      localStorage.removeItem('isAuthenticated')
      isAuthenticated.value = false
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
