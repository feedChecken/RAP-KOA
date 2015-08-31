module.exports = {
  entry : './src/index.js',
  output : {
    path : __dirname + '/public/js',
    filename : 'bundle.js'
  },
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
      loader: 'style!css!'
    }]
  }
}
