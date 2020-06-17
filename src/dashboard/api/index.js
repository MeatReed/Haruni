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

export default {
  path: '/api',
  handler: router,
}
