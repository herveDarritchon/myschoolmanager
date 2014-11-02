// hello-test.js
casper.test.begin("Test the Home page!", 1, function(test) {
  casper.start("http://localhost:3000/#/");
  casper.then(function() {
    test.assertTitle("My School Manager", "homepage title is the one expected");
  });

  casper.run(function() {
    test.done();
  });

});
