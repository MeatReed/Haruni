const moment = require('moment')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class NowPlayingCommand extends BaseCommand {
  constructor() {
    super({
      name: 'nowplaying',
      description: '',
      category: 'music',
      usage: 'nowplaying',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: ['np'],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  run(client, message, args) {
    if (!message.member.voice.channel) {
      client.InfoEmbed(message.channel, 'Please join a vocal channel!')
      return
    }
    const player = client.lavaClient.playerCollection.get(message.guild.id)
    if (!player) {
      client.InfoEmbed(message.channel, "The bot doesn't currently play music.")
      return
    }
    if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) {
      client.InfoEmbed(
        message.channel,
        "You're not in the same vocalchannel as bot!"
      )
      return
    }
    const duration = moment.duration({
      ms: player.queue[0].length,
    })
    const progression = moment.duration({ ms: player.position * 1000 })
    const progressBar = [
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
      '▬',
    ]
    const calcul = Math.round(
      progressBar.length * (progression / 1000 / 1000 / (duration / 1000))
    )
    progressBar[calcul] = '||/||'
    message.channel.send({
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
            value: `\`[${moment(progression / 1000).minutes()}:${moment(
              progression / 1000
            ).seconds()}]\` ${progressBar.join(
              ''
            )} \`[${duration.minutes()}:${duration.seconds()}]\``,
          },
        ],
      },
    })
  }
}
