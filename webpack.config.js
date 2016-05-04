var webpack = require("webpack");
module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts','.tsx', '.js']
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle:true
        })
    ],
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ["style", "css", "sass"]},
      {
        test: /\.jsx?$|\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
