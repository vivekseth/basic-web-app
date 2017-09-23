const path = require('path');

const config = {
  entry: "./entry.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader'
    }]
  }
};

module.exports = config;