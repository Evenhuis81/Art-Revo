import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        categories: null,
    }),
    mutations: {
        setCategories(state, categories) {
            state.categories = categories
        },
        removeCategory(state, id) {

            const removeIndex = state.categories.map(item => item.id)
                       .indexOf(id);

            state.categories.splice(removeIndex, 1);
        }
    },
    actions: {
        getCategories({ commit }) {
            axios.get('/api/categories').then(response => {
                // const clone = JSON.parse(JSON.stringify(response.data));
                // const categories = makeTree(clone)
                commit('setCategories', response.data)
            })
        },
        createCategory({}, payload) {
            axios.post('/api/categories', payload)
        },
        deleteCategory({ commit }, id) {
            // axios.post('api/categories/{id}').then(response => console.log(response.data))
            commit('removeCategory', id)
        }
    },
    getters: {},
}
