import {CIECAM02_VC, cat022hpe, nonlinearAdaptation} from './adaptations';
import {xyz2cat02} from './xyzspatialConversions';

export function cat022cam02(l,m,s) {
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
