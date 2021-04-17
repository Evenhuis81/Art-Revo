<template>
    <transition name="fade">
        <div class="modal">
            <div class="modal-content">
                <span @click="$store.state.modal = !$store.state.modal" class="close-button">×</span>
                <h1>Hello, I am a modal!</h1>
            </div>
        </div>
    </transition>
</template>

<script>
import { onBeforeUnmount, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    props: ['trigger'],
    setup() {
        const store = useStore();
        const windowOnClick = () => store.state.modal = !store.state.modal;
        window.addEventListener("click", windowOnClick);
        onBeforeUnmount(() => window.removeEventListener('click', windowOnClick));
    },
}
</script>

<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition:  opacity 0.25s 0s, transform 0.25s;
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
.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}
</style>