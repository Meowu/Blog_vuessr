const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const vueConfig = require('./vue-loader.config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // String | false: Choose a style of source mapping to enhance the debugging process. These values can affect build and rebuild speed dramatically.
  devtool: isProd ? false : '#cheap-module-eval-source-map', // fast and original source(line only)
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ // 不让babel去转换node_modules里面的包。
        // include: [
        //  在确定的情况下 只去解析运行目录下的 src 和 demo 文件夹
        //  path.join(process.cwd(), './src'),
        //  path.join(process.cwd(), './demo')
        // ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd 
        ? ExtractTextPlugin.extract({
          use: 'css-loader?minimize',
          fallback: 'vue-style-loader' // 
        })
        : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 400000, // This option controls when webpack should emit performance hints based on the maximum entrypoint size. default 250000.
    hints: isProd ? 'error': 'warning' // Turns hints on/off. In addition, tells webpack to throw either an error or a warning when hints are found. We recommend 'warning' for development environments and 'error' during production builds to help prevent deploying production bundles that are too large, impacting webpage performance.
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false}
    }),
    // In the past, one of webpack’s trade-offs when bundling was that each module in your bundle would be wrapped in individual function closures. These wrapper functions made it slower for your JavaScript to execute in the browser. In comparison, tools like Closure Compiler and RollupJS ‘hoist’ or concatenate the scope of all your modules into one closure and allow for your code to have a faster execution time in the browser.This concatenation behavior is called “scope hoisting.”
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  ]: [
    new FriendlyErrorsPlugin()
  ]
}