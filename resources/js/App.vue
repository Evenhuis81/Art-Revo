<template>
    <d-app>
        <d-modal v-model="modalActive" />
        <top-bar />
        <div style="margin-top: 100px;"> 
            <button @click="modalActive = true">ASDF</button>
            <router-view />
        </div>
    </d-app>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const modalActive = ref(false)

        return { modalActive }
    }
}
</script>