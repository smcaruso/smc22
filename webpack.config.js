const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          },
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins:
    [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            minify: true
        }),
        new CopyWebpackPlugin({
          patterns: [
              { from: path.resolve(__dirname, 'static') }
          ]
      }),
    ],
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
            test: /\.(woff|woff2|eot|ttf|otf)$/i,   
            type: 'asset/resource',
          },
          {
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: [
                'raw-loader'
            ]
          }
        ],
      },
}