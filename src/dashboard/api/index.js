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
      error: 'No id',
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
  res.json(playerCloned)
})

router.post('/pause/:guildID', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'No id',
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
      res.json(player.playPaused)
    } else {
      await player.resume()
      res.json(player.playPaused)
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/loop/:guildID', (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'No id',
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
      res.json(player.repeatTrack)
    } else {
      player.repeatTrack = false
      res.json(player.repeatTrack)
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/stop/:guildID', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'No id',
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
    res.json(player.playState)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/skip/:guildID', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'No id',
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
    res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/seek/:guildID/:seek', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const seek = parseInt(req.params.seek)
  if (!guildID && !seek) {
    return res.status(400).json({
      error: 'No id',
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
    res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/setVolume/:guildID/:volume', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const volume = parseInt(req.params.volume)
  if (!guildID && !volume) {
    return res.status(400).json({
      error: 'No id',
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
    res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

router.post('/removeQueue/:guildID/:songNumber', async (req, res) => {
  const client = req.client
  const guildID = req.params.guildID
  const volume = parseInt(req.params.volume)
  if (!guildID && !volume) {
    return res.status(400).json({
      error: 'No id',
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
    res.json(true)
  } catch (error) {
    if (error) {
      return res.status(400).json({
        error: 'An error has occurred.',
      })
    }
  }
})

export default {
  path: '/api',
  handler: router,
}
