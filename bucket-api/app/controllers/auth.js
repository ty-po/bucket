var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
  function(id, auth, callback) {
    User.findOne({_id: id})
        .select("+auth")
        .exec(function (err, user) {

      if (err) { return callback(err); }
      // No user found with that id
      if (!user) { return callback(null, false); }
      // Make sure the auth is correct
      user.verifyAuth(auth, function(err, isMatch) {
        if (err) { return callback(err); }
        // Auth did not match
        if (!isMatch) { return callback(null, false); }
        // Success
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
