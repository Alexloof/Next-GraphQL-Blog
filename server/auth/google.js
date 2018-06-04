var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

import User from '../db/models/User'

export default server => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_ID,
        callbackURL: 'http://localhost:4000/auth/googlecallback'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken, profile)
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
            done(null, user)
          }

          user = await User.create({
            email,
            name,
            googleId
          })
          console.log('newUser', user)
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

  server.use(passport.initialize())
  server.use(passport.session())

  server.get('/auth/google', (req, res) => {
    // if (
    //   req.query &&
    //   req.query.redirectUrl &&
    //   req.query.redirectUrl.startsWith('/')
    // ) {
    //   req.session.finalUrl = req.query.redirectUrl
    // } else {
    //   req.session.finalUrl = null
    // }

    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res)
  })

  server.get(
    '/auth/googlecallback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:3000/login'
    }),
    (req, res) => {
      console.log(req)
      res.redirect('http://localhost:3000')
    }
  )
}
