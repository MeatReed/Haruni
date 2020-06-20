const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class VolumeCommand extends BaseCommand {
  constructor() {
    super({
      name: 'volume',
      description: '',
      category: 'music',
      usage: 'volume',
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
    const volume = parseInt(args[0])
    if (!message.member.voice.channel) {
      client.InfoEmbed(message.channel, 'Please join a vocal channel!')
      return
    }
    const player = client.lavaClient.playerCollection.get(message.guild.id)
    if (!player || !player.queue[0]) {
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
    if (!volume) {
      client.InfoEmbed(
        message.channel,
        `Volume is currently at ${player.volume}%`
      )
      return
    } else if (volume < 0 || volume > 100) {
      client.InfoEmbed(message.channel, 'Volume must be in between 0 and 100')
      return
    }
    try {
      player.setVolume(volume)
      client.SuccessEmbed(message.channel, `Volume at ${volume}%`)
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
