module.exports = {
  entry : {
    home : './src/jsx/index.jsx',
    test : './src/jsx/test.jsx'
  },
  output: {
    filename: './js/[name].js',
    chunkFilename: './js/[name].js'
  },
  watch: true,
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
}
