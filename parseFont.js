const util = require("util");
const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const loadBmfontCB = require("load-bmfont");

const loadBMFont = util.promisify(loadBmfontCB);

const makeProgram = template(`
  module.exports = EXPORTS;
`);

const makeRequire = template.expression(`
  typeof require(SOURCE) === "object" &&
    require(SOURCE) != null &&
    require(SOURCE).__esModule &&
    {}.hasOwnProperty.call(require(SOURCE), "default")

    ? require(SOURCE).default
    : require(SOURCE)
`);

async function parseFont(filepath) {
  const font = await loadBMFont(filepath);

  const objExpression = template.expression("(" + JSON.stringify(font) + ")")();

  objExpression.properties.filter(t.isObjectProperty).forEach((property) => {
    if (
      !(
        t.isStringLiteral(property.key) &&
        property.key.value === "pages" &&
        t.isArrayExpression(property.value)
      )
    ) {
      return;
    }

    property.value.elements = property.value.elements.map((element) => {
      const source = element.value.startsWith(".")
        ? element.value
        : "./" + element.value;

      return makeRequire({ SOURCE: t.stringLiteral(source) });
    });
  });

  const ast = makeProgram({
    EXPORTS: objExpression,
  });

  return generate(ast).code;
}

module.exports = parseFont;
