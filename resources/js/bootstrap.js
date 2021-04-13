import axios from "axios"
import beforeEach from './router/beforeeach'

export const appStarter = (store, router) => {
    let token = localStorage.getItem('token')
    if (token) store.state.auth.token = true
    axios.interceptors.request.use(config => {
        if (token) config.headers['Authorization'] = 'Bearer ' + token
        return config
    })
    router.beforeEach(beforeEach)
    store.dispatch('categories/getCategories')
}
