import axios from "axios"

export const appStarter = store => {
    let token = localStorage.getItem('token')
    if (token) {
        store.state.auth.token = true
        store.dispatch('auth/verify', token)
        axios.interceptors.request.use(config => {
            config.headers['Authorization'] = 'Bearer ' + token
            return config
        })
    }
    // store.dispatch('categories/getCategories')
}
