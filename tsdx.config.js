const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const path = require('path')

module.exports = {
  rollup(config) {
    config.output = {
      dir: 'dist',
      sourcemap: true,
      format: 'es'
    }
    config.plugins.push(
      postcss({
        extract: true,
        // Or with custom file name
        extract: path.resolve('dist/react-bbs.css')
      })
      // postcss({
      //   plugins: [
      //     autoprefixer(),
      //     cssnano({
      //       preset: 'default'
      //     })
      //   ],
      //   inject: true
      //   // only write out CSS for the first bundle (avoids pointless extra files):
      //   // extract: !!options.writeMeta,
      // })
    )
    return config
  }
}
