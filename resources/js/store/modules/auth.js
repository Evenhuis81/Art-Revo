import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        token: false,
        user: false,
        userInfo: null
    }),
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = true
        },
        setUser(state, user) {
            state.user = !state.user
            state.userInfo = user
        },
        removeToken(state) {
            localStorage.removeItem('token')
            state.token = false
        }
    },
    actions: {
        login({ commit }, credentials) {
            return axios({ method: 'post', url: '/api/auth/login', data: credentials}
                ).then(response => {
                    commit('setToken', response.data.token);
                    commit('setUser', response.data.user);
                    return response.data;
                }).catch(error => { throw error.response.data.message })
        },
        verify({ commit }, token) {
            return axios.post('/api/auth/me')
                .then(response => {
                    commit('setUser', response.data)
                    return 'succes'
                }).catch(() => {
                    commit('removeToken')
                    throw 'fail'
                })
        },
        logout({ commit }) {
            return axios.post('/api/auth/logout')
                .then(response => {
                    commit('removeToken')
                    commit('setUser', null)
                    return response.data.message
                }).catch(() => {
                    // error handler
                    commit('removeToken')
                    commit('setUser', null)
                })
        }
    },
    getters: {
        unverified: state => state.token && !state.user,
        authenticated: state => state.token && state.user
    }
}
