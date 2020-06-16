import express from 'express'

const router = express.Router()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/getPlayer/:guildID', (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  const playerCloned = Object.assign({}, player)
  delete playerCloned.client
  delete playerCloned.node
  delete playerCloned.lavaJS
  return res.json(playerCloned)
})

router.post('/pause/:guildID', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    if (player.playPaused === false) {
      await player.pause()
      return res.json(player.playPaused)
    } else {
      await player.resume()
      return res.json(player.playPaused)
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/loop/:guildID', isConnected, (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    if (player.repeatTrack === false) {
      player.repeatTrack = true
      return res.json(player.repeatTrack)
    } else {
      player.repeatTrack = false
      return res.json(player.repeatTrack)
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/stop/:guildID', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    await player.destroy()
    return res.json(player.playState)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/skip/:guildID', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    await player.stop()
    return res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/seek/:guildID/:seek', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const seek = parseInt(req.params.seek)
  if (!guildID && !seek) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    await player.seek(seek)
    return res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/setVolume/:guildID/:volume', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const volume = parseInt(req.params.volume)
  if (!guildID && !volume) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    await player.setVolume(volume)
    return res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/connect/:guildID', isConnected, (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const member = guild.members.cache.get(req.user.id)
  if (!member.voice.channel) {
    return res.status(400).json({
      error: 'Please join a vocal channel!',
    })
  }
  const textChannel = guild.channels.cache.get(
    process.env.DEFAULT_TEXTCHANNEL_ID
  )
  if (!client.lavaClient.playerCollection.get(guildID)) {
    client.lavaClient.spawnPlayer(client.lavaClient, {
      guild: guildID,
      voiceChannel: member.voice.channel,
      textChannel,
      deafen: true,
      trackRepeat: false,
      queueRepeat: false,
      skipOnError: true,
    })
    return res.json(client.lavaClient.playerCollection.get(guildID))
  } else {
    return res.status(400).json({
      error: 'The bot is already connected!',
    })
  }
})

router.post('/lavaSearch/:guildID', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const query = req.body.query
  if (!guildID && !query) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  try {
    const songs = await player.lavaSearch(
      query,
      {
        tag: `${req.user.username}#${req.user.discriminator}`,
      },
      false
    )
    if (songs) {
      return res.json(songs)
    } else {
      return res.json({
        msg: 'No track found.',
      })
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/addToQueue/:guildID', isConnected, async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const url = req.body.url
  if (!guildID && !url) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  }
  const member = guild.members.cache.get(req.user.id)
  if (!member.voice.channel) {
    return res.status(400).json({
      error: 'Please join a vocal channel!',
    })
  }
  const player = client.lavaClient.playerCollection.get(guildID)
  if (!player) {
    return res.status(400).json({
      error: "The bot doesn't currently play music.",
    })
  }
  try {
    const songs = await player.lavaSearch(
      url,
      {
        tag: `${req.user.username}#${req.user.discriminator}`,
      },
      true
    )
    if (songs) {
      if (!player.playing) {
        player.play()
      }
      return res.json(songs)
    } else {
      return res.json({
        msg: 'No track found.',
      })
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

function isConnected(req, res, next) {
  const user = req.user
  if (!user) {
    return res.status(400).json({
      error: 'Not connected!',
    })
  }
  next()
}

export default {
  path: '/api',
  handler: router,
}
