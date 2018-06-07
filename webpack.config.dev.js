const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const conf = require('./conf');

module.exports = merge(webpackConfig, {
    devServer: {
        watchContentBase: true,
        port: 3000,
        hot: true,
        open: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
