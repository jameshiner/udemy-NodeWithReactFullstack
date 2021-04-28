const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// takes a request body on a post request, parses it, and assigns to req.body
const bodyParser = require('body-parser');
/*
 * express also recommends express-session. the difference between express-session and
 * cookie-session is with cookie-session the cookie *IS* the session, the relevant cookie
 * data is stored directly in the session where you can only use the max cookie size
 * of 14kb. With express-session the cookie holds a *reference* to a session which is then
 * stored in a session store in a db or some remote store where you can store as much
 * data as you want in the session
*/
const cookieSession = require('cookie-session');
const passport = require('passport');

const { mongoURI, cookieKey } = require('./config/keys');

// run the passport config and models, nothing to export - models have to be first
// otherwise passport tries to use the models before theyre registered
require('./models/User');
require('./services/passport');

const app = express();

/*
* app.use registers middlewares which modify incoming requests before they hits route handlers
* instead of putting certain logic into multiple route handlers, it can be better handled here
* middlewares can also be set to only run for certain routes
*/
app.use(bodyParser.json());
app.use(
  // takes the user data out of the cookie and assigns it to req.session
  // passport then access the user data on req.session in (de)serializeUser
  cookieSession({
    // cookie expiration - 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key to sign cookie for encryption
    keys: [cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// connect to mongo server
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// pass the app to the authentication routes
require('./routes/authentication')(app);
require('./routes/billing')(app);

if (process.env.NODE_ENV === 'production') {
  // this section runs in order, first checks for the client build files
  // if they dont exist it will match the route below and send back index.html

  // serve up production assets like main.js main.css
  app.use(express.static('client/build'));

  // serve up index.html if it doesnt recognize the route
  // matches every path not matched by required routes above and sends back index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
