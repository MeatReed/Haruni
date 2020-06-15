require('dotenv').config()
const { Client, Message } = require('discord.js')
const { registerCommands, registerEvents } = require('./utils/registry')
const client = new Client()
const { LavaClient } = require('@anonymousg/lavajs')

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
        const guild = client.guilds.cache.get(player.options.guild.id)
        const channel = guild.channels.cache.get(player.options.textChannel.id)
        client.InfoEmbed(channel, 'No more music in the queue.')
        player.destroy()
      })
      .on('trackOver', (player) => {
        console.log('trackOver')
      })
      .on('trackPlay', (track, player) => {
        player.playing = true
        const guild = client.guilds.cache.get(player.options.guild.id)
        const channel = guild.channels.cache.get(player.options.textChannel.id)
        channel.send({
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
  await registerCommands(client, '../commands')
  await registerEvents(client, '../events')
  await client.login(process.env.DISCORD_BOT_TOKEN)
})()
