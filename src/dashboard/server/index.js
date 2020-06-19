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
        scope: ['identify', 'guilds'],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
      }
    )
  )

  app.use(
    session({
      store: new MemoryStore({
        checkPeriod: 99999999,
      }),
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: false,
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
    res.redirect('/player')
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
  const server = app.listen(port, host)

  const io = require('socket.io')(server)

  io.on('connection', (socket) => {
    client.lavaClient.on('createPlayer', (player) => {
      const playerCloned = Object.assign({}, player)
      delete playerCloned.client
      delete playerCloned.node
      delete playerCloned.lavaJS
      socket.emit('createPlayer/' + player.options.guild.id, playerCloned)
    })

    client.lavaClient.on('playerUpdate', (player) => {
      const playerCloned = Object.assign({}, player)
      delete playerCloned.client
      delete playerCloned.node
      delete playerCloned.lavaJS
      socket.emit('sendPlayer/' + player.options.guild.id, playerCloned)
    })

    client.lavaClient.on('destroyPlayer', (player) => {
      socket.emit('destroyPlayer/' + player.options.guild.id)
    })

    socket.on('getPlayer', (data) => {
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit('sendPlayer', null)
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      const playerCloned = Object.assign({}, player)
      delete playerCloned.client
      delete playerCloned.node
      delete playerCloned.lavaJS
      socket.emit('sendPlayer/' + guildID, playerCloned)
    })

    socket.on('connectPlayer', (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const member = guild.members.cache.get(data.user.id)
      if (!member.voice.channel) {
        socket.emit('errorMessage', 'Please join a vocal channel!')
        return
      }
      const textChannel = client.guilds.cache
        .get(process.env.DEFAULT_GUILD_ID)
        .channels.cache.get(process.env.DEFAULT_TEXTCHANNEL_ID)
      try {
        if (!client.lavaClient.playerCollection.get(guildID)) {
          client.lavaClient.spawnPlayer({
            guild,
            voiceChannel: member.voice.channel,
            textChannel,
            deafen: true,
            trackRepeat: false,
            queueRepeat: false,
            skipOnError: true,
          })
        }
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('pause', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
      }
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        if (player.playPaused === false) {
          await player.pause()
          socket.emit('successMessage', 'The music has been paused.')
          return
        } else {
          await player.resume()
          socket.emit('successMessage', 'The music has been resumed.')
          return
        }
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('loop', (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        if (!player.repeatTrack) {
          player.toggleRepeat('track')
          socket.emit(
            'successMessage',
            `Loop activated, ${player.queue[0].title} music will repeat.`
          )
          return
        } else {
          player.repeatTrack = false
          socket.emit('successMessage', `Loop off.`)
          return
        }
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('stop', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.destroy()
        socket.emit('successMessage', "The bot isn't playing music anymore.")
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('skip', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.stop()
        socket.emit('successMessage', 'The music has been skipped!')
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('seek', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const seekNumber = data.seekNumber
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.seek(seekNumber || 0)
        socket.emit('successMessage', 'Seek !')
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('setVolume', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const volumeNumber = data.volumeNumber
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.setVolume(volumeNumber)
        socket.emit('successMessage', `Volume ${volumeNumber}%`)
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('sendFilters', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const sendData = data.send
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.sendFilters(sendData)
        socket.emit('successMessage', `Filters set!`)
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('queueToPlayer', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const musicNumber = data.musicNumber
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.queue.moveTrack(musicNumber, 1)
        await player.stop()
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('removeMusicQueue', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const musicNumber = data.musicNumber
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        await player.queue.remove(musicNumber)
        socket.emit('successMessage', `Music removed!`)
        return
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('lavaSearch', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const query = data.query
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      } else if (!query) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        const songs = await player.lavaSearch(
          query,
          {
            tag: `${data.user.username}#${data.user.discriminator}`,
          },
          false
        )
        if (songs) {
          socket.emit('searchSongs', songs)
          return
        } else {
          socket.emit('errorMessage', 'No track found.')
          return
        }
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })

    socket.on('addToQueue', async (data) => {
      const user = data.user
      if (!user) {
        socket.emit('errorMessage', 'You are not connected!')
        return
      }
      const guildID = data.guildID
      const uri = data.uri
      if (!guildID) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      } else if (!uri) {
        socket.emit('errorMessage', 'One value is missing.')
        return
      }
      const guild = client.guilds.cache.get(guildID)
      if (!guild) {
        socket.emit('errorMessage', 'The guild does not exist.')
        return
      }
      const player = client.lavaClient.playerCollection.get(guildID)
      if (!player) {
        socket.emit(
          'errorMessage',
          'The bot is not connected to a voiceChannel!'
        )
        return
      }
      try {
        const songs = await player.lavaSearch(
          uri,
          {
            tag: `${data.user.username}#${data.user.discriminator}`,
          },
          true
        )
        if (songs[0].title) {
          if (!player.playing) {
            player.play()
          }
          socket.emit('successMessage', `${songs[0].title} added!`)
          return
        } else {
          socket.emit('errorMessage', 'No track found.')
          return
        }
      } catch (error) {
        if (error) {
          socket.emit('errorMessage', 'An error has occurred.')
        }
      }
    })
  })

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
