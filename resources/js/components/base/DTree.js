import { computed, h, onMounted, ref } from "vue"

export default {
    props: ['data'],
    setup(props) {
        const nodes = ref(props.data)
        const rootIndexes = []
        const active = ref(false)
        nodes.value.forEach(node => {
            if (node.parent_id === 0) rootIndexes.push(nodes.value.map(item => item.id).indexOf(node.id))
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
            // node.backgroundColor = 'white'
        })
        const changeColor = () => {
            nodes.value[0].color = 'blue'
        }
        const removeElement = () => {
            nodes.value.splice(4, 1)
        }
        const mouseEntered = (event, nodeId) => {
            // console.time('B')
            // event.target.style.backgroundColor = 'blue'
            // setTimeout(() => {
                active.value = true
                // const node = nodes.value.map(item => item.id).indexOf(nodeId)
                // nodes.value[node].backgroundColor = 'blue'
            // }, 1000)
            // const node = nodes.value.map(item => item.id).indexOf(nodeId)
            // nodes.value[node].backgroundColor = 'blue'
            // console.timeEnd('B')
        }
        // const mouseEntered = e => {
        //     e.target.style.backgroundColor = 'blue'
        // }
        const mouseLeft = (event, nodeId) => {
            active.value = false
            // event.target.style.backgroundColor = 'white'
            // const node = nodes.value.map(item => item.id).indexOf(nodeId)
            //     nodes.value[node].backgroundColor = 'white'
        }
        const computedStyle = computed(() => ({ backgroundColor: active.value ? 'blue' : 'orange' }))
        const clicked = (parentId) => {
            const childIndexes = []
            console.time('DF')
            nodes.value.filter(branch => branch.parent_id === parentId).forEach(ele => childIndexes.push(nodes.value.map(el => el.id).indexOf(ele.id)))
            console.log(childIndexes)
            console.timeEnd('DF')
            childIndexes.forEach(childIndex => nodes.value[childIndex].display = 'block')
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
            mouseLeft,
            clicked,
            computedStyle,
        }
    },
    render() {
        console.time('render')
        const makeTemplate = (elements, parentId = 0, level = 0) => {
            const out = []
            elements.forEach(element => {
                if (element.parent_id === parentId) {
                    const children = makeTemplate(elements, element.id, level + 1)
                    // if (children.length) children.unshift(h('span', 'icon'))
                    out.push(h('div', { key: 'element' + element.id, style: [this.computedStyle, {
                            display: element.display,
                            color: element.color,
                            opacity: element.opacity,
                            transition: element.transition,
                            width: element.width,
                            height: element.height,
                            marginTop: element.marginTop,
                            marginLeft: level * 20 + 10 + 'px',
                            lineHeight: element.lineHeight,
                            textAlign: element.textAlign,
                            cursor: element.cursor,
                            border: element.border,
                            // backgroundColor: element.backgroundColor,
                        }],
                        onMouseenter: event => this.mouseEntered(event, element.id),
                        onMouseleave: event => this.mouseLeft(event, element.id),
                        onClick: () => this.clicked(element.id)
                    }, [element.name]))
                    children.forEach(child => out.push(child))
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
