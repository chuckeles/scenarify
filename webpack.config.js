/**
 * The webpack configuration file. Webpack watches and builds all resources
 * for the frontend. It also injects them into the browsers.
 */


const path = require('path');


module.exports = {

    entry: './frontend/scripts/index.js',
    output: {
        path: './frontend/build',
        publicPath: '/static/',
        filename: 'scripts.js'
    },

    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        progress: true,
        contentBase: path.join(process.cwd(), 'frontend'),
        proxy: {
            '*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },

    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules'),
    },
    resolve: {
        extensions: ['', '.js', '.sass', '.vue']
    },
    module: {
        loaders: [

            {
                test: /\.vue$/,
                loader: 'vue'
            },

            {
                test: /\.(slm|slim)/,
                loaders: ['html', 'slm']
            },

            {
                test: /\.(sass|scss)/,
                loaders: ['style', 'css', 'sass']
            },

            {
                test: /\.css/,
                loaders: ['style', 'css']
            },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]'
                }
            }

        ]
    }

};
