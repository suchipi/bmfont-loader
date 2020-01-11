# `bmfont-loader`

This is a webpack loader that loads [AngelCode BMFont](http://www.angelcode.com/products/bmfont/) files.

It wraps images referenced in the file with a `require`, so your normal webpack loader for PNGs or etc will be used (eg `file-loader`).

## Output Format

The output format can be represented by this TypeScript type:

```ts
type Font = {
  pages: Array<any>; // probably strings (if you're using file-loader), but could be anything
  chars: Array<{
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    xoffset: number;
    yoffset: number;
    xadvance: number;
    page: number;
    chnl: number;
  }>;
  kernings: Array<{
    first: number;
    second: number;
    amount: number;
  }>;
  info: {
    face: string;
    size: number;
    bold: number;
    italic: number;
    charset: string;
    unicode: number;
    stretchH: number;
    smooth: number;
    aa: number;
    padding: [number, number, number, number];
    spacing: [number, number];
  };
  common: {
    lineHeight: number;
    base: number;
    scaleW: number;
    scaleH: number;
    pages: number;
    packed: number;
    alphaChnl: number;
    redChnl: number;
    greenChnl: number;
    blueChnl: number;
  };
};
```

The output format is further described [here](https://github.com/mattdesl/bmfont2json/wiki/JsonSpec).

## Usage

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.fnt$/i,
        use: ["bmfont-loader"],
      },
    ],
  },
};
```

```js
const arial = require("./arial.fnt");

console.log(arial);
// { pages: [...], chars: [...], ... }
```

## License

MIT
