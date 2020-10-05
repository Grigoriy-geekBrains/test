<template>
    <div class="nav">
        <router-link to="/" class="nav-link logo"></router-link>
        <router-link to="/category/1" class="nav-link">category1</router-link>
        <router-link to="/category/2" class="nav-link">category2</router-link>
        <router-link to="/cart" class="nav-link">Cart</router-link>
    </div>
</template>

<script>
    export default {
        name: "navigation"
    }
</script>

<style scoped>
    .nav{
        display: flex;
        align-content: center;
        background-color: rgba(221,221,221,0.5);
    }
    .nav .nav-link{
        font-size: 24px;
        color: whitesmoke;
        text-decoration: none;
        padding: 10px;
        cursor: pointer;
    }
    .nav .nav-link:hover{
        text-decoration: underline;
    }

    .logo{
        width: 50px;
        height: 20px;
        background-image: url("../img/logo.png");
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 10px;
    }
</style>
