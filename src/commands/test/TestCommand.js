const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      description: '',
      category: 'test',
      usage: '',
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
    try {
      const codein = args.join(' ')
      // eslint-disable-next-line no-eval
      let code = eval(codein)

      if (typeof code !== 'string')
        code = require('util').inspect(code, {
          depth: 0,
        })
      message.channel.send('Reçu' + `\`\`\`js\n${codein}\`\`\``).then((msg) => {
        message.channel.send('Réponse' + `\`\`\`js\n${code}\n\`\`\``)
      })
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
    }
  }
}
