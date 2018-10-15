// Conversion functions
export function rgb2xyz(r, g, b) {
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

export function xyz2rgb(x, y, z) {
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

export function xyz2cat02(x,y,z) {
  var l = ( 0.7328 * x) + (0.4296 * y) - (0.1624 * z),
      m = (-0.7036 * x) + (1.6975 * y) + (0.0061 * z),
      s = ( 0.0030 * x) + (0.0136 * y) + (0.9834 * z);
  return {l: l, m: m, s: s};
}
export function cat022xyz(l, m, s) {
  var x = ( 1.096124 * l) - (0.278869 * m) + (0.182745 * s),
      y = ( 0.454369 * l) + (0.473533 * m) + (0.072098 * s),
      z = (-0.009628 * l) - (0.005698 * m) + (1.015326 * s);
  return {x: x, y: y, z:z};
}

export function hpe2xyz(l, m, s) {
  var x = (1.910197 * l) - (1.112124 * m) + (0.201908 * s),
      y = (0.370950 * l) + (0.629054 * m) - (0.000008 * s),
      z = s;
  return {x:x, y:y, z:z};
}
