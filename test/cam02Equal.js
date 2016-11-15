var tape = require("tape"),
    color = require("../");

tape.Test.prototype.jchEqual = function(actual, J, C, H, opacity) {
  this._assert(actual instanceof color.jch
        && (isNaN(J) ? isNaN(actual.J) && actual.J !== actual.J : J - 1e-6 <= actual.J && actual.J <= J + 1e-6)
        && (isNaN(C) ? isNaN(actual.C) && actual.C !== actual.C : C - 1e-6 <= actual.C && actual.C <= C + 1e-6)
        && (isNaN(H) ? isNaN(actual.H) && actual.H !== actual.H : H - 1e-6 <= actual.H && actual.H <= H + 1e-6)
        && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity), {
      message: "should be equal",
      operator: "jchEqual",
      actual: [actual.J, actual.C, actual.H, actual.opacity],
      expected: [J, C, H, opacity]
    });
};
