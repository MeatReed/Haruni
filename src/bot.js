require('dotenv').config()
const { Client } = require('discord.js')
const { registerCommands, registerEvents } = require('./utils/registry')
const client = new Client()

;(async () => {
  client.commands = new Map()
  client.aliases = new Map()
  client.events = new Map()
  client.prefix = process.env.DISCORD_BOT_PREFIX
  client.ownerID = process.env.DISCORD_BOT_OWNER
  require('./utils/messages')(client)
  require('./utils/functions')(client)
  await registerCommands(client, '../commands')
  await registerEvents(client, '../events')
  await client.login(process.env.DISCORD_BOT_TOKEN)
})()
