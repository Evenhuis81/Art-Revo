<template>
    <div :style="container">
        <div :style="main">
            Text
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const container = store.state.styles.topBarLogin.container
        const main = store.state.styles.topBarLogin.main

        return {
            container,
            main
        }
    }
}
</script>

<style>

</style>