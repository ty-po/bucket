// Load required packages
var User = require('../models/user');

/*
   FIND A WAY TO SIMPLIFY THIS CONTROLLER/INTEGRATE INTO USER
*/

// Create endpoint /api/me for POSTS

// Create endpoint /api/me for GET
exports.getMe = function(req, res) {
  // Use the User model to find a specific user
  User.findById(req.user._id, function(err, me) {
    if (err)
      res.send(err);

    res.json(me);
  }).select('+fb.email fb.auth invites created'); //DOESNT WORK YET
};

// Create endpoint /api/me for PUT
exports.putMe = function(req, res) {
  // Use the User model to find a specific user
  User.findById(req.user._id, function(err, me) {
    if (err)
      res.send(err);

    // Update the existing user location
    me.loc = req.body['loc'].split(',');
    // Save the user and check for errors
    me.save(function(err) {
      if (err)
        res.send(err);

      res.json(me);
    });
  });
};
