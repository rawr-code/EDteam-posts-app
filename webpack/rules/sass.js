const loaders = {
  css: require('../loaders/css'),
  sass: require('../loaders/sass')
};

module.exports = {
  test: /\.(scss|sass)$/i,
  use: [{ loader: 'style-loader' }, loaders.css, loaders.sass]
};
