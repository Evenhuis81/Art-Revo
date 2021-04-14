import Admin from '../pages/admin/Admin.vue'
import Furniture from '../pages/admin/Furniture.vue'
import store from '../store'

export default [
    {
        path: '/admin/:id',
        component: Admin,
        meta: { requiresAuth: true },
        // meta: { requiresAuth: true, scopes: ["author_access"] },
        // props: true,
        beforeEnter: (to) => {
            // user is authenticated at this point (unless manually entered path)
            if (store.state.auth.userInfo.id != to.params.id) {
                console.log('beforeenter failed')
                return '/redirect'
            }
        },
        children: [
            {
                path: 'furniture',
                component: Furniture,
            }
        ]
    }
]
