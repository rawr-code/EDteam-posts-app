const path = require('path')
const webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const rules = {
  babel: require('./rules/babel'),
  html: require('./rules/html'),
  fonts: require('./rules/fonts'),
  images: require('./rules/images')
}

const loaders = {
  css: require('./loaders/css'),
  sass: require('./loaders/sass')
}

const plugins = {
  html: require('./plugins/html'),
  favicons: require('./plugins/favicons')
}

const config = {
  entry: path.resolve(__dirname, '../', './src/index.jsx'),

  output: {
    filename: 'javascripts/[name].[hash].js',
    chunkFilename: 'javascripts/[name].[hash].chunk.js',
    publicPath: './'
  },

  mode: 'production',
  module: {
    rules: [
      rules.babel,
      rules.html,
      rules.fonts,
      rules.images,
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          loaders.css,
          'resolve-url-loader',
          loaders.sass
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    plugins.html,
    plugins.favicons,
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new LodashModuleReplacementPlugin(),
    new UglifyJSPlugin({}),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].[hash].css',
      allChunks: true
    })
  ]
}

module.exports = config
