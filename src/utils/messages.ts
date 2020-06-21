
import { Channel } from 'discord.js';
import DiscordClient from '../client/client';

export = (client: DiscordClient) => {
  client.InfoEmbed = (channel: any, message: string) => {
    return channel.send({
      embed: {
        description: message,
        color: '#2196f3',
      },
    })
  }
  client.SuccessEmbed = (channel: any, message: string) => {
    return channel.send({
      embed: {
        description: message,
        color: 65349,
      },
    })
  }
  client.ErrorEmbed = (channel: any, message: string) => {
    return channel.send({
      embed: {
        description: message,
        color: 16711717,
      },
    })
  }
}
