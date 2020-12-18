var express = require('express');
var router = express.Router();
const { jwtSecret } = require('../env');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    const body = { _id: req.user._id, username: req.user.username };
    res.json({
      message: 'Signup successfull',
      user: body
    });
  }
);
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, username: user.username };
              const token = jwt.sign({ user: body }, jwtSecret);

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;
