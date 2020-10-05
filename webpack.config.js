const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

const GLOBALS = () => {
    const env_content = fs.readFileSync('./.env', 'utf8');
    const data = env_content.match(/[_A-Z0-9]+=[A-z0-9]+/igm);
    const env = data.reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        return { ...acc, [key]: value };
    }, {});
    return {
        'process.env': env
    }
};

module.exports = {
    mode: 'development',
    node: {
        fs: "empty"
    },
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/assets/img',
                            publicPath: '/assets/img'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS()),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './assets/style.css'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    externals: {
        API_SECRET_KEY: 'API_SECRET_KEY'
    },
    devtool: "inline-source-map",
    // devServer: {
    //     contentBase: './dist',
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     host: 'localhost',
    //    port: 3000,
    // }
};
