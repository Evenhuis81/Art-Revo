export default {
    namescaped: true,
    state: () => ({
        topBar: {
            container: {
                borderBottom: '1px solid black',
            },
            main: {
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '1140px',
                height: '100px',
                backgroundColor: 'white',
                zIndex: '2',
                borderRight: '1px solid black',
                borderLeft: '1px solid black',
            }
        },
        topBarLogin: {
            container: {
                position: 'absolute',
                top: '0',
                height: '300px',
                width: '200px',
                backgroundColor: 'orange',
                zIndex: '1'
            },
            main: {
                position: 'absolute'
            }
        }
    }),
    mutations: {},
    actions: {},
    getters: {}
}
