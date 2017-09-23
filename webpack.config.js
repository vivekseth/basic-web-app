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
    publicPath: '/',
    filename: '[name]/bundle.js'
  },
  module: {
    rules: [
    {
      test: /\.txt$/,
      use: 'raw-loader'
    }, 
    {
      test: /\.css$/,
      use: [
      {
        loader: 'style-loader'
      }, 
      {
        loader: 'css-loader'
      }]
    }, 
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'My Application',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api' : "http://localhost:3000"
    }
  }
};

module.exports = config;
