const path = require('path');

let conf;

conf = {
  onlyHeader: true,
  baseUrl: 'https://www.visitsaltlake.com',
  appTitle: 'Visit Salt Lake',
  appPrefix: 'sltl',
  dirNode: 'node_modules',
  dirSrc: path.join(__dirname, 'src'),
  dirFonts: path.join(__dirname, 'src/fonts'),
  dirImages: path.join(__dirname, 'src/images'),
};


console.log(conf);

module.exports = conf;
