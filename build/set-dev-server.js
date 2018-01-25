const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app] // What happens when you pass an array to entry? Passing an array of file paths to the entry property creates what is known as a "multi-main entry". This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 大多数情况下直接引入插件即可，不需要提供选项。
    new webpack.NoEmitOnErrorsPlugin() // Use the NoEmitOnErrorsPlugin to skip the emitting phase whenever there are errors while compiling. This ensures that no assets are emitted that include errors. 跳过编译阶段出现的错误。如果使用CLI，启动该插件使webpack不会因为错误而退出。
  )

  // dev middleware
  //  It serves the files emitted from webpack over a connect server.If files changed in watch mode, the middleware no longer serves the old bundle, but delays requests until the compiling has finished. You don't have to wait before refreshing the page after a file modification.
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath, // publicPath is required, whereas all other options are optional
    noInfo: true // display no info to console (only warnings and errors)
  })
  // // Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
  app.use(devMiddleware)

  // Completion of compile.
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // hot middleware
  // Add webpack-hot-middleware attached to the same compiler instance
  app.use(require('webpack-hot-middleware')(clientCompiler, {             heartbeat: 5000  // How often to send heartbeat updates to the client to keep the connection alive. Should be less than the client's timeout setting - usually set to half its value.
  }))

  // watch and update server renderer

  const serverCompiler = webpack(serverConfig) // If you don’t pass the webpack runner function a callback, it will return a webpack Compiler instance. This instance can be used to manually trigger the webpack runner or have it build and watch for changes. 

  const mfs = new MFS() // A simple in-memory filesystem. Holds data in a javascript object.
  serverCompiler.outputFileSystem = mfs // replace the default outputFileSystem with memory-fs to write files to memory instead of to disk.

  // Calling the watch method, triggers the webpack runner, but then watches for changes (much like CLI: webpack --watch), as soon as webpack detects a change, runs again. Returns an instance of Watching.Can be closed later by invoking watching.close(fallback)
  const watching = serverCompiler.watch({}, (err, stats) => {

    // The err object will not include compilation errors and those must be handled separately using stats.hasErrors() which will be covered in detail in Error Handling section of this guide. The err object will only contain webpack-related issues, such as misconfiguration, etc.

    // The stats object includes infomation about the code compilation process: 1. Errors and Warnings (if any) 2. Timings 3. Module and Chunk information.  The webpack CLI uses this information to display a nicely formatted output in your console. It exposes the following methods: 
    // 1. stats.hasErrors() => Boolean
    // 2. stats.hasWarnings() => Boolean
    // 3. stats.toJSON(options) => options: minimal, verbose, etc...
    // 4. stats.toString(options) => same
    // The stats option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use quiet or noInfo because you want some bundle information, but not all of it.No effects in Node.js API.
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return // same as if (stats.hasErrors()) return

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    // Note that this is what `webpack-dev-middleware`, used by `webpack-dev-server` and many other packages, uses to mysteriously hide your files but continue serving them up to the browser.
    update()
  })

  return readyPromise
}
