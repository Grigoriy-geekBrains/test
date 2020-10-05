import VueRouter from "vue-router";
import Vue from "vue";

import Home from '../components/Home.vue';
import Category from '../components/Category.vue';
import Cart from '../components/Cart.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart,
        },
        {
            path: '/category/:id',
            name: 'Category',
            component: Category,
            props: (route) => ({
                numberPage: +route.params.id,
            })
        },
    ],
});
