const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super({
      name: 'invite',
      description: '',
      category: 'misc',
      usage: 'invite',
      enabled: true,
      guildOnly: false,
      nsfw: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  run(client, message, args) {
    client.InfoEmbed(
      message.channel,
      'Invitation link: https://discord.com/api/oauth2/authorize?client_id=722181826545713313&permissions=1609887095&scope=bot'
    )
  }
}
