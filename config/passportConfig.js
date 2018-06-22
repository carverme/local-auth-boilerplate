//local strategy...  installing passport-local..does this..
//also with an install of passport..

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

//This turns the user into just an ID for serializing, or to send over the wire.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

//This takes that ID and looks up the user in the DB.
passport.deserializeUser(function(id, cb) {
  db.user.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

//UP /looking at the documentation for Passport, this information is what's there.

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: {email: email}
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
