const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    // google strategy has an internal identifier of the string 'google'
    passport.authenticate('google', {
      // specifies to google servers what parts of the account we want bakc
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    // callback will have a user specific code in the URL to be used by passport
    passport.authenticate('google'),
    // after passport middleware above finishes, it passes request to the next handler in the chain
    (req, res) => {
      res.redirect('/surveys');
    },
  );

  app.get('/api/user/', (req, res) => {
    const { user } = req;
    res.send(user);
  });

  app.get('/api/user/logout', (req, res) => {
    // provided by passport - removes the req.user property and clears the login session if any
    req.logout();
    res.redirect('/');
  });
};
