<template>
    <div class="wrapper">
        <span class="title">{{ title }}</span>
        <div v-if="isFetching">
            <p class="preload">Loading...</p>
        </div>
        <div class="container-products" v-if="products">
            <div
                    v-for="(product, index) in products"
                    :key="index"
                    class="product-item"
            >
                <a v-bind:href="product.link" class="product-title" target="_blank">{{ product.title }}</a>
                <button v-if="visibleButton(product.id)" @click="addToCart(product.id)">Add to Cart</button>
            </div>
        </div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    import { REQUEST_PRODUCTS } from '../store/actions/products';
    import { REQUEST_CART, ADD_CART } from '../store/actions/cart';

    export default {
        name: "Category",
        props: {
            numberPage: Number,
        },
        data() {
            return {
                existInCart: [],
                namespaceProduct: 'products',
                namespaceCart: 'cart',
            }
        },
        computed: {
            title: function() {
                return `Page Category ${this.$props.numberPage}`;
            },
            isFetching: function() {
                return this.$store.getters['products/isFetching'];
            },
            products: function() {
                return this.$store.getters['products/products'];
            },
            cart: function() {
                return this.$store.getters['cart/cart'];
            },
            error: function () {
                return this.$store.getters['products/error'];
            },
        },
        created: function() {
            this.$store.dispatch(`${this.namespaceProduct}/${REQUEST_PRODUCTS}`);
            if (!this.$store.getters[`${this.namespaceCart}/cart`]) {
                this.$store.dispatch(`${this.namespaceCart}/${REQUEST_CART}`);
            } else {
                this.getExistInCart();
            }
        },
        methods: {
            addToCart: function(id) {
                const product = this.$store.getters[`${this.namespaceProduct}/products`].find(p => p.id === id);
                product.page = this.numberPage;
                this.$store.dispatch(`${this.namespaceCart}/${ADD_CART}`, product);
            },
            visibleButton: function(id) {
                return !this.existInCart.includes(id);
            },
            getExistInCart: function () {
                this.existInCart = this.cart.reduce((acc, cur) => {
                    return cur.page === this.numberPage ? [...acc, cur.id] : [...acc];
                }, []);
            }
        },
        watch: {
            cart: function () {
                this.getExistInCart();
            }
        },
        transitions: {
            type: 'animation'
        }
    }
</script>

<style>

</style>
