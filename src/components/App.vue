<template>
    <div id="app">
        <navigation />
        <div class="container">
            <router-view :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
    import Navigation from "./Navigation.vue";

    export default {
        name: 'App',
        components: {
            Navigation,
        }
    }
</script>

<style>
body{
    background-color: #444444;
    margin: 0;
    padding: 0;
}
</style>
