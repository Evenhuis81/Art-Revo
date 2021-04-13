import Login from '../pages/auth/Login.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        // meta: { guestRouteOnly: true }
    },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: Register,
    //     meta: { guestRouteOnly: true },
    // }
]
