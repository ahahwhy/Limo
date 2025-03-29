import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router' // This will automatically import from router/index.js
import './assets/main.css'
import 'flowbite'

import { createPinia } from 'pinia'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhkZQlKVqtSf5cAhDnS1jdUgC36QYF1as',
  authDomain: 'limo-da2b4.firebaseapp.com',
  projectId: 'limo-da2b4',
  storageBucket: 'limo-da2b4.firebasestorage.app',
  messagingSenderId: '909817903059',
  appId: '1:909817903059:web:8be3dd41e671bb7ab3a126',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)

app.mount('#app')
