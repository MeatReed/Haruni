import { LavaClient, NodeOptions } from './modules/lavajs/src';
import DiscordClient from '../client/client';

export default class lavaJS {

  public readonly client: DiscordClient;
  public readonly nodes: NodeOptions[];

  constructor (client: DiscordClient, nodes: Array<NodeOptions>) {
    this.client = client
    this.nodes = nodes
  }

  start() {
    this.client.LavaClient = new LavaClient(this.client, this.nodes);
  }
}