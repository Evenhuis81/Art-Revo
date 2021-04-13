import Admin from '../pages/admin/Admin.vue'
import Furniture from '../pages/admin/Furniture.vue'

export default [
    {
        path: '/admin/:id',
        component: Admin,
        children: [
            {
                path: 'furniture',
                component: Furniture
            }
        ]
    }
]
