const express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../webpack.config');

const compiler = webpack(config);
app.use(
    webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        publicPath: config.output.publicPath
    })
);
app.use(webpackHotMiddleware(compiler));
app.use(express.urlencoded());
app.use(express.json());
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    next();
});

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '/../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
});

app.post('/api/products/get', (req, res) => {
    const products = fs.readFileSync('./server/products.json', 'utf8');
    res.json({ products: JSON.parse(products) });
});

app.post('/api/cart/get', (req, res) => {
    const cart = fs.readFileSync('./server/cart.json', 'utf8');
    res.json({ cart: JSON.parse(cart) });
});

app.post('/api/cart/add', (req, res) => {
    const product = req.body;
    const pathToCart = './server/cart.json';

    let cart = fs.readFileSync(pathToCart, 'utf8');
    cart = JSON.parse(cart);
    cart = {
        ...cart,
        data: [
            ...cart.data,
            product
        ],
    };
    fs.writeFileSync(pathToCart, JSON.stringify(cart));

    cart = fs.readFileSync(pathToCart, 'utf8');
    res.json({ cart: JSON.parse(cart) });
});

app.post('/api/cart/delete', (req, res) => {
    const idWithPage = req.body.idWithPage;
    const pathToCart = './server/cart.json';

    let cart = fs.readFileSync(pathToCart, 'utf8');
    cart = JSON.parse(cart);
    cart = {
        ...cart,
        data: cart.data.filter((p) => {
            const cart_id = `${p.id}_${p.page}`;
            return cart_id !== idWithPage;
        }),
    };

    fs.writeFileSync(pathToCart, JSON.stringify(cart));

    cart = fs.readFileSync(pathToCart, 'utf8');
    res.json({ cart: JSON.parse(cart) });
});

app.listen(port, function () {
    console.log('AppModel listening on port: ' + port);
});
