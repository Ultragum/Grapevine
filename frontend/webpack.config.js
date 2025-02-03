const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9001
    }
}