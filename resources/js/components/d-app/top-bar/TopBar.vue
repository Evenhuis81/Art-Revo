<template>
    <div :style="container">
        <div :style="main">
            <div>Left</div>
            <div>Middle</div>
            <div>Right</div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const container = store.state.styles.topBar.container
        const main = store.state.styles.topBar.main

        return { container, main }
    }
}
</script>