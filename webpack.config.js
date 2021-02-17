const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        print: './src/print.js',
        gettingStarted: './src/getting-started/getting-started.js',
        loading3dModel: './src/loading-3d-model/loading-3d-model.js',
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Three.js Projects',
            template: './src/index-old.html',
            chunks: ['index', 'print'],
        }),
        new HtmlWebpackPlugin({
            title: 'Getting Started',
            template: './src/three-js-template.html',
            chunks: ['gettingStarted'],
            filename: 'getting-started/index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Loading 3D Model',
            template: './src/three-js-template.html',
            chunks: ['loading3dModel'],
            filename: 'loading-3d-model/index.html',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(glb|gltf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'models',
                        },
                    },
                ],
            },
        ],
    },
};