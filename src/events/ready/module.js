const moment = require('moment')
const { LavaClient } = require('@anonymousg/lavajs')
const BaseEvent = require('../../utils/structures/BaseEvent')

const nodes = [
  {
    host: process.env.LAVACORD_HOST,
    port: process.env.LAVACORD_PORT,
    password: process.env.LAVACORD_PASSWORD,
  },
]

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready')
  }

  run(client) {
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
            description: `Playing: [${player.queue[0].title}](${player.queue[0].uri}) !`,
            color: 16711717,
            timestamp: new Date(),
            thumbnail: {
              url: player.queue[0].thumbnail.max,
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
    require('../../dashboard/server')(client)
  }
}
