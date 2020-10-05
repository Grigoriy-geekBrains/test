import config from '../../config';
import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    ERROR_PRODUCTS,
} from '../actions/products';

const fetchProduct = commit => {
    fetch(config.urls.products, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
    })
        .then(response => response.json())
        .then(data => commit(RECEIVE_PRODUCTS, data))
        .catch((err) => commit(ERROR_PRODUCTS, err))
};

const state = {
    isFetching: false,
    data: null,
    error: null,
};

const getters = {
    products: state => state.data,
    isFetching: state => state.isFetching,
    error: state => state.error,
};

const actions = {
    [REQUEST_PRODUCTS]: ({ commit, dispatch }) => {
        commit(REQUEST_PRODUCTS);
        setTimeout(fetchProduct, process.env.TIMEOUT, commit );
    }
};

const mutations = {
    [REQUEST_PRODUCTS]: state => {
        state.isFetching = true;
    },
    [RECEIVE_PRODUCTS]: (state, data) => {
        state.isFetching = false;
        state.data = data.products.data;
    },
    [ERROR_PRODUCTS]: (state, error) => {
        state.isFetching = false;
        state.error = error;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
