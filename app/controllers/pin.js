// Load required packages
var Pin = require('../models/pin');

// Create endpoint /api/pins for POSTS
exports.postPins = function(req, res) {
  // Create a new instance of the Pin model
  var pin = new Pin();

  // Set the pin properties that came from the POST data
  pin.name = req.body.name;
  pin.loc = req.body['loc'].split(',');
  pin.time = req.body.time;
  pin.ownerId = req.user._id;

  pin.length = req.body.length;

  pin.info.blurb = req.body.info_blurb;
  pin.info._type = req.body.info_type;
  pin.info.picture = req.body.picture_url;
  
  pin.rules.friendinvites = req.body.rules_friends;
  pin.rules.agemin = req.body.rules_agemin;
  pin.rules.agemax = req.body.rules_agemax;
  pin.rules.distance = req.body.rules_distance;
  pin.rules.invitetype = req.body.rules_type;

  // Save the pin and check for errors
  pin.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Pin added', data: pin });
  });
};

// Create endpoint /api/pins for GET
exports.getPins = function(req, res) {
  // Use the Pin model to find all pin
  Pin.find({loc: { $near: req.user.loc, 
                    $maxDistance: (req.user.maxdist/69.047)}},
                    function(err, pins) {
    if (err)
      res.send(err);

    res.json(pins);
  });
};

// Create endpoint /api/pins/:pin_id for GET
exports.getPin = function(req, res) {
  // Use the Pin model to find a specific pin
  Pin.findById(req.params.pin_id, function(err, pin) {
    if (err)
      res.send(err);

    res.json(pin);
  });
};

// Create endpoint /api/pins/:pin_id for PUT
exports.putPin = function(req, res) {
  // Use the Pin model to find a specific pin
  Pin.findById(req.params.pin_id, function(err, pin) {
    if (err)
      res.send(err);

    // Update the existing pin information
    pin.info.blurb = req.body.info_blurb;
    pin.info._type = req.body.info_type;
    pin.info.picture = req.body.picture_url;
  
    pin.rules.friendinvites = req.body.rules_friends;
    pin.rules.agemin = req.body.rules_agemin;
    pin.rules.agemax = req.body.rules_agemax;
    pin.rules.distance = req.body.rules_distance;
    pin.rules.invitetype = req.body.rules_type;

    // Save the pin and check for errors
    pin.save(function(err) {
      if (err)
        res.send(err);

      res.json(pin);
    });
  });
};

// Create endpoint /api/pins/:pin_id for DELETE
exports.deletePin = function(req, res) {
  // Use the Pin model to find a specific pin and remove it
  Pin.findByIdAndRemove(req.params.pin_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Pin removed' });
  });
};
