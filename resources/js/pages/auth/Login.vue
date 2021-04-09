<template>
    <form v-if="!authenticated && !unverified" @submit.prevent="login">
        <label for="email">E-Mail</label>
        <input id="email" @input="form.email = $event.target.value" required autocomplete="off">
        <br />
        <label for="password">Password</label>
        <input id="password" @input="form.password = $event.target.value" required autocomplete="off">
        <button type="submit">Submit</button>
    </form>
    <h2 v-if="!authenticated && !unverified">Unauthenticated</h2>
    <h2 v-if="unverified">Unverified</h2>
    <h2 v-if="authenticated">Authenticated</h2>
    <button v-if="authenticated" @click="logout">Logout</button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
setup() {
    const store = useStore()
    const router = useRouter()
    const form = {
        email: "",
        password: ""
    }
    const login = () => {
        store.dispatch('auth/login', form)
            .then(response => {
                console.log(response)
                router.push('/')
            }).catch(error => console.log(error))
    }
    const logout = () => {
        store.dispatch('auth/logout').then(response => console.log(response))
    }

    return {
        form,
        login,
        logout,
        unverified: computed(() => store.getters['auth/unverified']),
        authenticated: computed(() => store.getters['auth/authenticated'])
        }
  }
}
</script>
