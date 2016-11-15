var tape = require("tape"),
    color = require("../");

require("./cam02Equal.js");
require("./rgbEqual.js");

tape("jch(…) returns an instance of cam02ucs and color", function(test) {
  var c = color.jch(80, 40, 50);
  test.ok(c instanceof color.jch);
  test.ok(c instanceof color.color);
  test.equal(c.constructor.name, "JCh");
  test.end();
});

tape("jch(…) object construction works as expected", function(test) {
  test.equal(color.jch(80, 40, 50).J, 80);
  test.equal(color.jch(80, 40, 50).C, 40);
  test.equal(color.jch(80, 40, 50).h, 50);
  test.end();
});

tape("jch.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.jch("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.jch("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.jch("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.jch("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.equal(color.jch("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.jch(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.end();
});

tape("jab(…) object construction works as expected", function(test) {
  test.equal(Math.round(color.jab(80, 40, 50).J), 80);
  test.equal(Math.round(color.jab(80, 40, 50).a), 40);
  test.equal(Math.round(color.jab(80, 40, 50).b), 50);
  test.end();
});

tape("jab.toString() converts to RGB and formats as rgb(…) or rgba(…)", function(test) {
  test.equal(color.jab("#abcdef") + "", "rgb(171, 205, 239)");
  test.equal(color.jab("moccasin") + "", "rgb(255, 228, 181)");
  test.equal(color.jab("hsl(60, 100%, 20%)") + "", "rgb(102, 102, 0)");
  test.equal(color.jab("hsla(60, 100%, 20%, 0.4)") + "", "rgba(102, 102, 0, 0.4)");
  test.equal(color.jab("rgb(12, 34, 56)") + "", "rgb(12, 34, 56)");
  test.equal(color.jab(color.rgb(12, 34, 56)) + "", "rgb(12, 34, 56)");
  test.end();
});

// These values were obtained by using Python's colorspacious library. If you
// have psychophysical measurements from colorometers, please contribute!
tape("cam02 JCh color channels are correct", function(test) {
  function jchChannel(rgbStr, attr, eq) {
    return test.equal(color.jch(rgbStr)[attr].toFixed(2), eq);
  }
  jchChannel("rgb(0,0,0)", "J", "0.00");
  jchChannel("rgb(50,50,50)", "J", "14.92");
  jchChannel("rgb(100,100,100)", "J", "32.16");
  jchChannel("rgb(150,150,150)", "J", "52.09");
  jchChannel("rgb(200,200,200)", "J", "74.02");
  jchChannel("rgb(250,250,250)", "J", "97.57");
  jchChannel("rgb(255,255,255)", "J", "100.00");
  jchChannel("rgb(255,0,0)", "J", "46.93");
  jchChannel("rgb(255,0,0)", "C", "111.30");
  jchChannel("rgb(255,0,0)", "h", "32.15");
  test.end();
});

tape("cam02ucs color channels are correct", function(test) {
  function jabChannel(rgbStr, attr, eq) {
    return test.equal(color.jab(rgbStr)[attr].toFixed(2), eq);
  }
  jabChannel("rgb(0,0,0)", "J", "0.00");
  jabChannel("rgb(50,50,50)", "J", "22.96");
  jabChannel("rgb(150,150,150)", "J", "64.89");
  jabChannel("rgb(255,255,255)", "J", "100.00");
  jabChannel("rgb(255,255,255)", "a", "-1.91");
  jabChannel("rgb(255,255,255)", "b", "-1.15");
  jabChannel("rgb(255,0,0)", "J", "60.05");
  jabChannel("rgb(255,0,0)", "a", "38.69");
  jabChannel("rgb(255,0,0)", "b", "24.32");
  jabChannel("rgb(0,0,255)", "J", "31.22");
  jabChannel("rgb(0,0,255)", "a", "-8.38");
  jabChannel("rgb(0,0,255)", "b", "-39.16");
  test.end();
});

// The mystery condition! For some reason this case doesn't work for many
// color libraries and I don't know why. If you do, please get in touch!
// tape("jch displayable works as intended", function(test) {
//   test.equal(color.jch(12, 90, 90).displayable(), false);
//   test.end();
// });
