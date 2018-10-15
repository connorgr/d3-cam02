import {jabConvert} from './jabConvert';


// constant, linear, and colorInterpolate are taken from d3-interpolate
// the colorInterpolate function is `nogamma` in the d3-interpolate's color.js
function constant(x) { return function() { return x; } }

function linear(a, d) { return function(t) { return a + t * d; }; }

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function colorInterpolate(a, b) {
	var d = b - a;
	return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}

function jab(hue) {
	return function(start, end) {

		var J = hue((start = jabConvert(start)).J, (end = jabConvert(end)).J),
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
}
export default jab(hue);
export var jabLong = jab(colorInterpolate);
