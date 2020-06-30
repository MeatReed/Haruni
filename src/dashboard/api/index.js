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

router.get('/guild/:guildID', (req, res) => {
  const guildID = req.params.guildID
  if (!guildID) {
    return res.status(400).json({
      error: 'One value is missing.',
    })
  }
  const guild = req.client.guilds.cache.get(guildID)
  if (!guild) {
    return res.status(400).json({
      error: 'The guild does not exist.',
    })
  } else {
    return res.json(guild)
  }
})

router.get('/botinfo', (req, res) => {
  if (req.client.user) {
    return res.json({
      user: req.client.user,
      guildCount: req.client.guilds.cache.size,
      avatar: req.client.user.avatarURL({
        format: 'png',
        size: 2048,
      }),
    })
  } else {
    return res.status(400).json({
      error: 'Error',
    })
  }
})

export default {
  path: '/api',
  handler: router,
}
