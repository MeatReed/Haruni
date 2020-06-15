const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class LoopQueueCommand extends BaseCommand {
  constructor() {
    super({
      name: 'loopqueue',
      description: '',
      category: 'music',
      usage: 'loopqueue',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: ['repeatqueue'],
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
    if (!player.repeatQueue) {
      player.repeatQueue = true
      client.SuccessEmbed(message.channel, `Loop Queue activated.`)
    } else {
      player.repeatQueue = false
      client.SuccessEmbed(message.channel, `Loop Queue off.`)
    }
  }
}
