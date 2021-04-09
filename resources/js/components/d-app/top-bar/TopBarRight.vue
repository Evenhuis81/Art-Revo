<template>
    <div v-if="!authenticated && !unverified" @click="this.$router.push('/login')" :style="authButtonS">Login</div>
    <div v-else-if="unverified" style="width: 82px;"></div>
    <div v-else @click="logout" :style="authButtonS">Logout</div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const authenticated = computed(() => store.getters['auth/authenticated'])
        const unverified = computed(() => store.getters['auth/unverified'])
        const authButtonS = {
            width: '80px',
            height: '40px',
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            border: '1px solid purple',
        }
            const logout = () => store.dispatch('auth/logout').then(response => console.log(response))

        return {
            authenticated,
            unverified,
            authButtonS,
            logout
        }
    }
}
</script>
