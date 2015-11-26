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
  devtool : 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    },{
      test : /\.less$/,
      loader : "style!css!less"
    }]
  },
};
