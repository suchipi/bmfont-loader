const parseFont = require("./parseFont");

function bmfontLoader(source) {
  const callback = this.async();
  return parseFont(this.resourcePath).then(
    (data) => callback(null, data),
    (err) => callback(err, null)
  );
}

module.exports = bmfontLoader;
