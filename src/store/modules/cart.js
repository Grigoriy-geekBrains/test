import config from '../../config';
import {
    REQUEST_CART,
    RECEIVE_CART,
    ERROR_CART,
    ADD_CART,
    DELETE_CART,
} from '../actions/cart';

const fetchCart = (commit, url, params = {}) => {
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .then(data => commit(RECEIVE_CART, data))
        .catch((err) => commit(ERROR_CART, err))
};

const state = {
    isFetching: false,
    data: null,
    error: null,
};

const getters = {
    cart: state => state.data,
    isFetching: state => state.isFetching,
    error: state => state.error,
};

const actions = {
    [REQUEST_CART]: ({ commit, dispatch }) => {
        commit(REQUEST_CART);
        setTimeout(fetchCart, process.env.TIMEOUT, commit, config.urls.cart );
    },
    [ADD_CART]: ({ commit, dispatch }, product) => {
        fetchCart(commit, config.urls.addToCart, product);
    },
    [DELETE_CART]: ({ commit, dispatch }, idWithPage) => {
        fetchCart(commit, config.urls.deleteFromCart, { idWithPage });
    }
};

const mutations = {
    [REQUEST_CART]: state => {
        state.isFetching = true;
    },
    [RECEIVE_CART]: (state, data) => {
        state.isFetching = false;
        state.data = data.cart.data;
    },
    [ERROR_CART]: (state, error) => {
        state.isFetching = false;
        state.error = error;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
