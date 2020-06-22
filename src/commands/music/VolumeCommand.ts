import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { Player } from '../../utils/modules/lavajs/src/index';

export default class VolumeCommand extends BaseCommand {
  constructor() {
    super('volume', 'music', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const volume:number = parseInt(args[0])
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
    if (!volume) {
      if (volume === 0) {
        player.setVolume(volume)
        client.SuccessEmbed(message.channel, `Volume at ${volume}%`)
        return
      }
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