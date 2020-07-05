const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class LoopCommand extends BaseCommand {
  constructor() {
    super({
      name: 'loop',
      description: '',
      category: 'music',
      usage: 'loop',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: ['repeat'],
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
    if (!player.repeatTrack) {
      player.repeatTrack = true
      client.SuccessEmbed(
        message.channel,
        `Loop activated, \`${player.queue[0].title}\` music will repeat.`
      )
    } else {
      player.repeatTrack = false
      client.SuccessEmbed(message.channel, `Loop off.`)
    }
  }
}
