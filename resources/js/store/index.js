import { createStore } from 'vuex'
import styles from './modules/styles'
import auth from './modules/auth'

export default createStore({
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        styles,
        auth
    }
})
