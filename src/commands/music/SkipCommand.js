const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super({
      name: 'skip',
      description: '',
      category: 'music',
      usage: 'skip',
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
      player.stop()
      client.SuccessEmbed(message.channel, 'The music has been skipped!')
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
