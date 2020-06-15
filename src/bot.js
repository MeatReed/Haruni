require('dotenv').config()
const { Client } = require('discord.js')
const { registerCommands, registerEvents } = require('./utils/registry')
const client = new Client()
const { LavaClient } = require('@anonymousg/lavajs')
const moment = require('moment')

const nodes = [
  {
    host: process.env.LAVACORD_HOST,
    port: process.env.LAVACORD_PORT,
    password: process.env.LAVACORD_PASSWORD,
  },
]

;(async () => {
  setTimeout(() => {
    client.lavaClient = new LavaClient(client, nodes)
      .on('queueOver', (player) => {
        client.InfoEmbed(
          player.options.textChannel,
          'No more music in the queue.'
        )
        player.destroy()
      })
      .on('trackPlay', (track, player) => {
        const duration = moment.duration({
          ms: player.queue[0].length,
        })
        player.options.textChannel.send({
          embed: {
            description: `Playing : [${player.queue[0].title}](${player.queue[0].uri}) !`,
            color: 16711717,
            timestamp: new Date(),
            thumbnail: {
              url: player.queue[0].thumbnail.standard,
            },
            fields: [
              {
                name: 'Author',
                value: player.queue[0].author,
              },
              {
                name: 'Requested by',
                value: player.queue[0].user.tag,
              },
              {
                name: 'Loop',
                value: player.repeatTrack ? 'Activated' : 'Disabled',
              },
              {
                name: 'Duration',
                value: `${duration.minutes()}:${duration.seconds()}`,
              },
            ],
          },
        })
      })
    console.log('Lavalink connected!')
  }, 10000)
  client.commands = new Map()
  client.aliases = new Map()
  client.events = new Map()
  client.prefix = process.env.DISCORD_BOT_PREFIX
  client.ownerID = process.env.DISCORD_BOT_OWNER
  require('./utils/messages')(client)
  require('./dashboard/server')(client)
  await registerCommands(client, '../commands')
  await registerEvents(client, '../events')
  await client.login(process.env.DISCORD_BOT_TOKEN)
})()
