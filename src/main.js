// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Router
import router from './router'

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueAxios, axios)
app.use(pinia)

const store = useAuthStore()
axios.interceptors.request.use((config) => {
  const user = store.StateUser
  if (user) {
    config.headers['X-AUTH-TOKEN'] = user.token
  }
  return config
})

app.mount('#app')
