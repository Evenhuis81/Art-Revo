import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.use(store)
app.use(router)

const files = require.context('./components', true, /\.vue$/i)
files.keys().map(key => app.component(key.split('/').pop().split('.')[0], files(key).default))

app.mount('#app')
