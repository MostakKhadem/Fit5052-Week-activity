import { createApp, ref } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

// Optionally, if you're using Bootstrap, you can keep the import:
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
// Simple authentication state
const isAuthenticated = ref(false)

// Provide the authentication state globally

app.provide('isAuthenticated', isAuthenticated)

app.mount('#app')
