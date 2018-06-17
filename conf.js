const path = require('path');

let conf;

conf = {
  onlyHeader: true,
  baseUrl: 'https://deals.seattlesouthside.com/',
  appTitle: 'Do More - Save More Passport',
  appPrefix: 'seattle',
  dirNode: 'node_modules',
  dirSrc: path.join(__dirname, 'src'),
  dirFonts: path.join(__dirname, 'src/fonts'),
  dirImages: path.join(__dirname, 'src/images'),
};

module.exports = conf;
