const os = require('os')
const BaseCommand = require('../../utils/structures/BaseCommand')
const status = {
  online: '<:online:686651497617948721> Online',
  idle: '<:idle:686652885593096305> Idle',
  dnd: '<:dnd:686650899329974336> dnd',
  offline: '<:offline:686652886150676598> invisible',
}

module.exports = class BotInfoCommand extends BaseCommand {
  constructor() {
    super({
      name: 'botinfo',
      description: '',
      category: 'misc',
      usage: 'botinfo',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  run(client, message, args) {
    function convertMS(ms) {
      let d, h, m, s
      s = Math.floor(ms / 1000)
      m = Math.floor(s / 60)
      s = s % 60
      h = Math.floor(m / 60)
      m = m % 60
      d = Math.floor(h / 24)
      h = h % 24
      return {
        d,
        h,
        m,
        s,
      }
    }
    try {
      const ownerUser = client.getOwner()

      const u = convertMS(client.uptime)
      const uptime =
        u.d +
        ' days : ' +
        u.h +
        ' hours : ' +
        u.m +
        ' minutes : ' +
        u.s +
        ' seconds'
      message.channel.send({
        embed: {
          color: 0xB1072E,
          footer: {
            icon_url: message.author.avatarURL({
              format: 'png',
              size: 4096,
            }),
            text: 'Requested by ' + message.author.tag,
          },
          thumbnail: {
            url: client.user.avatarURL(),
          },
          author: {
            name: `${client.user.username} Info`,
          },
          fields: [
            {
              name: 'Name',
              value: `${client.user.username}`,
              inline: true,
            },
            {
              name: 'Id',
              value: `${client.user.id}`,
              inline: true,
            },
            {
              name: 'Library',
              value: 'discord.js',
              inline: true,
            },
            {
              name: 'Status',
              value: `${status[client.user.presence.status]}`,
              inline: true,
            },
            {
              name: 'Creator',
              value: `${ownerUser.tag}(${ownerUser.id})`,
            },
            {
              name: `Guilds`,
              value: `${client.guilds.cache.size}`,
              inline: true,
            },
            {
              name: `Users`,
              value: `${client.users.cache.size}`,
              inline: true,
            },
            {
              name: 'Website',
              value: process.env.BASE_URL,
              inline: true,
            },
            {
              name: 'Paypal',
              value: 'https://paypal.me/MeatRed',
            },
            {
              name: 'Uptime',
              value: `${uptime}`,
            },
            {
              name: 'CPU',
              value: `${os.cpus().map((i) => `${i.model}`)[0]}`,
              inline: true,
            },
            {
              name: 'Arch',
              value: os.arch(),
              inline: true,
            },
            {
              name: 'Platform',
              value: os.platform(),
              inline: true,
            },
          ],
        },
      })
    } catch (error) {
      client.ErrorEmbed(
        message.channel,
        'An error has occurred : \n```JS\n' + error.message + '```'
      )
    }
  }
}
