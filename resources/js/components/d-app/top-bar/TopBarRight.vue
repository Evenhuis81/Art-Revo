<template>
    <div v-if="!authenticated" @click="this.$router.push('/login')" :style="loginS">Login</div>
    <div v-else :style="{ width: '80px' }"></div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const authenticated = computed(() => store.getters['auth/authenticated'])
        const loginS = {
            width: '80px',
            height: '40px',
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            border: '1px solid purple',
        }

        return {
            authenticated,
            loginS,
        }
    }
}
</script>
