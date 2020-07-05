const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class ReplayCommand extends BaseCommand {
  constructor() {
    super({
      name: 'replay',
      description: '',
      category: 'music',
      usage: 'replay',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  async run(client, message, args) {
    if (!message.member.voice.channel) {
      client.InfoEmbed(message.channel, 'Please join a vocal channel!')
      return
    }
    const player = client.lavaClient.playerCollection.get(message.guild.id)
    if (!player || !player.playing || !player.queue[0]) {
      client.InfoEmbed(message.channel, "The bot doesn't currently play music.")
      return
    }
    if (message.guild.me.voice.channel.id !== message.member.voice.channel.id) {
      client.InfoEmbed(
        message.channel,
        "You're not in the same voice channel as bot!"
      )
      return
    }
    try {
      if (player.repeatTrack) {
        await player.stop()
      } else {
        player.repeatTrack = true
        await player.stop()
        setTimeout(() => {
          player.repeatTrack = false
        }, 1000)
      }
    } catch (error) {
      if (error) {
        client.ErrorEmbed(
          message.channel,
          'An error has occurred : \n```JS\n' + error.message + '```'
        )
      }
    }
  }
}
