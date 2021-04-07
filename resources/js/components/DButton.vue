<template>
    <span @click="clicked" :style="[styles, styles2]">
        <slot></slot>
    </span>
</template>

<script>
import { computed, onBeforeUnmount, reactive, ref } from 'vue'

export default {
    emits: ['click', 'deactivated'],
    setup(_, { emit }) {
        const active = ref(false)

        // TODO:: if button gets destroyed before handler is removed
        // onBeforeUnmount(() => {})

        const styles = {
            padding: '10px 20px',
            cursor: 'pointer',
        }
        const styles2 = computed(() => ({ border: active.value ? '2px solid #1db1de' : '2px solid #eee' }))
        function handleThis() {
            active.value = false
            console.log('dbutton global eventlistener(once)')
            emit('deactivated')
        }
        const clicked = e => {
            e.stopPropagation()

            if (active.value === false) window.addEventListener('click', handleThis, { once: true })
            else window.removeEventListener('click', handleThis)

            active.value = !active.value
            emit('click', e)
        }

        return { styles, styles2, clicked }
    }
}
</script>