<template>
    <transition name="fade">
        <div v-if="modelValue" ref="modal" class="modal">
            <div class="modal-content">
                <span v-if="!hideClose" @click="closeModal()" class="close-button">×</span>
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
import { onUpdated, ref } from 'vue';

export default {
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        noCloseOnBackdrop: {
            type: Boolean,
            required: false,
        },
        noCloseOnEsc: {
            type: Boolean,
            required: false,
        },
        hideClose: {
            type: Boolean,
            required: false,
        }
    },
    emits: [ 'update:modelValue'],
    setup(props, { emit }) {
        // get modal HTMLElement for window click event
        const modal = ref(null);

        const removeListeners = () => {
            if (!props.noCloseOnBackdrop) window.removeEventListener('click', windowOnClick);
            if (!props.noCloseOnEsc) window.removeEventListener("keyup", windowOnEscapeKeyPress);
            emit('update:modelValue', false);
        };

        const windowOnClick = e => e.target === modal.value ? removeListeners() : '';

        const windowOnEscapeKeyPress = e => {
            // TODO:: when focus is on input or textarea or others, make escape key loose focus and not close modal
            // e.preventDefault();
            const keycode = ((typeof e.keyCode !='undefined' && e.keyCode) ? e.keyCode : e.which);
            // const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
            if (keycode === 27) removeListeners();
        };

        // close button on modal
        const closeModal = () => removeListeners();

        // when modal gets activated, add eventlisteners (if needed)
        onUpdated(() => {
            // right-hand is failsafe check
            if (props.modelValue && modal.value) {
                if (!props.noCloseOnBackdrop) window.addEventListener("click", windowOnClick);
                if (!props.noCloseOnEsc) window.addEventListener("keyup", windowOnEscapeKeyPress);
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
