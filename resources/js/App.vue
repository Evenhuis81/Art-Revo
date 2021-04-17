<template>
    <d-app>
        <top-bar />
        <d-modal v-if="$store.state.modal" />
        <div style="margin-top: 100px;"> 
            <router-view />
        </div>
    </d-app>
</template>
