const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { jwtSecret } = require('../env');
const UserModel = require("../models").User;
const RoleModel = require('../models').Role;
const bcrypt = require("bcrypt");

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
          const userPayload = { ...req.body, email, password, roleId: 1, active: true };
          const user = await UserModel.create(userPayload);
          return done(null, user);
        } catch (error) {
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
          const user = await UserModel.findOne({ where: { email }, include: [ { model: RoleModel, as: 'role' }] });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          const validate = await bcrypt.compare(password, user.password); 
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