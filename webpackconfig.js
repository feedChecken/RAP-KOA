module.exports = {
  entry : {
    header : './src/jsx/header.jsx',
    team : './src/jsx/team.jsx',
    project : './src/jsx/project.jsx'
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
