import Login from '../pages/auth/Login.vue'
import Furniture from '../pages/admin/Furniture.vue'
import RightBar from '../pages/admin/RightBar.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        // meta: { guestRouteOnly: true }
        meta: { guestRouteOnly: true }
    },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: Register,
    //     meta: { guestRouteOnly: true },
    // },
    {
        path: '/admin/:id',
        component: RightBar,
        children: [
            {
                path: 'furniture',
                component: Furniture
            }
        ]
    },
    // {
        // path: '/register',
        // name: 'register',
        // component: Register,
        // meta: { guestRouteOnly: true }
    // },
]
