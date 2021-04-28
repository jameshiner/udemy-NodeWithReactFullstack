module.exports = {
  googleOAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripe: {
    secret: process.env.STRIPE_SECRET,
    public: process.env.STRIPE_PUBLIC,
  },
};
