const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new CleanWebpackPlugin(['dist'])
  ]
});