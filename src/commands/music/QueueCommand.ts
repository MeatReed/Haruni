import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Track } from '../../utils/modules/lavajs/src/index';
import { FieldsEmbed } from 'discord-paginationembed'
import { Player } from '../../utils/modules/lavajs/src/index';

export default class QueueCommand extends BaseCommand {
  constructor() {
    super('queue', 'music', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!message.member.voice.channel) {
      client.InfoEmbed(message.channel, 'Please join a vocal channel!')
      return
    }
    const player:Player = client.LavaClient.playerCollection.get(message.guild.id)
    if (!player || !player.queue.first) {
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
    const nowplaying:Track = player.queue.first
    const songs:Array<Track> = player.queue.toArray().slice(1)
    if (songs[0]) {
      const FieldsEmbedMessage = new FieldsEmbed<Track>()
        .setArray(songs)
        .setChannel(message.channel)
        .setElementsPerPage(5)
        .setPageIndicator('footer', (page, pages) => `Page ${page} / ${pages}`)
        .formatField(
          `# - Queue`,
          (element) => `**[${element.title}](${element.uri})**`
        )
        FieldsEmbedMessage.embed
        .setColor(16711717)
        .setDescription(`**Playing: [${nowplaying.title}](${nowplaying.uri})**`)
        .setFooter(
          'Requested by ' + message.author.tag,
          message.author.avatarURL()
        )
        FieldsEmbedMessage.build()
    } else {
      const Embed = new MessageEmbed()
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