// https://github.com/connorgr/d3-cam02 Version 0.1.0. Copyright 2016 Connor Gramazio.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reHex3 = /^#([0-9a-f]{3})$/;
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// Implementation based on Billy Bigg's CIECAM02 implementation in C
// (http://scanline.ca/ciecam02/)
// and information on Wikipedia (https://en.wikipedia.org/wiki/CIECAM02)
//
// IMPORTANT NOTE : uses XYZ [0,100] not [0,1]
//
// When transforming colors into CIECAM02 space we use Luo et al.'s uniform
// color space transform; however, we also provide commented out transform
// coefficients for the long-distance and short-distance CIECAM02 transforms,
// should others desire to use these alternative perceptually uniform
// approximation spaces instead.
//
// Another important note is that we provide the full range of CIECAM02 color
// values in the JCh constructor, but the d3 color object stores only lightness
// (J), chroma (C), and hue (h).
//
// used for brighter and darker functions
// Kn is completely arbitrary and was picked originally by Mike Bostock to make
// the Lab brighter and darker functions behave similarly to the RGB equivalents
// in d3-color. We copy and paste the value directly and encourage others to
// add a more systematically chosen value.
var Kn = 18;


// Conversion functions
function rgb2xyz(r, g, b) {
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  // Convert to XYZ in [0,100] rather than [0,1]
  return {
    x: ( (r * 0.4124) + (g * 0.3576) + (b * 0.1805) ) * 100.0,
    y: ( (r * 0.2126) + (g * 0.7152) + (b * 0.0722) ) * 100.0,
    z: ( (r * 0.0193) + (g * 0.1192) + (b * 0.9505) ) * 100.0
  };
}

function xyz2rgb(x, y, z) {
  x = x / 100.0;
  y = y / 100.0;
  z = z / 100.0;

  var preR = x *  3.2404542 + y * -1.5371385 - z * 0.4985314,
      preG = x * -0.9692660 + y *  1.8760108 + z * 0.0415560,
      preB = x *  0.0556434 + y * -0.2040259 + z * 1.0572252;

  function toRGB(c) {
    return 255.0 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
  }

  return {r: toRGB(preR), g: toRGB(preG), b: toRGB(preB)};
}


function xyz2cat02(x,y,z) {
  var l = ( 0.7328 * x) + (0.4296 * y) - (0.1624 * z),
      m = (-0.7036 * x) + (1.6975 * y) + (0.0061 * z),
      s = ( 0.0030 * x) + (0.0136 * y) + (0.9834 * z);
  return {l: l, m: m, s: s};
}
function cat022xyz(l, m, s) {
  var x = ( 1.096124 * l) - (0.278869 * m) + (0.182745 * s),
      y = ( 0.454369 * l) + (0.473533 * m) + (0.072098 * s),
      z = (-0.009628 * l) - (0.005698 * m) + (1.015326 * s);
  return {x: x, y: y, z:z};
}

function cat022hpe(l,m,s) {
  var lh = ( 0.7409792 * l) + (0.2180250 * m) + (0.0410058 * s),
      mh = ( 0.2853532 * l) + (0.6242014 * m) + (0.0904454 * s),
      sh = (-0.0096280 * l) - (0.0056980 * m) + (1.0153260 * s);

  return {lh: lh, mh: mh, sh: sh};
}

function hpe2xyz(l, m, s) {
  var x = (1.910197 * l) - (1.112124 * m) + (0.201908 * s),
      y = (0.370950 * l) + (0.629054 * m) - (0.000008 * s),
      z = s;
  return {x:x, y:y, z:z};
}

function nonlinearAdaptation(coneResponse, fl) {
  var p = Math.pow( (fl * coneResponse) / 100.0, 0.42 );
  return ((400.0 * p) / (27.13 + p)) + 0.1;
}

function inverseNonlinearAdaptation(coneResponse, fl) {
  return (100.0 / fl) *
          Math.pow((27.13 * Math.abs(coneResponse - 0.1)) /
                      (400.0 - Math.abs(coneResponse - 0.1)),
                   1.0 / 0.42);
}

// CIECAM02_VC viewing conditions; assumes average viewing conditions
var CIECAM02_VC = (function() {
  var vc = {
    D65_X: 95.047, // D65 standard referent
    D65_Y: 100.0,
    D65_Z: 108.883,
    // Viewing conditions
    // Note about L_A:
    // Billy Bigg's implementation just uses a value of 4 cd/m^2, but
    // the colorspacious implementation uses greater precision by calculating
    // it with (64 / numpy.pi) / 5
    // This is based on Moroney (2000), "Usage guidelines for CIECAM97s" where
    // sRGB illuminance is 64 lux. Because of its greater precision we use
    // Moroney's alternative definition.
    la: (64.0 / Math.PI) / 5.0,
    yb: 20.0, // 20% gray
    // Surround
    f: 1.0,  // average;  dim: 0.9;  dark: 0.8
    c: 0.69, // average;  dim: 0.59; dark: 0.525
    nc: 1.0  // average;  dim: 0.95; dark: 0.8
  };

  vc.D65_LMS = xyz2cat02(vc.D65_X, vc.D65_Y, vc.D65_Z),

  vc.n = vc.yb / vc.D65_Y;
  vc.z = 1.48 + Math.sqrt(vc.n);

  var k = 1.0 / ((5.0 * vc.la) + 1.0);
  vc.fl = (0.2 * Math.pow(k, 4.0) * (5.0 * vc.la)) +
          0.1 * Math.pow(1.0 - Math.pow(k, 4.0), 2.0) *
              Math.pow(5.0 * vc.la, 1.0/3.0);

  vc.nbb = 0.725 * Math.pow(1.0 / vc.n, 0.2);
  vc.ncb = vc.nbb;
  vc.d = vc.f * ( 1.0 - (1.0 / 3.6) * Math.exp((-vc.la - 42.0) / 92.0) );
  vc.achromaticResponseToWhite = (function() {
    var l = vc.D65_LMS.l,
        m = vc.D65_LMS.m,
        s = vc.D65_LMS.s;

    var lc = l * (((vc.D65_Y * vc.d) / l) + (1.0 - vc.d)),
        mc = m * (((vc.D65_Y * vc.d) / m) + (1.0 - vc.d)),
        sc = s * (((vc.D65_Y * vc.d) / s) + (1.0 - vc.d));

    var hpeTransforms = cat022hpe(lc, mc, sc),
        lp = hpeTransforms.lh,
        mp = hpeTransforms.mh,
        sp = hpeTransforms.sh;

    var lpa = nonlinearAdaptation(lp, vc.fl),
        mpa = nonlinearAdaptation(mp, vc.fl),
        spa = nonlinearAdaptation(sp, vc.fl);

    return (2.0 * lpa + mpa + 0.05 * spa - 0.305) * vc.nbb;
  })();

  return vc;
})(); // end CIECAM02_VC

function cat022cam02(l,m,s) {
  var theColor = {};

  var D65_CAT02 = xyz2cat02(CIECAM02_VC.D65_X,CIECAM02_VC.D65_Y,CIECAM02_VC.D65_Z);

  function cTransform(cone, D65_cone) {
    var D65_Y = CIECAM02_VC.D65_Y,
        VC_d = CIECAM02_VC.d;

    return cone * (((D65_Y * VC_d) / D65_cone) + (1.0 - VC_d));
  }

  var lc = cTransform(l, D65_CAT02.l),
      mc = cTransform(m, D65_CAT02.m),
      sc = cTransform(s, D65_CAT02.s);

  var hpeTransforms = cat022hpe(lc, mc, sc),
      lp = hpeTransforms.lh,
      mp = hpeTransforms.mh,
      sp = hpeTransforms.sh;

  var lpa = nonlinearAdaptation(lp, CIECAM02_VC.fl),
      mpa = nonlinearAdaptation(mp, CIECAM02_VC.fl),
      spa = nonlinearAdaptation(sp, CIECAM02_VC.fl);

  var ca = lpa - ((12.0*mpa) / 11.0) + (spa / 11.0),
      cb = (1.0/9.0) * (lpa + mpa - 2.0*spa);

  theColor.h = (180.0 / Math.PI) * Math.atan2(cb, ca);
  if(theColor.h < 0.0) theColor.h += 360.0;

  var temp;
  if(theColor.h < 20.14) {
    temp = ((theColor.h + 122.47)/1.2) + ((20.14 - theColor.h)/0.8);
    theColor.H = 300 + (100*((theColor.h + 122.47)/1.2)) / temp;
  } else if(theColor.h < 90.0) {
    temp = ((theColor.h - 20.14)/0.8) + ((90.00 - theColor.h)/0.7);
    theColor.H = (100*((theColor.h - 20.14)/0.8)) / temp;
  } else if(theColor.h < 164.25) {
    temp = ((theColor.h - 90.00)/0.7) + ((164.25 - theColor.h)/1.0);
    theColor.H = 100 + ((100*((theColor.h - 90.00)/0.7)) / temp);
  } else if (theColor.h < 237.53) {
    temp = ((theColor.h - 164.25)/1.0) + ((237.53 - theColor.h)/1.2);
    theColor.H = 200 + ((100*((theColor.h - 164.25)/1.0)) / temp);
  } else {
    temp = ((theColor.h - 237.53)/1.2) + ((360 - theColor.h + 20.14)/0.8);
    theColor.H = 300 + ((100*((theColor.h - 237.53)/1.2)) / temp);
  }

  var a = ( 2.0*lpa + mpa + 0.05*spa - 0.305 ) * CIECAM02_VC.nbb;

  theColor.J = 100.0 * Math.pow(a / CIECAM02_VC.achromaticResponseToWhite,
                                CIECAM02_VC.c * CIECAM02_VC.z);

  var et = 0.25 * (Math.cos((theColor.h * Math.PI) / 180.0 + 2.0) + 3.8),
      t = ((50000.0 / 13.0) * CIECAM02_VC.nc * CIECAM02_VC.ncb * et * Math.sqrt(ca*ca + cb*cb)) /
          (lpa + mpa + (21.0/20.0)*spa);

  theColor.C = Math.pow(t, 0.9) * Math.sqrt(theColor.J / 100.0) *
                Math.pow(1.64 - Math.pow(0.29, CIECAM02_VC.n), 0.73);

  theColor.Q = (4.0 / CIECAM02_VC.c) * Math.sqrt(theColor.J / 100.0) *
                (CIECAM02_VC.achromaticResponseToWhite + 4.0) * Math.pow(CIECAM02_VC.fl, 0.25);

  theColor.M = theColor.C * Math.pow(CIECAM02_VC.fl, 0.25);

  theColor.s = 100.0 * Math.sqrt(theColor.M / theColor.Q);

  return theColor;
}


function Aab2Cat02LMS(A, aa, bb, nbb) {
  var x = (A / nbb) + 0.305;

  var l = (0.32787 * x) + (0.32145 * aa) + (0.20527 * bb),
      m = (0.32787 * x) - (0.63507 * aa) - (0.18603 * bb),
      s = (0.32787 * x) - (0.15681 * aa) - (4.49038 * bb);

  return {l:l, m:m, s:s};
}

function cam022rgb(J, C, h) {
  // NOTE input is small h not big H, the later of which is corrected

  var t = Math.pow(C / (Math.sqrt(J / 100.0) *
                      Math.pow(1.64-Math.pow(0.29, CIECAM02_VC.n), 0.73)),
                  (1.0 / 0.9)),
      et = 1.0 / 4.0 * (Math.cos(((h * Math.PI) / 180.0) + 2.0) + 3.8);

  var a = Math.pow( J / 100.0, 1.0 / (CIECAM02_VC.c * CIECAM02_VC.z) ) *
              CIECAM02_VC.achromaticResponseToWhite;

  var p1 = ((50000.0 / 13.0) * CIECAM02_VC.nc * CIECAM02_VC.ncb) * et / t,
      p2 = (a / CIECAM02_VC.nbb) + 0.305,
      p3 = 21.0 / 20.0,
      p4, p5, ca, cb;

  var hr = (h * Math.PI) / 180.0;

  if (Math.abs(Math.sin(hr)) >= Math.abs(Math.cos(hr))) {
    p4 = p1 / Math.sin(hr);
    cb = (p2 * (2.0 + p3) * (460.0 / 1403.0)) /
          (p4 + (2.0 + p3) * (220.0 / 1403.0) *
          (Math.cos(hr) / Math.sin(hr)) - (27.0 / 1403.0) +
          p3 * (6300.0 / 1403.0));
    ca = cb * (Math.cos(hr) / Math.sin(hr));
  }
  else {
    p5 = p1 / Math.cos(hr);
    ca = (p2 * (2.0 + p3) * (460.0 / 1403.0)) /
         (p5 + (2.0 + p3) * (220.0 / 1403.0) -
         ((27.0 / 1403.0) - p3 * (6300.0 / 1403.0)) *
         (Math.sin(hr) / Math.cos(hr)));
    cb = ca * (Math.sin(hr) / Math.cos(hr));
  }

  var lms_a = Aab2Cat02LMS(a, ca, cb, CIECAM02_VC.nbb),
      lpa = lms_a.l,
      mpa = lms_a.m,
      spa = lms_a.s;

  var lp = inverseNonlinearAdaptation(lpa, CIECAM02_VC.fl),
      mp = inverseNonlinearAdaptation(mpa, CIECAM02_VC.fl),
      sp = inverseNonlinearAdaptation(spa, CIECAM02_VC.fl);

  var txyz = hpe2xyz(lp, mp, sp),
      lms_c =  xyz2cat02(txyz.x, txyz.y, txyz.z);

  var D65_CAT02 = xyz2cat02(CIECAM02_VC.D65_X, CIECAM02_VC.D65_Y,
                            CIECAM02_VC.D65_Z);

  var l = lms_c.l / ( ((CIECAM02_VC.D65_Y * CIECAM02_VC.d) / D65_CAT02.l) +
                      (1.0 - CIECAM02_VC.d) ),
      m = lms_c.m / ( ((CIECAM02_VC.D65_Y * CIECAM02_VC.d) / D65_CAT02.m) +
                      (1.0 - CIECAM02_VC.d) ),
      s = lms_c.s / ( ((CIECAM02_VC.D65_Y * CIECAM02_VC.d) / D65_CAT02.s) +
                      (1.0 - CIECAM02_VC.d) );

  var xyz = cat022xyz(l, m, s),
      rgb = xyz2rgb(xyz.x, xyz.y, xyz.z);

  return rgb;
}


function jchConvert(o) {
  if (o instanceof JCh) return new JCh(o.J, o.C, o.h, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);

  var xyz = rgb2xyz(o.r, o.g, o.b),
      lmsConeResponses = xyz2cat02(xyz.x,xyz.y,xyz.z),
      cam02obj = cat022cam02(lmsConeResponses.l,lmsConeResponses.m,
                             lmsConeResponses.s);


  return new JCh(cam02obj.J, cam02obj.C, cam02obj.h, o.opacity);
}

function jch(J, C, h, opacity) {
  return arguments.length === 1 ? jchConvert(J) : new JCh(J, C, h,
      opacity == null ? 1 : opacity);
}

function JCh(J, C, h, opacity) {
  this.J = +J;
  this.C = +C;
  this.h = +h;
  this.opacity = +opacity;
}

define(JCh, jch, extend(Color, {
  brighter: function(k) {
      return new JCh(this.J + Kn * (k === null ? 1 : k), this.C, this.h,
          this.opacity);
    },
  darker: function(k) {
    return new JCh(this.J - Kn * (k === null ? 1 : k), this.C, this.h,
        this.opacity);
  },
  rgb: function() {
    var rgb = cam022rgb(this.J, this.C, this.h);
    return new Rgb(rgb.r, rgb.g, rgb.b, this.opacity);
  }
}));


////////////////////////////////////////////////////////////////////////////////
// Updated attempts at perceptually uniform color spaces
// Formulas and constants taken from
// M.R. Luo and C. Li. "CIECAM02 and Its Recent Developments"
var altCam02Coef = {
  lcd: {k_l: 0.77, c1: 0.007, c2:0.0053},
  scd: {k_l: 1.24, c1: 0.007, c2:0.0363},
  ucs: {k_l: 1.00, c1: 0.007, c2:0.0228}
};

function jabConvert(o) {
  if(o instanceof Jab) {
    return new Jab(o.J, o.a, o.b, o.opacity);
  }

  if (!(o instanceof Rgb)) o = rgbConvert(o);

  var xyz = rgb2xyz(o.r, o.g, o.b),
      lmsConeResponses = xyz2cat02(xyz.x,xyz.y,xyz.z),
      cam02 = cat022cam02(lmsConeResponses.l, lmsConeResponses.m, lmsConeResponses.s);

  var coefs = altCam02Coef.ucs;

  var JPrime = ((1.0 + 100.0*coefs.c1) * cam02.J) / (1.0 + coefs.c1 * cam02.J);
  JPrime = JPrime / coefs.k_l;

  var MPrime = (1.0/coefs.c2) * Math.log(1.0 + coefs.c2*cam02.M); // log=ln

  var a = MPrime * Math.cos(deg2rad*cam02.h),
      b = MPrime * Math.sin(deg2rad*cam02.h);

  return new Jab(JPrime, a, b, o.opacity);
}


// DE color distance function generator for the three CAM02 perceptually uniform
// models: lcd, scd, and ucs
function cam02de(coefs) {
  return function(o) {
    if (!(o instanceof Jab)) o = jabConvert(o);

    var k_l = coefs.k_l,
        diffJ = Math.abs(this.J - o.J),
        diffA = Math.abs(this.a - o.a),
        diffB = Math.abs(this.b - o.b);

    var de = Math.sqrt( (diffJ/k_l)*(diffJ/k_l) + diffA*diffA + diffB*diffB );

    return de;
  };
}


function jab(J, a, b, opacity) {
  opacity = opacity == null ? 1 : opacity;
  return arguments.length === 1 ? jabConvert(J) :
      new Jab(J, a, b, opacity);
}

function Jab(J, a, b, opacity) {
  this.J = J;
  this.a = a;
  this.b = b;
  this.opacity = opacity;
}

define(Jab, jab, extend(Color, {
  brighter: function(k) {
      return new Jab(this.J + Kn * (k === null ? 1 : k), this.a, this.b, this.opacity);
    },
  darker: function(k) {
    return new Jab(this.J - Kn * (k === null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var coefs = altCam02Coef.ucs;

    var J = this.J, a = this.a, b = this.b;
    // Get the new M using trigonomic identities
    // MPrime = (1.0/coefs.c2) * Math.log(1.0 + coefs.c2*cam02.M); // log=ln
    // var a = MPrime * Math.cos(o.h),
    //     b = MPrime * Math.sin(o.h);
    // x*x = (x*cos(y))*(x(cos(y))) + (x*sin(y))*(x(sin(y)))
    var newMPrime = Math.sqrt(a*a + b*b),
        newM = (Math.exp(newMPrime * coefs.c2) - 1.0) / coefs.c2;

    var newh = rad2deg*Math.atan2(b,a);
    if(newh < 0) newh = 360.0 + newh;

    // M = C * Math.pow(CIECAM02_VC.fl, 0.25);
    // C = M / Math.pow(CIECAM02_VC.fl, 0.25);
    var newC = newM / Math.pow(CIECAM02_VC.fl, 0.25);

    // Last, derive the new Cam02J
    // JPrime = ((1.0 + 100.0*coefs.c1) * cam02.J) / (1.0 + coefs.c1 * cam02.J)
    // simplified: var cam02J = JPrime / (1.0 + coefs.c1*(100.0 - JPrime));
    // if v = (d*x) / (b + a*x), x = (b*(v/d)) / (1 - a(v/d))
    var newCam02J = J / (1.0 + coefs.c1*(100.0 - J));

    var rgb = cam022rgb(newCam02J, newC, newh);

    return new Rgb(rgb.r, rgb.g, rgb.b, this.opacity);
  },
  de: cam02de(altCam02Coef.ucs)
}));

function interpolateJab(start, end) {
  // constant, linear, and colorInterpolate are taken from d3-interpolate
  // the colorInterpolate function is `nogamma` in the d3-interpolate's color.js
  function constant(x) { return function() { return x; } }
  function linear(a, d) { return function(t) { return a + t * d; }; }
  function colorInterpolate(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  start = jabConvert(start);
  end = jabConvert(end);

  // TODO import color function from d3-interpolate
  var J = colorInterpolate(start.J, end.J),
      a = colorInterpolate(start.a, end.a),
      b = colorInterpolate(start.b, end.b),
      opacity = colorInterpolate(start.opacity, end.opacity);

  return function(t) {
    start.J = J(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

exports.color = color;
exports.rgb = rgb;
exports.jch = jch;
exports.jab = jab;
exports.interpolateJab = interpolateJab;

Object.defineProperty(exports, '__esModule', { value: true });

})));