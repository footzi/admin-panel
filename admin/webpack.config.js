const webpack = require("webpack");
const path = require("path");

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./scripts/app.js",
    output: {
        path: path.resolve(__dirname, "www"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, "www"),
        historyApiFallback: true,
        publicPath: "/",
        hot: true,
        watchOptions: {
            poll: true
        },
        host: "localhost", // Defaults to `localhost`
        port: 3000, // Defaults to 8080
        proxy: {
            "/api/**": {
                target: "http://localhost:8080",
                secure: false
            },
            "/uploads/**": {
                target: "http://localhost:8080",
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            context: ""
                        }
                    }
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
            filename: path.resolve(__dirname, "www/index.html"),
            template: path.resolve(__dirname, "www/index.html"),
            inject: true,
            alwaysWriteToDisk: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "inline-cheap-module-source-map"
};
