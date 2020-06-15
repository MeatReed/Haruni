const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const passport = require('passport')
const Strategy = require('passport-discord').Strategy
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const bodyParser = require('body-parser')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

module.exports = async (client) => {
  app.use(function (req, res, next) {
    req.client = client
    next()
  })

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  passport.use(
    new Strategy(
      {
        clientID: process.env.BOT_ID,
        clientSecret: process.env.OAUTHSECRET,
        callbackURL: process.env.CALLBACKURL,
        scope: ['identify', 'guilds']
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
      }
    )
  )

  app.use(
    session({
      store: new MemoryStore({
        checkPeriod: 99999999
      }),
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )

  app.get(
    '/login',
    (req, res, next) => {
      req.session.backURL = '/'
      next()
    },
    passport.authenticate('discord')
  )

  app.get('/callback', passport.authenticate('discord'), (req, res) => {
    res.redirect('/')
  })

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
