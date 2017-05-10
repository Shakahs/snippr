const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

const DEV = path.join(__dirname, '/client');
const OUTPUT = path.join(__dirname, '/public');

module.exports = {
  entry: `${DEV}/index.jsx`,
  output: {
    path: OUTPUT,
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader?cacheDirectory',
        include: DEV,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  cache: true,
  plugins: [
    new webpack.DefinePlugin({
      AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
    }),
  ],
};
