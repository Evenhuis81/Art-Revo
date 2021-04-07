<template>
    <div :style="container">
        <div :style="main">
            <div>Left</div>
            <div>Middle</div>
                <!-- <d-button-group> -->
                    <!-- <d-button @click="clicked1" @deactivated="deactivation">Login</d-button> -->
            
                    <!-- <d-button @click="clicked2">Logout</d-button> -->
                <!-- </d-button-groupo> -->
        </div>

        <top-bar-login />

    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const container = store.state.styles.topBar.container
        const main = store.state.styles.topBar.main
        const clicked1 = e => console.log('click button 1', e)
        const clicked2 = e => console.log('click button 2', e)
        const deactivation = () => console.log('deactivated')

        return { container, main, clicked1, clicked2, deactivation }
    }
}
</script>