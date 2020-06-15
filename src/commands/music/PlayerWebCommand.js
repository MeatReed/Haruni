const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class PlayerWebCommand extends BaseCommand {
  constructor() {
    super({
      name: 'playerweb',
      description: '',
      category: 'music',
      usage: 'playerweb',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  run(client, message, args) {
    message.reply(`${process.env.BASE_URL}/player/${message.guild.id}`)
  }
}
