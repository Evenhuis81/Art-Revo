<template>
    <transition name="fade">
        <div v-if="modelValue" ref="modal" class="modal">
            <div class="modal-content">
                <span @click="closeModal()" class="close-button">×</span>
                <h1>Hello, I am a modal!</h1>
            </div>
        </div>
    </transition>
</template>

<script>
import { onUpdated, ref } from 'vue';

export default {
    props: {
        modelValue: Boolean
    },
    emits: [ 'update:modelValue'],
    setup(props, { emit }) {
        const modal = ref(null);

        const windowOnClick = event => {
            if (event.target === modal.value) {
                window.removeEventListener('click', windowOnClick);
                emit('update:modelValue', false);
            };
        };

        const closeModal = () => {
            window.removeEventListener('click', windowOnClick);
            emit('update:modelValue', false);
        };

        onUpdated(() => {
            if (props.modelValue && modal.value) {
                window.addEventListener("click", windowOnClick);
            };
        }); 

        return { modal, closeModal };
    },
};
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
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
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
</style>
