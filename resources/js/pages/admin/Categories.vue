<template>
    <div style="display: flex">
        <div style="flex: 50%">
            <sector-tree v-if="categories" :data="categories" @selected="setNode" />
        </div>
        <div style="flex: 50%">
            <div v-if="selectedNode">
                <span style="font-weight: 900">{{ selectedNode.name.toUpperCase() }}</span>
                <div v-if="!editMode">
                    <button @click="editMode = !editMode">Edit</button>
                    <button @click="remove(selectedNode.id)">Remove</button>
                </div>
                <div v-else>EditMode<span @click="editMode = !editMode">cancel edit</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import SectorTree from '../../components/base/CategoriesTree'

export default {
    components: { SectorTree },
    setup() {
        const store = useStore()
        const editMode = ref(false)
        const selectedNode = ref(null)
        const setNode = node => {
            console.log(node)
            selectedNode.value = node
        }
        const remove = nodeId => store.dispatch('categories/deleteCategory', nodeId)

        return {
            categories: computed(() => store.state.categories.categories),
            editMode,
            setNode,
            remove,
            selectedNode,
        }
    }
}
</script>
