import {xyz2cat02} from './xyzspatialConversions';

export function nonlinearAdaptation(coneResponse, fl) {
	var p = Math.pow( (fl * coneResponse) / 100.0, 0.42 );
	return ((400.0 * p) / (27.13 + p)) + 0.1;
}

export function inverseNonlinearAdaptation(coneResponse, fl) {
	return (100.0 / fl) *
					Math.pow((27.13 * Math.abs(coneResponse - 0.1)) /
											(400.0 - Math.abs(coneResponse - 0.1)), 1.0 / 0.42);
}


export function Aab2Cat02LMS(A, aa, bb, nbb) {
  var x = (A / nbb) + 0.305;

  var l = (0.32787 * x) + (0.32145 * aa) + (0.20527 * bb),
      m = (0.32787 * x) - (0.63507 * aa) - (0.18603 * bb),
      s = (0.32787 * x) - (0.15681 * aa) - (4.49038 * bb);

  return {l:l, m:m, s:s};
}

// Hunt-Pointer-Estevez transformation
export function cat022hpe(l,m,s) {
  var lh = ( 0.7409792 * l) + (0.2180250 * m) + (0.0410058 * s),
      mh = ( 0.2853532 * l) + (0.6242014 * m) + (0.0904454 * s),
      sh = (-0.0096280 * l) - (0.0056980 * m) + (1.0153260 * s);

  return {lh: lh, mh: mh, sh: sh};
}

// CIECAM02_VC viewing conditions; assumes average viewing conditions
export var CIECAM02_VC = (function() {
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
