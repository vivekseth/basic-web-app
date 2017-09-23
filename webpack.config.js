const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    main: './client/entry.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/bundle.js'
  },
  module: {
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    //new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Application'
    })
  ]
};

module.exports = config;