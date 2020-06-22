import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Track, Utils, Player } from '../../utils/modules/lavajs/src/index';

export default class NowPlayingCommand extends BaseCommand {
  constructor() {
    super('nowplaying', 'music', ['np']);
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
    const song:Track = player.queue.first
    const progressBar:Array<string> = [
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
    const calcul:number = Math.round(
      progressBar.length * ((player.position * 1000) / 1000 / 1000 / ((player.position * 1000) / 1000))
    )
    progressBar[calcul] = '||/||'
    message.channel.send({
      embed: {
        description: `Playing : [${song.title}](${song.uri}) !`,
        color: 16711717,
        timestamp: new Date(),
        thumbnail: {
          url: song.thumbnail.standard,
        },
        fields: [
          {
            name: 'Author',
            value: song.author,
          },
          {
            name: 'Requested by',
            value: song.user.tag,
          },
          {
            name: 'Loop',
            value: player.repeatTrack ? 'Activated' : 'Disabled',
          },
          {
            name: 'Duration',
            value: `\`[${Utils.formatTime(player.position)}]\` ${progressBar.join(
              ''
            )} \`[${Utils.formatTime(song.length)}]\``,
          },
        ],
      },
    })
  }
}