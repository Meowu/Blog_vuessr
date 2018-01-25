const webpack = require("webpack");
const merge = require("webpack-merge");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// This library scans the node_modules folder for all node_modules names, and builds an externals function that tells Webpack not to bundle those modules, or any sub-modules of theirs.
// module.exports = {
//   ...
//   target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
//   externals: [nodeExternals({
//       // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
//       whitelist: ['jquery', 'webpack/hot/dev-server', /^lodash/]
//   })],
//   ...
// };
const nodeExternals = require("webpack-node-externals");
const BASE = require("./webpack.base.config");

module.exports = merge(BASE, {
  target: 'node',
  devtool: '#source-map', //source-map - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.You should configure your server to disallow access to the Source Map file for normal users!
  entry: './src/entry.server.js',
  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2' // These options assign the return value of the entry point (e.g. whatever the entry point exported) to a specific object under the name defined by output.library. The return value of your entry point will be assigned to the module.exports. As the name implies, this is used in CommonJS environments.
  },
  // The externals configuration option provides a way of excluding dependencies from the output bundles. Instead, the created bundle relies on that dependency to be present in the consumer's environment. This feature is typically most useful to library developers, however there are a variety of applications for it.
  externals: [
    // do not externalize CSS files in case we need to import it from a dep
    nodeExternals({
      whitelist: [/\.css$/]
    })
  ],
  plugins: [
    // The DefinePlugin allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds. If you perform logging in your development build but not in the release build you might use a global constant to determine whether logging takes place. That's where DefinePlugin shines, set it and forget it rules for development and release builds.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.VUE_ENV': '"server"' // Note that because the plugin does a direct text replacement, the value given to it must include actual quotes inside of the string itself. Typically, this is done either with either alternate quotes, such as '"production"', or by using JSON.stringify('production').
    }),
    new VueSSRServerPlugin()
  ]
});
