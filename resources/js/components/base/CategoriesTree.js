/**
 * @typedef {import('vue').VNode} VNode
 *
 * @typedef {import('../types/sectors').TreeData} TreeData
 * @typedef {import('../types/sectors').Branch} Branch
 */
 import {defineComponent, h, onMounted, reactive, computed} from 'vue';
 import {SvgIcon} from './SvgIcon';
 
 /**
  * @param {TreeData} _
  * @param {TreeData[]} allBranches
  * @param {number} level
  *
  * @returns {Branch}
  */
 const createNodeStyle = ({parent_id, id, name}, allBranches, level = 0) => {
     const childBranches = allBranches
         .filter(branch => branch.parent_id === id)
         .map(branch => createNodeStyle(branch, allBranches, level + 1));
 
     return {
         id,
         name,
         parent_id,
         categoryStyle: reactive({
             marginLeft: level * 10 + 'px',
             color: 'rgb(' + (level * 20 <= 255 ? level * 20 : 255) + ' 0 0',
         }),
         iconStyle: reactive({
             opacity: '1',
         }),
         icon: 'angle-right',
         children: childBranches,
         open: false,
     };
 };
 
 export default defineComponent({
     name: 'SectorTree',
     props: {
         data: {
             /** @type {import('vue').PropType<TreeData[]>} */
             type: Array,
             required: true,
         },
         formatted: {
             type: Boolean,
             default: true,
         },
         raw: {
             type: Boolean,
             default: false,
         },
     },
     emits: ['selected'],
     setup(props, {emit}) {
         const mainBranches = computed(() => props.data.filter(({parent_id}) => parent_id === 0));
 
         const processedBranches = computed(() => mainBranches.value.map(branch => createNodeStyle(branch, props.data)));
 
         /** @param {number} nodeId */
         const selectNode = node => emit('selected', node);
 
         /**
          * @param {Branch} branch
          */
         const toggleNode = branch => {
             branch.iconStyle.opacity = '0';
             branch.open = !branch.open;
             setTimeout(() => {
                 branch.icon = branch.open ? 'angle-down' : 'angle-right';
                 branch.iconStyle.opacity = '1';
             }, 200);
         };
 
         onMounted(() => {
             // processedBranches.value.forEach((branch, index) => {
             //     setTimeout(() => {
             //         branch.categoryStyle.opacity = '1';
             //     }, index * 30);
             // });
         });
 
         /**
          * @param {Branch} branch
          * @returns {VNode}
          */
         const createToggler = branch =>
             h(SvgIcon, {
                 style: branch.iconStyle,
                 class: 'sector-icon',
                 icon: branch.icon,
                 onClick: () => toggleNode(branch),
             });
 
         return {
             processedBranches,
             selectNode,
             createToggler,
             title: h('h4', {class: 'mb-3'}, 'Sectoren'),
         };
     },
     render() {
         /**
          *
          * @param {Branch} branch
          * @param {VNode[]} children
          * @returns {VNode}
          */
         const category = (branch, children) => {
             return h(
                 'div',
                 {
                     style: branch.categoryStyle,
                     class: 'sector-category',
                     key: 'wrapper' + branch.id,
                 },
                 [
                     h(
                         'span',
                         {
                             key: 'category' + branch.id,
                             onClick: () => this.selectNode(branch),
                             class: 'sector-bottom',
                         },
                         [branch.name]
                     ),
                     branch.children.length ? this.createToggler(branch) : '',
                     children,
                 ]
             );
         };
 
         /**
          *
          * @param {Branch[]} branches
          * @returns {VNode[]}
          */
         const createBranch = branches => {
             return branches.map(branch => {
                 const children = branch.open ? createBranch(branch.children) : [];
                 return category(branch, children);
             });
         };
 
         const tree = createBranch(this.processedBranches);
 
         return [this.title, tree];
     },
 });
