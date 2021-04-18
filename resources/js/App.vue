<template>
    <d-app>
        <d-modal v-model="modalActive">
            <h1>Hello, I am a modal!</h1>
            <input type="text" placeholder="Placeholder">
            <textarea name="asdf" id="asdf" cols="30" rows="10"></textarea>
        </d-modal>
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
