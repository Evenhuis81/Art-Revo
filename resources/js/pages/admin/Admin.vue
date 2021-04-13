<template>
    <div style="margin: 0 210px 0 190px; padding-left: 20px; border: 1px solid green;">Admin Info/Settings</div>
    <bar-right></bar-right>
    <bar-left></bar-left>
    <router-view></router-view>
</template>

<script>
import BarRight from './BarRight.vue'
import BarLeft from './BarLeft.vue'

export default {
    components: { BarRight, BarLeft },
}
</script>