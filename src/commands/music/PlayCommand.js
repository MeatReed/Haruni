const moment = require('moment')
const { MessageCollector } = require('discord.js')
const BaseCommand = require('../../utils/structures/BaseCommand')

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super({
      name: 'play',
      description: '',
      category: 'music',
      usage: 'play {url or name}',
      enabled: true,
      guildOnly: true,
      nsfw: false,
      ownerOnly: false,
      aliases: [],
      userPermissions: [],
      clientPermissions: [],
    })
  }

  async run(client, message, args) {
    const query = args.join(' ')

    if (!message.member.voice.channel) {
      client.InfoEmbed(message.channel, 'Please join a vocal channel!')
      return
    } else if (!query) {
      client.InfoEmbed(
        message.channel,
        'You forgot to put the link or the name of the video!'
      )
      return
    }
    if (!client.lavaClient.playerCollection.get(message.guild.id)) {
      client.lavaClient.spawnPlayer(client.lavaClient, {
        guild: message.guild,
        voiceChannel: message.member.voice.channel,
        textChannel: message.channel,
        deafen: true,
        trackRepeat: false,
        queueRepeat: false,
        skipOnError: true,
      })
      if (!message.guild.me.voice.channel) {
        client.SuccessEmbed(
          message.channel,
          `The bot has successfully joined the vocalchannel **${message.member.voice.channel.toString()}**`
        )
      }
    }
    const player = client.lavaClient.playerCollection.get(message.guild.id)
    const queue = player.queue
    const search = await player.lavaSearch(query, message.author, true)
    if (!search) {
      client.InfoEmbed(message.channel, 'No track found.')
      return
    }
    let song = null
    if (search.tracks) {
      for (let i = 0; i < search.tracks.length; i++) {
        await queue.add(search.tracks[i])
      }
      client.SuccessEmbed(
        message.channel,
        `\`${search.tracks.length}\` musics have been added.`
      )
    } else if (search[0]) {
      let msg = search
        .slice(0, 9)
        .map((s, i) => '**' + (i + 1) + '** - [' + s.title + '](' + s.uri + ')')
        .join('\n')

      msg +=
        '\n\nChoose the music that matches your search or type `cancel` to cancel the search.'

      await message.channel
        .send({
          embed: {
            description: msg,
            color: 16711717,
          },
        })
        .then((m) => {
          const filter = (m) => m.author.id === message.author.id
          const collector = new MessageCollector(message.channel, filter, {
            time: 20000,
          })
          collector.on('collect', (msgCollected) => {
            const choice = msgCollected.content.split(' ')[0]
            if (choice.toLowerCase() === 'cancel') {
              collector.stop('STOPPED')
              return
            }
            if (!choice || isNaN(choice)) {
              client.ErrorEmbed(message.channel, 'Invalid choice!')
              return
            }
            if (choice > search.length || choice <= 0) {
              client.ErrorEmbed(message.channel, 'Invalid choice!')
              return
            }
            song = search[choice - 1]
            collector.stop('PLAY')
            m.delete()
            msgCollected.delete()
            queue.add(song)
            if (!player.playing) {
              player.play()
            }
          })
          collector.on('end', (collected, reason) => {
            if (reason === 'STOPPED') {
              client.SuccesEmbed(message, 'You canceled.')
            } else if (reason === 'PLAY') {
            } else {
              client.ErrorEmbed(message.channel, 'Too long to choose!')
            }
          })
        })
        .catch((err) => {
          if (err) {
            client.ErrorEmbed(
              message.channel,
              'Une erreur est survenue : \n```JS\n' + err.message + '```'
            )
            console.log(err)
          }
        })
    }
    if (!player.playing) {
      player.play()
    } else if (!search.tracks) {
      if (!song) {
        song = search
      }
      const duration = moment.duration({
        ms: search.length,
      })
      message.channel.send({
        embed: {
          description: `Adding music [${search.title}](${search.uri}) !`,
          color: 16711717,
          timestamp: new Date(),
          thumbnail: {
            url: search.thumbnail.standard,
          },
          fields: [
            {
              name: 'Author',
              value: search.author,
            },
            {
              name: 'Requested by',
              value: search.user.tag,
            },
            {
              name: 'Duration',
              value: `${duration.minutes()}:${duration.seconds()}`,
            },
          ],
        },
      })
    }
  }
}
