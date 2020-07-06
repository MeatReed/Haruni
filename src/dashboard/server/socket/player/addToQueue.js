module.exports = (client, socket) => {
  socket.on('addToQueue', async (data) => {
    const user = data.user
    if (!user) {
      socket.emit('errorMessage', 'You are not connected!')
      return
    }
    const guildID = data.guildID
    const uri = data.uri
    if (!guildID) {
      socket.emit('errorMessage', 'One value is missing.')
      return
    } else if (!uri) {
      socket.emit('errorMessage', 'One value is missing.')
      return
    }
    const guild = client.guilds.cache.get(guildID)
    if (!guild) {
      socket.emit('errorMessage', 'The guild does not exist.')
      return
    }
    const member = guild.members.cache.get(data.user.id)
    if (!member) {
      socket.emit('errorMessage', "You're not on this server.")
      return
    }
    if (!member.voice.channel) {
      socket.emit('errorMessage', 'Please join a vocal channel!')
      return
    }
    if (guild.me.voice.channel.id !== member.voice.channel.id) {
      socket.emit(
        'errorMessage',
        "You're not in the same voice channel as bot!"
      )
      return
    }
    const player = client.lavaClient.playerCollection.get(guildID)
    if (!player) {
      socket.emit('errorMessage', 'The bot is not connected to a voiceChannel!')
      return
    }
    try {
      const songs = await player.lavaSearch(
        uri,
        {
          tag: `${data.user.username}#${data.user.discriminator}`,
        },
        {
          source: 'yt',
          add: true,
        }
      )
      if (songs[0].title) {
        if (!player.playing) {
          player.play()
        }
        socket.emit('successMessage', `${songs[0].title} added!`)
        return
      } else {
        socket.emit('errorMessage', 'No track found.')
        return
      }
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
