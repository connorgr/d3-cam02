import {deg2rad} from "./math";
import {Jab} from './cam02';
import {rgb} from "d3-color";
import {altCam02Coef} from './constants';
import {rgb2xyz, xyz2cat02} from './xyzspatialConversions';
import {cat022cam02} from './catspatialConversions';

export function jabConvert(o) {
	if(o instanceof Jab) {
		return new Jab(o.J, o.a, o.b, o.opacity);
	}

	if (!(o instanceof rgb)) o = rgb(o);

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


