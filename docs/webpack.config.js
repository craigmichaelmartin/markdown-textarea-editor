const path = require('path');

module.exports = {
  entry: {
    index: './docs/index.js'
  },
  output: {
    path: path.join(__dirname, './'),
    filename: '[name].dist.js',
    sourceMapFilename: '[name].map'
  }
};
