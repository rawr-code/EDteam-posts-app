module.exports = {
  test: /\.(tiff|eot|otf|ttf|woff|woff2)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/fonts/[name]-[hash].[ext]',
        limit: 8192
      }
    }
  ]
};
