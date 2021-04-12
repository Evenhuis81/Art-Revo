import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        token: false,
        user: null,
    }),
    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token)
            state.token = true
        },
        setUser(state, user) {
            state.user = user
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
            axios({ method: 'post', url: '/api/auth/me', headers: { 'Authorization': 'Bearer ' + token } })
                .then(response => commit('setUser', response.data)
                ).catch(() => commit('removeToken'))
        },
        logout({ commit }) {
            return axios({ method: 'post', url: '/api/auth/logout', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
                .then(response => {
                    commit('removeToken')
                    commit('setUser', null)
                    return response.data.message
                }).catch(() => {
                    commit('removeToken')
                    commit('setUser', null)
                })
        }
    },
    getters: {
        unverified: state => (state.token && !state.user),
        authenticated: state => state.token && state.user
    }
}
