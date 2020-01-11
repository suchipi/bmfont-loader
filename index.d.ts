declare namespace BMFontLoader {
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
}
