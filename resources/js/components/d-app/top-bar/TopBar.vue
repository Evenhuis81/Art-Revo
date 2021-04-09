<template>
    <div :style="container">
        <div :style="main">
            <top-bar-left />
            <div>Middle</div>
            <top-bar-right />
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const container = store.state.styles.topBar.container
        const main = store.state.styles.topBar.main

        return {
            container,
            main,
        }
    }
}
</script>
