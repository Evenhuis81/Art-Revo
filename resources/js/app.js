import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { SvgIcon } from "./components/base/SvgIcon"

const app = createApp(App)
app.use(store)
app.use(router)

let token = localStorage.getItem('token')
if (token) {
    store.state.auth.token = true
    store.dispatch('auth/verify', token)
}
store.dispatch('categories/getCategories')

app.component('SvgIcon', SvgIcon)

const files = require.context('./components', true, /\.vue$/i)
files.keys().map(key => app.component(key.split('/').pop().split('.')[0], files(key).default))

app.mount('#app')
