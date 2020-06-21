import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import lavajs from '../../utils/modules/lavajs/src';

interface NodeOptions {
  host: string;
  port: number;
  password: string;
}

let nodes: NodeOptions[] = [
  {
    host: process.env.LAVACORD_HOST,
    port: parseInt(process.env.LAVACORD_PORT),
    password: process.env.LAVACORD_PASSWORD,
  }
]

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client: DiscordClient) {
    client.LavaClient = new lavajs.LavaClient(client, nodes);
  }
}