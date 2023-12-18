function calculateNewHSLColor({ h1, s, l }, percent) {
  const h = h1 * (1 + (percent / 100));
  const result = `hsl(${h}, ${s}, ${l})`;
  return result;
}

function rgbStringToRgbObj(rgb) {
  const obj = rgb.replace(/[^\d,]/g, '').split(',');
  return obj;
}

function rgbStringToHslString(rgb) {
  const rgbObj = rgbStringToRgbObj(rgb);
  const hsl = rgbObjToHslString(rgbObj);
  return hsl;
}

function rgbObjToHslString({ r1, g1, b1 }) {
  const r = r1 / 255;
  const g = g1 / 255;
  const b = b1 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  const result = { h: h * 360, s: s * 100, l: l * 100 };
  return result;
}

function hexStringToRgbObj(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
}

function hexStringToHsl(hex) {
  const rgb = hexStringToRgbObj(hex);
  const hsl = rgbObjToHslString(rgb);
  return hsl;
}

function contrastingColor(hex) {
  const rgb = hexStringToRgbObj(hex);
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b);
  return (luminance < 140) ? '#ffffff' : '#000000';
}

export {
  contrastingColor,
};