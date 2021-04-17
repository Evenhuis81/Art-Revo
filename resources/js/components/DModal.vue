<template>
    <transition name="fade">
        <div v-if="modelValue" ref="modall" class="modal">
            <div class="modal-content">
                <span @click="closeModal()" class="close-button">×</span>
                <h1>Hello, I am a modal!</h1>
            </div>
        </div>
    </transition>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default {
    props: {
        modelValue: Boolean
    },
    emits: [ 'update:modelValue'],
    setup(props, { emit }) {
        const store = useStore();
        const modall = ref(null);
        watchEffect(() => {
            if (modall.value) {
                const windowOnClick = event => {
                    console.log('windowOnClick');
                        if (event.target === modall.value) {
                            window.removeEventListener('click', windowOnClick)
                            emit('update:modelValue', false);
                        }
                    }
                    if (props.modelValue) {
                        console.log('activated eventlistener');
                        window.addEventListener("click", windowOnClick);
                    }
                } // => <div></div>
            }, 
            {
                flush: 'post'
        })
        const active = ref(false);

        // const closeModal() {

        // }
        onUpdated(() => {
            // console.log('updated')
            
        })
        // const onActive = computed(() => {
            
        // });
        // window.addEventListener("click", windowOnClick);
        // onBeforeUnmount(() => window.removeEventListener('click', windowOnClick));

        return { active, modall };
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transform: scale(1.0);
    transition: opacity 0.25s, transform 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
.modal {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* transform: scale(1.1); */
    /* transition: opacity 0.25s, transform 0.25s; */
}
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    width: 24rem;
    border-radius: 0.5rem;
}
.close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
}
.close-button:hover {
    background-color: darkgray;
}
/* .show-modal {
    opacity: 1;
    transform: scale(1.0);
    transition: lity 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
} */
</style>