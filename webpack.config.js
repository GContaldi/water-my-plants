const path = require('path');

const BASE_PATH = path.join(__dirname);

module.exports = {
  context: BASE_PATH,
  entry: './client/index',
  progress: true,
  output: {
    path: path.join(BASE_PATH, 'public'),
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(BASE_PATH, 'client')
        ]
      }
    ]
  }
};
