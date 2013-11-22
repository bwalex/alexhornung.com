define(['jade!templates/test.jade'], function(tmplTest) {
  console.log(tmplTest({names: ["A", "B"], bye: function(name) { return "Bye " + name; }}));
});
