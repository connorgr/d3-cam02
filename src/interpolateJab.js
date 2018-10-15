import {jabConvert} from './jabConvert';

export default function interpolateJab(start, end) {
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
