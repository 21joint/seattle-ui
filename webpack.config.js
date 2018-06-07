const webpack = require('webpack');
const path = require('path');

// * * configuration/structure/folders * * //
const conf = require('./conf');

// running 'npm run build' makes this variable false
const IS_DEV = (process.env.NODE_ENV === 'dev');

// ** glob is a plugin to loop through multiple templates **//
const glob = require('glob');

// ** Sass Autoprefixer **//
const autoprefixer = require('autoprefixer');

//** HtmlWebpackPlugin compatible with latest webpack 4.4.1, for generating result html **//
const HtmlWebpackPlugin = require('html-webpack-plugin');

// * * ExtractText plugin compatible with latest webpack 4.4.1, to play with strings * * //
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* To Inject Inline Stylesheet into the Html if needed */
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

// * * Transforms <img src="*.svg"> to inline <svg> (svgo options are present) * * //
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

/**
 * Helper function to get *.ejs filename when looping, which
 * returns '[name].ejs' as string
 **/
const getNameFromDir = (dir) => {
    const lastSlash = dir.lastIndexOf('/');
    return dir.slice(lastSlash + 1);
};

/**
 * Function to loop through all templates/files (*.ejs)
 */
const generateHTMLPlugins = () =>
    glob.sync('./src/*.html').map(function (dir) {
        return new HtmlWebpackPlugin({
            template: path.resolve(conf.dirSrc, getNameFromDir(dir)),
        });
    });

/**
 * Webpack Configuration
 */
module.exports = {
    target: 'web',
    node: {
        fs: 'empty',
    },
    entry: {
        vendor: path.join(conf.dirSrc, 'scripts/vendor.js'),
        common: path.join(conf.dirSrc, 'scripts/common.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        modules: [
            conf.dirSrc,
            conf.dirNode,
            conf.dirImages,
            conf.dirFonts,
        ],
        alias: {
            '@': path.resolve(__dirname, 'node_modules'),
            '~': path.resolve(__dirname, 'node_modules'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            // SCSS
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV,
                                url: IS_DEV
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: IS_DEV,
                                plugins: [
                                    autoprefixer({browsers: ['last 3 versions', 'iOS 9']}),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV,
                            },
                        }],
                    // use style-loader in development
                    fallback: {
                        loader: 'style-loader',
                    },
                }),
            },
            // FONTS/IMAGES
            {
                test: /\.(woff|woff2|ttf|eot|otf|svg|gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name(file) {
                                if (file.indexOf('fonts') > -1) {
                                    return './fonts/[name].[ext]';
                                }
                                else {
                                    return './images/[name].[ext]';
                                }
                            },
                            fallback: 'file-loader',
                            outputPath: './'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new ExtractTextPlugin({
            filename: 'styles/[name].css'
        }),
        ...generateHTMLPlugins(),
        new HtmlWebpackInlineSVGPlugin(),
    ],
    stats: {
        colors: true,
    }
};
