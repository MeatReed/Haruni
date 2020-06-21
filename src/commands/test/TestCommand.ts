import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'test', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
  }
}