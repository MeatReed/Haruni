const Discord = require('discord.js')
const Pagination = require('discord-paginationembed')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class QueueCommand extends BaseCommand {
  constructor() {
    super({
      name: 'queue',
      description: '',
      category: 'music',
      usage: 'queue',
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
    const nowplaying = player.queue[0]
    const songs = player.queue.slice(1)
    if (songs[0]) {
      const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(songs)
        .setChannel(message.channel)
        .setElementsPerPage(5)
        .setPageIndicator('footer', (page, pages) => `Page ${page} / ${pages}`)
        .formatField(
          `# - Queue`,
          (el, i) => `${i + 1} - **[${el.title}](${el.uri})**`
        )
      FieldsEmbed.embed
        .setColor(16711717)
        .setDescription(`**Playing: [${nowplaying.title}](${nowplaying.uri})**`)
        .setFooter(
          'Requested by ' + message.author.tag,
          message.author.avatarURL()
        )
      FieldsEmbed.build()
    } else {
      const Embed = new Discord.MessageEmbed()
        .setColor(16711717)
        .setDescription(`**Playing: [${nowplaying.title}](${nowplaying.uri})**`)
        .setFooter(
          'Requested by ' + message.author.tag,
          message.author.avatarURL()
        )
      message.channel.send(Embed)
    }
  }
}
