<template>
    <div class="wrapper">
        <span class="title">Page Home</span>
        <div class="wrapper">
            <router-link class="page-item" to="/category/1">go to category1</router-link>
            <router-link class="page-item" to="/category/2">go to category2</router-link>
            <router-link class="page-item" to="/cart">go to cart</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
    .page-item{
        text-decoration: none;
        font-size: 18px;
    }
    .page-item:hover{
        text-decoration: underline;
    }
</style>
