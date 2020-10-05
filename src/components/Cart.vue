<template>
    <div class="wrapper">
        <span class="title">Page Cart</span>
        <div v-if="isFetching">
            <p class="preload">Loading...</p>
        </div>
        <div class="container-products" v-if="cart">
            <div
                    v-for="product in cart"
                    :key="`${product.id}.${product.page}`"
                    class="product-item"
            >
                <a v-bind:href="product.link" class="product-title" target="_blank">{{ product.title }} (category {{ product.page }})</a>
                <button @click="deleteFromCart(product.id, product.page)">Delete from Cart</button>
            </div>
        </div>
        <div class="container" v-if="cart && cart.length === 0">
            Empty cart
        </div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        data: function(){
            return {
                namespaceCart: 'cart',
            }
        },
        computed: {
            cart: function() {
                return this.$store.getters[`${this.namespaceCart}/cart`];
            },
            isFetching: function() {
                return this.$store.getters[`${this.namespaceCart}/isFetching`];
            },
            error: function () {
                return this.$store.getters[`${this.namespaceCart}/error`];
            },
        },
        created: function() {
            this.$store.dispatch(`${this.namespaceCart}/REQUEST_CART`);
        },
        methods: {
            deleteFromCart: function(id, page) {
                this.$store.dispatch(`${this.namespaceCart}/DELETE_CART`, `${id}_${page}`);
            },
        },
    }
</script>

<style>

</style>
