<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="login">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="validateGender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="validateAustralianResident"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
                @blur="validateReason"
              ></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- PrimeVue DataTable -->
  <div class="row mt-5" v-if="submittedCards.length">
    <DataTable :value="submittedCards" responsiveLayout="scroll">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident">
        <template #body="slotProps">
          {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason for joining"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useRouter } from 'vue-router'

// Define common usernames and offensive words
const commonUsernames = ['admin', 'user', 'test']
const offensiveWords = ['badword1', 'badword2', 'badword3'] // Replace with actual words

// Router instance
const router = useRouter()

// Form data and errors
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  isAustralian: null,
  reason: null,
  gender: null
})

// Hardcoded credentials
const hardcodedPassword = '@Password123'

// Helper function to check for offensive words
const containsOffensiveWord = (text) => {
  return offensiveWords.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text))
}

// Validation functions
const validateName = (blur) => {
  const username = formData.value.username
  if (username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else if (commonUsernames.includes(username.toLowerCase())) {
    errors.value.username = 'This username is too common, please choose another one'
  } else if (/\s/.test(username)) {
    errors.value.username = 'Username must not contain spaces'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    }
  } else {
    errors.value.password = null
  }
  validateConfirmPassword(false)
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateAustralianResident = () => {
  if (formData.value.isAustralian === null) {
    errors.value.isAustralian = 'Please indicate if you are an Australian resident'
  } else {
    errors.value.isAustralian = null
  }
}

const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = 'Please select your gender'
  } else {
    errors.value.gender = null
  }
}

const validateReason = () => {
  const reason = formData.value.reason.trim()
  if (reason.length === 0) {
    errors.value.reason = 'Please provide a reason for joining'
  } else if (reason.length < 10) {
    errors.value.reason = 'Reason must be at least 10 characters long'
  } else if (containsOffensiveWord(reason)) {
    errors.value.reason = 'Reason contains inappropriate language'
  } else {
    errors.value.reason = null
  }
}

// Form submission and login validation
const login = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateAustralianResident()
  validateGender()
  validateReason()

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.isAustralian &&
    !errors.value.gender &&
    !errors.value.reason &&
    formData.value.password === hardcodedPassword
  ) {
    console.log('Credentials are correct, setting isAuthenticated to true')
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/about')
  } else {
    console.log('Invalid credentials or form validation failed')
    alert('Invalid credentials. Please try again.')
  }
}

// Clear form
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    isAustralian: null,
    reason: null,
    gender: null
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
