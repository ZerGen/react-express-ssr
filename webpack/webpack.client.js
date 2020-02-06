const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path');
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const clientConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './client/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/'
    },
    devServer: {
        contentBase: './public',
        open: true,
        port: 8090,
        hot: true,
        hotOnly: true
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 2
                }
            }, 'less-loader', 'postcss-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: true
                }
            }]
        }, {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: '8192'
                }
            }
        }, {
            test: /\.(woff|eot|svg|ttf)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: false
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../server/views/index.html'),
            template: './server/views/index.tpl.html',
            favicon: './favicon.ico'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};

module.exports = merge(config, clientConfig);