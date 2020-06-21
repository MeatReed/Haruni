import { config } from 'dotenv';
config();
import { registerCommands, registerEvents } from './utils/registry';
import DiscordClient from './client/client';
const client = new DiscordClient({});

import messages from './utils/messages';
import { NodeOptions } from './utils/modules/lavajs/src'
import lavaJS from './utils/lavaJS'

let nodes: NodeOptions[] = [
  {
    host: process.env.LAVACORD_HOST || 'localhost',
    port: parseInt(process.env.LAVACORD_PORT || '2333'),
    password: process.env.LAVACORD_PASSWORD || '123',
  }
];

(async () => {
  client.prefix = process.env.DISCORD_BOT_PREFIX || client.prefix;
  messages(client);
  client.lavaJS = new lavaJS(client, nodes)
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
