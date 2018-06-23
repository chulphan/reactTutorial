var webpack = require('webpack');

module.exports = {

    mode: 'development',

    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader?' + JSON.stringify({
                  cacheDirectory: true,
                  presets: ['es2015', 'stage-0','react']
                })],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
    ]
}
