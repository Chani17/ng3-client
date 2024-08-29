const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/room': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/userSearch': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/following': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/followuser': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/unfollowuser': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
