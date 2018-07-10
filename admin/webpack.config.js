const webpack = require('webpack');
const path = require('path');

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './scripts/app.js',
    output: {
        path: path.resolve(__dirname),
        filename: './bundle.js'
      },
    devServer: { 
        hot: true, 
        watchOptions: { 
            poll: true 
        },
        host: 'localhost', // Defaults to `localhost`
        port: 3000, // Defaults to 8080
        proxy: {
            '^/api/*': {
                target: 'http://localhost:8080/api/',
                secure: false
            }
        }
    },
    module: {
        rules: [ 
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: './admin/app.css'
        // }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-cheap-module-source-map'
};