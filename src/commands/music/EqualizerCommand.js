const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class EqualizerCommand extends BaseCommand {
  constructor() {
    super({
      name: 'equalizer',
      description: '',
      category: 'music',
      usage: 'equalizer',
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
    client.InfoEmbed(
      message.channel,
      'Setting up the equalizer on the website. `m!playerweb`'
    )
  }
}
