var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var PinSchema = new Schema({
  name: {type: String, required: true},
  loc:  {type: [Number], index: '2d', unique: true, required: true},
  time: {type: Date, required: true},
  length: Number,
  info: {
    blurb: String,
    _type: Number,
    picture: String
  },
  rules: {
    friendinvites: [String],
    agemin: {type: Number, default: 21},
    agemax: Number,
    distance: Number,
    invitetype: {type: Number, default: 0}
  },
  rating: Number,
  ratio: Number,
  ownerId: {type: String, required: true},
  attending: [String]
});

PinSchema.index({'time': 1}, {expireAfterSeconds: 72000});

PinSchema.plugin(uniqueValidator);

PinSchema.post('save', function(pin) {
  //Invite users
});

module.exports = mongoose.model('Pin', PinSchema);
