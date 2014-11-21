var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  loc: {type: [Number], index: '2d', required: true},
  maxdist: {type: Number, default: 2.5},
  city: String,
  auth: {
    type: String,
    required: true,
    select: false
  },

  fb: {
    id: {
      type: String,
      unique: true,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      select: false
    },
    auth: {
      type: String,
      required: true,
      select: false
    }
  },

  invites: {
    type: [Schema.Types.ObjectId],
    select: false
  },
  gender: String,
  birthday: Date,
  created: {
    type: Date, 
    default: Date.now, 
    select: false
  },
  rating: Number
});

UserSchema.plugin(uniqueValidator);


UserSchema.pre('save', function(callback) {
  var user = this;
  // Break out if the auth token hasn't changed
  if (!user.isModified('auth')) return callback();
  // Auth token changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.auth, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.auth = hash;
      callback();
    });
  });
});


UserSchema.methods.verifyAuth = function(auth, cb) {
  var user = this;
  return cb(null, bcrypt.compareSync(auth, user.auth));
};

module.exports = mongoose.model('User', UserSchema);
