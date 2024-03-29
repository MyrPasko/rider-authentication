const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// For signIn we will use local strategy to auth user using email and password only
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
// Verify this username and password, call done with the user
// if it is the correct email and password
// otherwise, all done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
          return done(err);
      }
      if (!isMatch) {
          return done(null, false);
      }

      return done(null, user);
    })
  })
});

// Setup option for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

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
passport.use(jwtLogin);
passport.use(localLogin);


