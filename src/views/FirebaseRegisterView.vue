<template>
  <div class="firebase-register">
    <h2>Register with Firebase</h2>
    <form @submit.prevent="registerWithFirebase">
      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="role">Role</label>
        <select v-model="role" id="role" class="form-control" required>
          <option value="" disabled>Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref as dbRef, set } from 'firebase/database'

const email = ref('')
const password = ref('')
const role = ref('')
const errorMessage = ref('')

const registerWithFirebase = () => {
  const auth = getAuth()
  const db = getDatabase()

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user

      set(dbRef(db, 'users/' + user.uid), {
        email: user.email,
        id: user.uid,
        role: role.value
      })
        .then(() => {
          console.log('User data saved successfully:', {
            email: user.email,
            id: user.uid,
            role: role.value
          })
          localStorage.setItem('isAuthenticated', 'true')
        })
        .catch((error) => {
          console.error('Error saving user data:', error)
          errorMessage.value = error.message
        })
    })
    .catch((error) => {
      console.error('Error registering:', error.message)
      errorMessage.value = error.message
    })
}
</script>

<style scoped>
.firebase-register {
  max-width: 400px;
  margin: 0 auto;
}
</style>
