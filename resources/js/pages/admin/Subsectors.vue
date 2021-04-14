<template>
<button @click="removeElement">Remove</button>
    <d-tree v-if="subsectors" :data="subsectors" />
    
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import DTree from '../../components/base/DTree'

export default {
    components: { DTree },
    setup() {
        const store = useStore()
        const removeElement = () => {
            store.dispatch('categories/deleteCategory', 5)
        }

        return {
            removeElement,
            subsectors: computed(() => store.state.categories.categories)
        }
    }
}
</script>
