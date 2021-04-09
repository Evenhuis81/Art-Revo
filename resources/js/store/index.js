import { createStore } from 'vuex'
import styles from './modules/styles'
import auth from './modules/auth'
import categories from './modules/categories'

export default createStore({
    state: () => ({}),
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        styles,
        auth,
        categories,
    }
})
