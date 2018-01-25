const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const BASE = require('./webpack.base.config')

module.exports = merge(BASE, {
  entry: {
    app: './src/entry.client.js' // ./src前面是一点而不是两点
  },
  resolve: {
    // alias: { 'create-api': '../src/'}
  },
  plugins: [
    // strip dev_only code in Vue resource.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // a module is extracted into the vendor chunk file if
      minChunks: function(module) {
        return (
          // it is inside node_modules or it's not a css file.(due to extract-text-webpack-plugin limitation)
          /node_modules/.test(module.context) && !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})