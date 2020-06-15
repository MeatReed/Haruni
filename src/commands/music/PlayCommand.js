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
      client.InfoEmbed(channel, 'Please join a vocal channel!')
      return
    } else if (!query) {
      client.InfoEmbed(
        channel,
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
    let queue = player.queue
    const search = await player.lavaSearch(query, message.author, true)
    if (!search) {
      client.InfoEmbed(message.channel, 'No track found.')
      return
    }
    if (search.tracks) {
      for (let i = 0; i < search.tracks.length; i++) {
        await queue.add(search.tracks[i])
      }
      client.SuccessEmbed(
        message.channel,
        `\`${search.tracks.length}\` musics have been added.`
      )
    }
    if (!player.playing) {
      player.play()
    }
  }
}
