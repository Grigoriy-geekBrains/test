import Vue from 'vue';
import store from './store';
import router from './routes';

import App from './components/App.vue';
import './style/global.css';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
