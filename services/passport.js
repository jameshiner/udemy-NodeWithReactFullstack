const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { googleOAuth } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // send back the mongo document id as the unique id in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    return done({ error: 'Error deserializing user id.', id }, null);
  }
  // fetches the user based on the id and attaches it to the request in req.user
  return done(null, user);
});

// creates a new instance of GoogleStrategy and registers it for use w passport
passport.use(new GoogleStrategy({
  ...googleOAuth,
  callbackURL: '/auth/google/callback',
  proxy: true,
}, async (accessToken, refreshToken, profile, done) => {
  // accessToken => used to prove to google we have permissions to their acct
  // refreshToken => used to update the accessToken if it expires
  // profile => users profile we requested
  // done => callback

  const { id: googleID, name } = profile;
  const existingUser = await User.findOne({ googleID });

  if (!existingUser) {
    const newUser = await new User({ googleID, name }).save();
    if (!newUser) {
      return done({ error: 'Error creating user.' }, null);
    }
    return done(null, newUser);
  }
  return done(null, existingUser);
}));
