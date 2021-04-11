<template>
    <div style="display: flex">
        <div style="flex: 50%">
            <sector-tree v-if="categories" :data="categories" @selected="readNode" />
        </div>
        <div v-if="Object.keys(node).length" style="flex: 50%">
            <span style="font-weight: 900">{{ node.name.toUpperCase() }}</span>
            <div v-if="!editMode">
                <button @click="editMode = !editMode">Edit</button>
                <button @click="deleteNode">Remove</button>
            </div>
            <div v-else>
                <input type="text">
                <button @click="updateNode">Submit</button>
                <br />
                <button @click="editMode = !editMode" style="float: margin-left: 50px;">Cancel</button>
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
        const node = reactive({})
        // const createNode = () => {}
        const readNode = ({id, name, children}) => {
            node.id = id
            node.name = name
            node.children = !!children.length
        }
        const updateNode = () => {}
        const deleteNode = () => {
            if (node.children) {
                alert('can\'t')
                return
            }
            store.dispatch('categories/deleteCategory', node.id).then(response => console.log(response))
        }

        return {
            categories: computed(() => store.state.categories.categories),
            editMode,
            node,
            // createNode,
            readNode,
            updateNode,
            deleteNode,
        }
    }
}
</script>
