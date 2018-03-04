const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        use: ['style-loader', 'css-loader','sass-loader'],
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};