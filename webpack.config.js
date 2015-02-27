'use strict';

module.exports = {

  output: {
    filename: 'main.js',
    path: 'public',
    publicPath: '/public/'
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
    './src/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel!jsx-loader'
      }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },

};
