import { Client, ClientOptions, Collection, Message } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';

export default class DiscordClient extends Client {

  private _commands = new Collection<string, BaseCommand>();
  private _aliases = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  
  // LavaClient
  private _LavaClient: any;
  private _lavaJS: any;

  // Messages
  InfoEmbed: ((channel: any, message: string) => Message) | undefined;
  SuccessEmbed: ((channel: any, message: string) => Message) | undefined;
  ErrorEmbed: ((channel: any, message: string) => Message) | undefined;

  constructor(options?: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> { return this._commands; }
  get aliases(): Collection<string, BaseCommand> { return this._aliases; }
  get events(): Collection<string, BaseEvent> { return this._events; }
  get prefix(): string { return this._prefix; }

  // LavaClient
  get LavaClient(): any { return this._LavaClient; }
  get lavaJS(): any { return this._lavaJS; }

  set prefix(prefix: string) { this._prefix = prefix; }

  // LavaClient
  set LavaClient(LavaClient: any) { this._LavaClient = LavaClient; }
  set lavaJS(lavaJS: any) { this._lavaJS = lavaJS; }


}
