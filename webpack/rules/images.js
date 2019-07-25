module.exports = {
  test: /\.(jpe?g|png|gif|ico|svg|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: 'assets',
        name: 'images/[name]-[hash].[ext]',
        limit: 8192
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true
      }
    }
  ]
};
