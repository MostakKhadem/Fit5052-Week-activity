import { createApp, ref } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { auth } from './firebase/init'
import { onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)

// Global authentication state
const isAuthenticated = ref(false)

// Firebase authentication observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
  } else {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
  }
})

// Use PrimeVue and Router s
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// Provide the authentication state globally
app.provide('isAuthenticated', isAuthenticated)

app.mount('#app')
