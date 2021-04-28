const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe.secret);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post(
    '/api/stripe',
    requireLogin,
    async (req, res) => {
      try {
        const charge = await stripe.charges.create({
          amount: 500,
          currency: 'usd',
          description: '$5 for 5 survey credits',
          source: req.body.id,
        });

        // user model is stored on request by passport under req.user if authenticated
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
      } catch (e) {
        console.log(e);
        res.status(e.statusCode).send({
          errorType: e.rawType,
          error: e.raw.message,
        });
      }
    },
  );
};
