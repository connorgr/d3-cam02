
import {xyz2rgb, xyz2cat02, cat022xyz, hpe2xyz} from './xyzspatialConversions';
import {CIECAM02_VC, inverseNonlinearAdaptation, Aab2Cat02LMS} from './adaptations';
import {jabConvert} from './jabConvert';
import {Jab} from './cam02';

// DE color distance function generator for the three CAM02 perceptually uniform
// models: lcd, scd, and ucs
export function cam02de(coefs) {
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


export function cam022rgb(J, C, h) {
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
