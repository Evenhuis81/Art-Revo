<template>
    <d-app>
        <top-bar />
        <div style="margin-top: 100px;">
            <router-view />
        </div>
    </d-app>
</template>

<script>
import BarLeft from './pages/admin/BarLeft'
import BarRight from './pages/admin/BarRight'

export default {
    components: { BarLeft, BarRight }
}
</script>