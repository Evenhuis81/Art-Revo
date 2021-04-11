<template>
    <div v-if="authenticated" :style="container">
        <router-link to="/admin/categories" custom v-slot="{ isActive, navigate }">
            <div @click="navigate" :style="[authButtonS, { backgroundColor: isActive ? '#eee' : 'white' }]">Manage Categories</div>
        </router-link>
        <router-link to="/subsectors" custom v-slot="{ isActive, navigate }">
            <div @click="navigate" :style="[authButtonS, { backgroundColor: isActive ? '#eee' : 'white' }]">Subsectors</div>
        </router-link>
        
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const container = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            float: 'right',
            width: '200px',
            height: 'calc(100vh - 101px)',
            backgroundColor: 'white',
            borderLeft: '1px solid #694717',
        }
        const authButtonS = {
            width: '160px',
            height: '40px',
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            border: '1px solid purple',
        }
        const authenticated = computed(() => store.getters['auth/authenticated'])

        return {
            container,
            authButtonS,
            authenticated
        }
    }
}
</script>
