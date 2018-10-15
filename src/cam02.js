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

import {color, rgb} from "d3-color";
import {rad2deg} from "./math";
import {jabConvert} from './jabConvert';
import {altCam02Coef, Kn} from './constants';
import {rgb2xyz, xyz2cat02} from './xyzspatialConversions';
import {CIECAM02_VC} from './adaptations';
import {cat022cam02} from './catspatialConversions';
import {cam02de, cam022rgb} from './camSpatialConversions';


function jchConvert(o) {
  if (o instanceof JCh) return new JCh(o.J, o.C, o.h, o.opacity);
  if (!(o instanceof rgb)) o = rgb(o);

  var xyz = rgb2xyz(o.r, o.g, o.b),
      lmsConeResponses = xyz2cat02(xyz.x,xyz.y,xyz.z),
      cam02obj = cat022cam02(lmsConeResponses.l,lmsConeResponses.m,
                             lmsConeResponses.s);


  return new JCh(cam02obj.J, cam02obj.C, cam02obj.h, o.opacity);
}

export default function jch(J, C, h, opacity) {
  return arguments.length === 1 ? jchConvert(J) : new JCh(J, C, h,
      opacity == null ? 1 : opacity);
}

export function JCh(J, C, h, opacity) {
  this.J = +J;
  this.C = +C;
  this.h = +h;
  this.opacity = +opacity;
}

var jchPrototype = JCh.prototype = jch.prototype = Object.create(color.prototype);
jchPrototype.constructor = JCh;

jchPrototype.brighter = function(k) {
  return new JCh(this.J + Kn * (k === null ? 1 : k), this.C, this.h,
      this.opacity);
};

jchPrototype.darker = function(k) {
  return new JCh(this.J - Kn * (k === null ? 1 : k), this.C, this.h,
      this.opacity);
};

jchPrototype.rgb = function () {
  var converted = cam022rgb(this.J, this.C, this.h);
  return rgb(converted.r, converted.g, converted.b, this.opacity);
};


export function jab(J, a, b, opacity) {
  opacity = opacity == null ? 1 : opacity;
  return arguments.length === 1 ? jabConvert(J) :
      new Jab(J, a, b, opacity);
}

export function Jab(J, a, b, opacity) {
  this.J = J;
  this.a = a;
  this.b = b;
  this.opacity = opacity;
}


var jabPrototype = Jab.prototype = jab.prototype = Object.create(color.prototype);
jabPrototype.constructor = JCh;

jabPrototype.brighter = function(k) {
  return new Jab(this.J + Kn * (k === null ? 1 : k), this.a, this.b,
      this.opacity);
};

jabPrototype.darker = function(k) {
  return new Jab(this.J - Kn * (k === null ? 1 : k), this.a, this.b,
      this.opacity);
};

jabPrototype.rgb = function() {
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

  var converted = cam022rgb(newCam02J, newC, newh);

  return rgb(converted.r, converted.g, converted.b, this.opacity);
};

jabPrototype.de = cam02de(altCam02Coef.ucs);




