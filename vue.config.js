const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
      },
      '/room': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
        ws: true,
      },
      '/userSearch': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
      },
      '/following': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
      },
      '/followuser': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
      },
      '/unfollowuser': {
        target: 'http://nggg.com:8080',
        changeOrigin: true,
      },
    },
    allowedHosts: 'all',
  },
});
