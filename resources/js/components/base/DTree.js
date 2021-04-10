import { h, onMounted, ref } from "@vue/runtime-core"

export default {
    props: ['data'],
    setup(props) {
        const nodes = ref(props.data)
        //  = props.data.filter(({parent_id}) => parent_id === 0)
        const rootIndexes = []
        nodes.value.forEach(node => {
            if (node.parent_id === 0) {
                // nodes.value.map(item => item.id).indexOf(node.id)
                rootIndexes.push(nodes.value.map(item => item.id).indexOf(node.id))
            }
            node.color = 'red'
            node.display = node.parent_id === 0 ? 'block' : 'none'
            // node.opacity = node.parent_id === 0 ? '0' : '1'
            node.opacity = '0'
            // node.transition = 'opacity 0.4s linear'
        })
        console.log(rootIndexes)
        const changeColor = () => {
            nodes.value[0].color = 'blue'
        }
        const removeElement = () => {
            nodes.value.splice(4, 1)
        }

        onMounted(() => {
            setTimeout(() => {
                let timer = 0
                rootIndexes.forEach((ele, index) => {
                    // console.log(index)
                    nodes.value[ele].transition = 'opacity 0.5s linear ' + index*0.02 + 's'
                    nodes.value[ele].opacity = '1'
                })
            }, 0)
            // }, 0))
            // setTimeout(() => { nodes.value[rootIndexes[0]].opacity = '1' }, 0)
        })
        return {
            nodes,
            changeColor,
            removeElement,
        }
    },
    render() {
        console.log('rendering')
        const makeTemplate = (elements, parentId = 0) => {
            const out = []
            elements.forEach(element => {
                if (element.parent_id === parentId) {
                    const children = makeTemplate(elements, element.id)
                    if (children.length) children.unshift(h('span', 'icon'))
                    children.unshift(element.name)
                    out.push(h('div', { key: 'element' + element.id, style: { display: element.display, color: element.color, opacity: element.opacity, transition: element.transition } }, children))
                }
            });
            return out
        }
        const template = makeTemplate(this.nodes)
        template.unshift(h('button', { onClick: () => this.changeColor() }, 'change'))
        template.unshift(h('button', { onClick: () => this.removeElement() }, 'remove'))
        return template
    }
}
