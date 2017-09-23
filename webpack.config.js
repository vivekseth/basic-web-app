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
    publicPath: '/static',
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
    new HtmlWebpackPlugin({
      title: 'My Application',
      filename: 'app.html'
    })
  ]
};

module.exports = config;
