const Discord = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super({
      name: 'help',
      description: '',
      category: 'misc',
      usage: 'help {commande}',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  run(client, message, args) {
    try {
      const ownerUser = client.getOwner()
      if (!args[0]) {
        const output = `Use \`${client.prefix}help {command name's}\` for more details.\n[] = Required\n{} = Not Required\n\n`

        const Embed = new Discord.MessageEmbed()
          .setColor('0xb1072e')
          .setTitle('List of commands')
          .setDescription(output)
          .setThumbnail(client.user.avatarURL())
          .setAuthor(
            `${ownerUser.tag}`,
            ownerUser.avatarURL() || ownerUser.defaultAvatarURL
          )
          .setTimestamp()
          .setFooter(
            'Requested by ' + message.author.tag,
            message.author.avatarURL
          )

        const help = {}

        client.commands.forEach((command) => {
          const cat = command.category

          if (cat === 'dev') return

          if (!help.hasOwnProperty(cat)) help[cat] = []

          help[cat].push(command)
        })

        for (const category in help) {
          const categoryEmbed = category

          let cmd = ''

          for (const command of help[category]) {
            cmd += '`' + client.prefix + command.name + '`, '
          }

          Embed.addField(categoryEmbed, cmd)
        }

        Embed.addField(
          'Useful links',
          '[Invitation](https://discord.com/api/oauth2/authorize?client_id=722181826545713313&permissions=1609887095&scope=bot)'
        )

        message.channel.send(Embed)
      } else {
        let command = args[0]

        if (client.commands.has(command)) {
          command = client.commands.get(command)
          const EmbedHelp = new Discord.MessageEmbed()
            .setColor('0xb1072e')
            .setTitle('How to use the command ' + command.name + ' ?')
            .setThumbnail(client.user.avatarURL())
            .setAuthor(
              `${ownerUser.tag}`,
              ownerUser.avatarURL() || ownerUser.defaultAvatarURL
            )
            .setTimestamp()
            .setFooter(
              'Requested by ' + message.author.tag,
              message.author.avatarURL
            )
            .addField(
              'Description :',
              command.description || 'Does not have a description.'
            )
            .addField('Usage :', client.prefix + command.usage)
            .addField(
              'Aliases :',
              command.aliases[0]
                ? client.prefix + command.aliases.join(', ')
                : "Doesn't have an aliases."
            )
          message.channel.send(EmbedHelp)
        }
      }
    } catch (error) {
      client.ErrorEmbed(
        message.channel,
        'An error has occurred : \n```JS\n' + error.message + '```'
      )
    }
  }
}
