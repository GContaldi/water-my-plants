const path = require('path');

const BASE_PATH = path.join(__dirname);
const WEB_CLIENT_FOLDER_NAME = 'webClient';

module.exports = {
  context: BASE_PATH,
  entry: path.resolve('.', WEB_CLIENT_FOLDER_NAME, 'index'),
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
          path.resolve(BASE_PATH, WEB_CLIENT_FOLDER_NAME)
        ]
      }
    ]
  }
};
