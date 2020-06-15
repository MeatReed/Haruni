const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class CommandMessageEvent extends BaseEvent {
  constructor() {
    super('message')
  }

  run(client, message) {
    if (message.author.bot) return
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/)
      const command =
        client.commands.get(cmdName) || client.aliases.get(cmdName)
      if (command) {
        if (command.enabled === false) {
          message.channel.send('This command has been temporarily disabled!')
        } else if (command.guildOnly && message.channel.type === 'dm') {
          message.channel.send('This command is only available for servers!')
        } else if (
          command.nsfw &&
          message.channel.nsfw === false &&
          message.channel.type === 'text'
        ) {
          message.channel.send(
            'To perform this command, the NSFW must be activated!'
          )
        } else if (!message.guild.me.hasPermission(command.clientPermissions)) {
          message.channel.send(
            `To perform this command, the bot must obtain the permission(s) : \`${command.clientPermissions.join(
              ' '
            )}\``
          )
        } else if (!message.member.hasPermission(command.userPermissions)) {
          message.channel.send(
            `To perform this command, you must obtain the permission(s) : \`${command.userPermissions.join(
              ' '
            )}\``
          )
        } else if (command.ownerOnly && message.author.id !== client.ownerID) {
          message.channel.send(
            'Only the creator of the bot has the right to execute this command.'
          )
        } else {
          command.run(client, message, cmdArgs, command)
        }
      }
    }
  }
}
