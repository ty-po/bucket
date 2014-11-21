// Load required packages
var uuid = require('node-uuid');
var User = require('../models/user');
var fbAuth = require('./fb');


// Create endpoint /api/users for POSTS
exports.postUsers = function(req, res) {
  // Create a new instance of the User model
  var user = new User();

  // Verify Facebook Data
  var data;
  fbAuth.verify(req.body.fb_auth, function(err, token, data) {
      if(err) {
        res.json({ message: 'Facebook authentication failed', data: data});
      }

      else {
        //find user by ID and create new if needed
        User.findOne({'fb.id': data.id}, function(err, user){
          if(user == null) {
            user = new User();
          }

          //update information
          user.fb.id = data.id;
          user.fb.auth = req.body.fb_auth;
          user.name = data.name;
          user.gender = data.gender;
          user.birthday = data.birthday;
          user.fb.email = data.email;
          user.city = data.location.name;
          user.fb.picture = data.picture.data.url;

          user.loc = req.body['loc'].split(',');

          //Random auth token
          token = uuid.v1();
          user.auth = token;

          // Save the user and check for errors
          user.save(function(err) {
            if (err)
              res.send(err);
           res.json({ message: 'Signed In', id: user._id, auth: token});
          });
        });

      }
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  // Use the User model to find all user
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/users/:user_id for GET
exports.getUser = function(req, res) {
  // Use the User model to find a specific user
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
};

// Create endpoint /api/users/:user_id for PUT
exports.putUser = function(req, res) {
  // Use the User model to find a specific user
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    // Update the existing user location
    user.loc = req.body['loc'].split(',');
    // Save the user and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
  // Use the User model to find a specific user and remove it
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed' });
  });
};
