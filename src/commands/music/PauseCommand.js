const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class PauseCommand extends BaseCommand {
  constructor() {
    super({
      name: 'pause',
      description: '',
      category: 'music',
      usage: 'pause',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: [],
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
    try {
      if (player.playPaused === false) {
        player.pause()
        client.SuccessEmbed(message.channel, 'The music has been paused.')
      } else {
        client.ErrorEmbed(message.channel, 'The music is already being paused!')
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
