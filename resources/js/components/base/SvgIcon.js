import { computed, h } from "vue"
import getIcon from "../../icons"

export const SvgIcon = {
    props: {
        icon: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const svg = computed(() => getIcon(props.icon)) 

        return {
            svg
        }
    },
    render() {
        return h('svg', {
            style: {
                display: 'inline-block',
                overflow: 'visible',
                fontSize: 'inherit',
                height: '1em',
                verticalAlign: '-.125em',
            },
            viewBox: `0 0 ${this.svg.width} ${this.svg.height}`,
            xmlns: 'http://www.w3.org/2000/svg',
        }, [h('path', {
            // fill: 'currentColor',  // is like inherit
            d: this.svg.path
        })])
    }
}