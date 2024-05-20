const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  outputDir:'dist',
  assetsDir:'static',
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.62.173.221:8080',
  //       changeOrigin: true,
  //       // pathRewrite: {
  //       //   '^/api': ''
  //       // }
  //     }
  //   }
  // }
  
})

