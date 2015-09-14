module.exports = {
  entry : {
    header : './src/jsx/header.jsx',
    test : './src/jsx/team.jsx'
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
};
