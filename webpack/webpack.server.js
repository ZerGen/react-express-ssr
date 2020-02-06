const path = require('path');
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const serverConfig = {
    target: 'node',
    mode: 'development',
    entry: './server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }, {
                test: /\.less$/,
                use: ['isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true
                    }
                }, 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true
                    }
                }]
            }
        ]
    }
};

module.exports = merge(config, serverConfig);