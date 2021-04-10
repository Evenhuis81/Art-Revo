import { h, onMounted, ref } from "vue"

export default {
    props: ['data'],
    setup(props) {
        const nodes = ref(props.data)
        const rootIndexes = []
        nodes.value.forEach(node => {
            // console.time('A')
            if (node.parent_id === 0) rootIndexes.push(nodes.value.map(item => item.id).indexOf(node.id))
            // console.timeEnd('A')
            node.display = node.parent_id === 0 ? 'block' : 'none'
            node.opacity = node.parent_id === 0 ? '0' : '1'
            node.width = '500px'
            node.height = '40px'
            node.marginTop = '5px'
            node.marginLeft = '10px'
            node.lineHeight = '40px'
            node.textAlign = 'center'
            node.cursor = 'pointer'
            node.border = '1px solid purple'
            node.backgroundColor = 'white'
        })
        const changeColor = () => {
            nodes.value[0].color = 'blue'
        }
        const removeElement = () => {
            nodes.value.splice(4, 1)
        }
        // const mouseEntered = nodeId => {
            // console.time('B')
            // setTimeout(() => {
            //     const node = nodes.value.map(item => item.id).indexOf(nodeId)
            //     nodes.value[node].backgroundColor = 'blue'
            // }, 0)
            // const node = nodes.value.map(item => item.id).indexOf(nodeId)
            // nodes.value[node].backgroundColor = 'blue'
            // console.timeEnd('B')
        // }
        const mouseEntered = e => {
            e.target.style.backgroundColor = 'blue'
        }

        onMounted(() => {
            setTimeout(() => {
                rootIndexes.forEach((ele, index) => {
                    nodes.value[ele].transition = 'opacity 0.5s linear ' + index*0.02 + 's'
                    nodes.value[ele].opacity = '1'
                })
            }, 0)
        })
        return {
            nodes,
            changeColor,
            removeElement,
            mouseEntered,
        }
    },
    render() {
        console.time('render')
        const makeTemplate = (elements, parentId = 0) => {
            const out = []
            elements.forEach(element => {
                if (element.parent_id === parentId) {
                    const children = makeTemplate(elements, element.id)
                    if (children.length) children.unshift(h('span', 'icon'))
                    children.unshift(element.name)
                    out.push(h('div', { key: 'element' + element.id, style: {
                            display: element.display,
                            color: element.color,
                            opacity: element.opacity,
                            transition: element.transition,
                            width: element.width,
                            height: element.height,
                            marginTop: element.marginTop,
                            marginLeft: element.marginLeft,
                            lineHeight: element.lineHeight,
                            textAlign: element.textAlign,
                            cursor: element.cursor,
                            border: element.border,
                            backgroundColor: element.backgroundColor,
                        },
                        onMouseenter: () => this.mouseEntered(element.id)
                    }, children))
                }
            });
            return out
        }
        const template = makeTemplate(this.nodes)
        template.unshift(h('button', { onClick: () => this.changeColor() }, 'change'))
        template.unshift(h('button', { onClick: () => this.removeElement() }, 'remove'))
        console.timeEnd('render')
        return template
    }
}
