// import { createApp, ref } from 'vue'
// import App from './App.vue'
// import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'
// import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'

// // Import Firebase and Firebase Authentication
// import { initializeApp } from 'firebase/app'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)
// const auth = getAuth(firebaseApp)

// // Create Vue app instance
// const app = createApp(App)

// // Global authentication state
// const isAuthenticated = ref(false)

// // Firebase authentication observer
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     isAuthenticated.value = true
//     localStorage.setItem('isAuthenticated', 'true')
//   } else {
//     isAuthenticated.value = false
//     localStorage.removeItem('isAuthenticated')
//   }
// })

// // Use PrimeVue and Router
// app.use(router)
// app.use(PrimeVue, {
//   theme: {
//     preset: Aura
//   }
// })

// // Provide the authentication state globally
// app.provide('isAuthenticated', isAuthenticated)

// app.mount('#app')

// import { createApp, ref } from 'vue'
// import App from './App.vue'
// import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'
// import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { initializeApp } from 'firebase/app'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

// // Your web app's Firebase configuration

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)
// const auth = getAuth(firebaseApp)

// // Create Vue app instance
// const app = createApp(App)

// // Global authentication state
// const isAuthenticated = ref(false)
// const currentUser = ref(null) // To store the signed-in user

// // Firebase authentication observer
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     isAuthenticated.value = true
//     currentUser.value = user
//     localStorage.setItem('isAuthenticated', 'true')
//   } else {
//     isAuthenticated.value = false
//     currentUser.value = null
//     localStorage.removeItem('isAuthenticated')
//   }
// })

// // Use PrimeVue and Router
// app.use(router)
// app.use(PrimeVue, {
//   theme: {
//     preset: Aura
//   }
// })

// // Provide the authentication state and current user globally
// app.provide('isAuthenticated', isAuthenticated)
// app.provide('currentUser', currentUser)

// app.mount('#app')

import { createApp, ref } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjwzX5Vkrq59CZJEP9PkDluwjzlzKRWOE',
  authDomain: 'week7-mostakkhan.firebaseapp.com',
  databaseURL: 'https://week7-mostakkhan-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'week7-mostakkhan',
  storageBucket: 'week7-mostakkhan.appspot.com',
  messagingSenderId: '353385059416',
  appId: '1:353385059416:web:14e47d27269f72dc16e62d'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

// Create Vue app instance
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

// Use PrimeVue and Router
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

// Provide the authentication state globally
app.provide('isAuthenticated', isAuthenticated)

app.mount('#app')
