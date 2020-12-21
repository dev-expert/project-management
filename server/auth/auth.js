const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { jwtSecret } = require('../env');
const UserModel = require("../models").User;

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const userPayload = { ...req.body, email, password };
          const user = await UserModel.create(userPayload);
          console.log(user)
          return done(null, user);
        } catch (error) {
          console.log("error", error)
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          console.log("------------", UserModel)
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await UserModel.isValidPassword(password);
          console.log("------------", UserModel)
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );