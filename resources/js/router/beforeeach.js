import store from "../store"

export default async function (to) {
    // check for local token and verify user (page refresh)
    if (store.getters['auth/unverified']) {
        await store.dispatch('auth/verify')
            .then(() => console.log('token verification succes'))
            .catch(() => console.log('token verification failed'))
    }

    const auth = store.getters['auth/authenticated']

    // auth route and not signed in
    if (to.meta.requiresAuth && !auth) {
        console.log('auth route only')
        return '/redirect'
    }
    // pages with requiresGuest are not available for logged in users (register, login)
    if (to.meta.requiresGuest && auth) {
        console.log('guest route only')
        return false
    }
    // proceed to route
};
