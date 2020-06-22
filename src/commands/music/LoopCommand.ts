import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Player } from '../../utils/modules/lavajs/src/index';

export default class LoopCommand extends BaseCommand {
  constructor() {
    super('loop', 'music', ['boucle']);
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
    if (!player.repeatTrack) {
      player.repeatTrack = true
      client.SuccessEmbed(
        message.channel,
        `Loop activated, \`${player.queue.first.title}\` music will repeat.`
      )
    } else {
      player.repeatTrack = false
      client.SuccessEmbed(message.channel, `Loop off.`)
    }
  }
}