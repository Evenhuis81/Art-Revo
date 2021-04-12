export default {
    namescaped: true,
    state: () => ({
        topBar: {
            container: {
                position: 'fixed',
                width: '100vw',
                top: '0',
                // height: '100px',
                borderBottom: '1px solid black',
                backgroundColor: '#fff',
            },
            main: {
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '1140px',
                height: '100px',

            }
        },
    }),
    mutations: {},
    actions: {},
    getters: {}
}
