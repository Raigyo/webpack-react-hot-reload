const path = require('path')
const webpack = require('webpack')

let config =  {
  entry: [
    'react-hot-loader/patch',
    './src/main.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    overlay: {
      errors: true,
      warnings: true,
      hot: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/, // use babel for js and jsx
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }, // we send env var to JS
    }),
  ]
}

//Filter to add plugin according to process.env.NODE_ENV
if (process.env.NODE_ENV === 'production'){
  config.plugins.push(
    // add plugin for production
  )
} else {
  config.plugins.push(
    // add plugin for development
  )
}

module.exports = config