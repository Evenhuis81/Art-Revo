import { computed, h, onMounted, reactive, ref, resolveComponent } from "vue"
// import { uuidv4 } from "../constants"

export const CategoriesTree = {
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    emits: ['selected'],
    setup(props, { emit }) {
        const properties = reactive({})
        props.data.forEach(item => {
            properties[item.id] = {
                categoryStyle:  {
                    display: item.parent_id === 0 ? 'block' : 'none',
                    marginLeft: '',
                    // width: '200px',
                    // height: '40px',
                },
                iconStyle: {
                    // opacity: '1',
                },
                icon: 'plus',
                directChildrenIds: [],
                open: false,
            }
        })

        const selectNode = nodeId => {
            const node = props.data.find(item => item.id === nodeId)
            emit('selected', node)
        }
        
        onMounted(() => {                
            // console.log(properties)
        })

        return {
            properties,
            selectNode
        }
    },
    render() {
        const toggler = (props) => h(resolveComponent('SvgIcon'), {
            style: props.iconStyle,
            icon: props.icon,
            onClick: () => {
                if (!props.directChildrenIds.length) return
                props.open = props.open ? false : true
                props.directChildrenIds.forEach(childId => {
                    this.properties[childId].categoryStyle.display = props.open ? 'block' : 'none'
                    this.properties[childId].icon = props.open ? 'plus' : 'minus'
                })
            }
        })

        const category = (node, children) => h('div', {
            style: this.properties[node.id].categoryStyle,
        }, [h('span', { onClick: () => this.selectNode(node.id)}, [node.name.toUpperCase()]), toggler(this.properties[node.id]) , children])

        const createTemplate = (nodes, parentId = 0, level = 0) => {
            const out = []
            nodes.forEach(node => {
                if (node.parent_id === parentId) {

                    if (parentId) this.properties[parentId].directChildrenIds.push(node.id)
                    this.properties[node.id].categoryStyle.marginLeft = level*10 + 'px'

                    const children = createTemplate(nodes, node.id, level+1)

                    if (!children.length) { this.properties[node.id].iconStyle.opacity = '0' }
                    out.push(category(node, children, level))
                }
            });
            return out
        }

        return [
            // this.$slots.default ? h('h4', this.$slots.default()) : '',
            createTemplate(this.data),
            // h('button', { onClick: event => console.log(this.styles = '1')})
        ]
    }
}