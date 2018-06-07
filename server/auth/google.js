var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
import jwt from 'jsonwebtoken'

const dev = process.env.NODE_ENV !== 'production'

import User from '../db/models/User'

export default server => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_ID,
        callbackURL: dev
          ? `${process.env.ROOT_URL_DEV}/auth/googlecallback`
          : `${process.env.ROOT_URL_PROD}/auth/googlecallback`
      },
      async (accessToken, refreshToken, profile, done) => {
        const name =
          profile.displayName || profile.name
            ? `${profile.name.givenName} ${profile.name.familyName}`
            : ''

        const email =
          (profile.emails &&
            profile.emails.length > 0 &&
            profile.emails[0].value) ||
          null

        const googleId = profile.id

        try {
          let user = await User.findOne({ googleId }).exec()

          if (user) {
            return done(null, user)
          }

          const emailExist = await User.findOne({ email }).exec()

          if (emailExist) {
            return done('Email already exists')
          }

          user = await User.create({
            email,
            name,
            googleId
          })

          done(null, user)
        } catch (err) {
          console.log(err)
          done(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById({ _id: id }, (err, user) => {
      done(err, user)
    })
  })

  server.get('/auth/google', (req, res) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res)
  })

  server.get(
    '/auth/googlecallback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: dev
        ? `${process.env.CLIENT_URL_DEV}/login`
        : `${process.env.CLIENT_URL_PROD}/login`
    }),
    (req, res) => {
      const token = jwt.sign({ userId: req.user._id }, process.env.AUTH_SECRET)
      console.log(token)
      res.redirect(
        dev
          ? `${process.env.CLIENT_URL_DEV}/authcallback?token=${token}`
          : `${process.env.CLIENT_URL_PROD}/authcallback?token=${token}`
      )
    }
  )
}
