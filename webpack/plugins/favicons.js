const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = new FaviconsWebpackPlugin({
  logo: './public/favicon.png',
  prefix: 'favicons/',
  emitStats: false,
  statsFilename: 'faviconstats-[hash].json',
  persistentCache: true,
  inject: true,
  background: '#fff',
  title: 'Webpack App',
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
});
