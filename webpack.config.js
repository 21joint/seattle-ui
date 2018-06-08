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
    entry: {
        vendor: './src/vendor.js',
        common: './src/common.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                loader: 'babel-loader',
            },
            // SCSS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: !IS_DEV,
                                sourceMap: IS_DEV,
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: IS_DEV,
                                plugins: [
                                    require('postcss-flexbugs-fixes'),
                                    require('autoprefixer')({
                                        browsers: ['last 3 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        }
                    ]
                })
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
                                    return 'fonts/[name].[ext]';
                                }
                                else {
                                    return 'images/[name].[ext]';
                                }
                            },
                            fallback: 'file-loader',
                            outputPath: './',
                            publicPath: '../'
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
            filename: 'styles/[name].css',
            disable: IS_DEV,
        }),
        ...generateHTMLPlugins(),
        new HtmlWebpackInlineSVGPlugin(),
    ],
    stats: {
        colors: true,
    }
};
