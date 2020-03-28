const parseFont = require("./parseFont");

function bmfontLoader(source) {
  return parseFont(this.resourcePath);
}

module.exports = bmfontLoader;
