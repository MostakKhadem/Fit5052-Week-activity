import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue';
import AddBookView from '../views/AddBookView.vue';
import GetBookCountView from '../views/GetBookCountView.vue';
import WeatherView from '@/views/WeatherView.vue';
import CountBookApi from '@/views/CountBookApi.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/CountBookApi', name: 'CountBookApi', component: CountBookApi },
  { path: '/GetWeather', name: 'GetWeather', component: WeatherView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'), // Use Vite's env system
  routes
});

export default router;
