const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,              // convention Subject (who is the user)
    iat: timestamp,            // convention Issued At Time
  }, config.secret);
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need ot give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You should provide email and password.' });
  }
  //See if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // If user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use.' });
    }

    // If user does not exist, create and save user record
    const newUser = new User({
      email,
      password,
    });

    newUser.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user was crated
      res.json({ token: tokenForUser(newUser) });
    });
  });


};
