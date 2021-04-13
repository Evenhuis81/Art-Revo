import router from "."
import store from "../store"

export default async function (to, from) {
    console.log('beforeeach', to)
    // check for local token and verify user (page refresh)
    if (store.getters['auth/unverified']) {
    //   store.dispatch('setContentLoad', true)
        await store.dispatch('auth/verify')
            .then(() => console.log('token verification succes'))
            .catch(() => {
                console.log('token verification failed')
                return '/redirect'
            })
    }

    const auth = store.getters['auth/authenticated']
    // const role = store.getters['auth/userRole']

    if (to.meta.requiresAuth && !auth) {
        console.log('auth route only')
        return '/redirect'
        // if (auth) {
    //     const scopes = to.meta.scopes || []
    //     if (scopes.map(x => x).includes(role + '_access')) {
    //       next()
    //     } else {
    //       store.dispatch('snackbar/snackbar', {
    //         text: "You are not authorized for this route!",
    //         color: "error"
    //       })
    //       return next({ name: "redirect" })
    //     }
    //   } else {
    //     store.dispatch('snackbar/snackbar', {
    //       text: "You are not authenticated for this route!",
    //       color: "warning"
    //     })
    //     return next({ name: "redirect" })
    //   }
    }
    // pages with requiresGuest are not available for logged in users (register, login)
    if (to.meta.requiresGuest && auth) {
        console.log('guest route only')
        return false
    }
    // proceed to route
};
