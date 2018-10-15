////////////////////////////////////////////////////////////////////////////////
// Updated attempts at perceptually uniform color spaces
// Formulas and constants taken from
// M.R. Luo and C. Li. "CIECAM02 and Its Recent Developments"
export var altCam02Coef = {
	lcd: {k_l: 0.77, c1: 0.007, c2:0.0053},
	scd: {k_l: 1.24, c1: 0.007, c2:0.0363},
	ucs: {k_l: 1.00, c1: 0.007, c2:0.0228}
};

// used for brighter and darker functions
// Kn is completely arbitrary and was picked originally by Mike Bostock to make
// the Lab brighter and darker functions behave similarly to the RGB equivalents
// in d3-color. We copy and paste the value directly and encourage others to
// add a more systematically chosen value.
export var Kn = 18;
