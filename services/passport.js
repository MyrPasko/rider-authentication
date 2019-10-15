const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup option for JWT Strategy
const jwtOptions = {};

// Create JWT strategy
// payload = params of jwt.encode function {sub, iat}
// done = callback after successful auth of user
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID ip the payload exists in out DB
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      // If it does, all 'done'
      done(null, user);
    } else {
      // Otherwise call 'done' without a user object
      done(null, false);
    }
  })


});


// Tell passport to use this strategy


