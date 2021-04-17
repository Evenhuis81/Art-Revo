<template>
    <div style="height: 400px; background-color: #efefef">Home
        <button @click="this.$router.push('/login')">Go to login page</button>
        <button @click="this.$router.push('/admin/1')">Go to admin page</button>
        <div :style="buttonContainer">
            <button @click.stop="this.$store.state.modal = !this.$store.state.modal">Click here to trigger the modal!</button>
            <div>{{ this.$store.state.modal }}</div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        const buttonContainer = {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            width: '800px',
            backgroundColor: ''
        }

        return { buttonContainer }
    }
}
</script>