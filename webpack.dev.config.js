const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dev-bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    mode: 'development',
    devServer: {
        static: {
            directory: __dirname,
            watch: true,
        },
        hot: true,
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: [
                            ["@babel/transform-runtime"]
                        ],
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};
