const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const conf = require('./conf');

module.exports = merge(webpackConfig, {
    devServer: {
        watchContentBase: true,
        port: 2121,
        hot: true,
        open: true,
        publicPath: '/'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
