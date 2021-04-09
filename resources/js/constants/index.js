export const makeTree = (nodes, parentId = 0) => {
    const out = []
    nodes.forEach(node => {
        if(node.parent_id === parentId) {
            const children = makeTree(nodes, node.id)
            if(children.length) {
                node.children = children
            }
            out.push(node)
        }
    })
    return out
}

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const camelCase = ((data, delim = '-') => {
    const list = Array.isArray(data) ? data : data.split(delim)
    return list.reduce((res, cur) => res + cur.charAt(0)
        .toUpperCase() + cur.slice(1)
    )
})
