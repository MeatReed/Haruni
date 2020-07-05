module.exports = (client, socket) => {
  socket.on('lavaSearch', async (data) => {
    const user = data.user
    if (!user) {
      socket.emit('errorMessage', 'You are not connected!')
      return
    }
    const guildID = data.guildID
    const query = data.query
    if (!guildID) {
      socket.emit('errorMessage', 'One value is missing.')
      return
    } else if (!query) {
      socket.emit('errorMessage', 'One value is missing.')
      return
    }
    const guild = client.guilds.cache.get(guildID)
    if (!guild) {
      socket.emit('errorMessage', 'The guild does not exist.')
      return
    }
    const player = client.lavaClient.playerCollection.get(guildID)
    if (!player) {
      socket.emit('errorMessage', 'The bot is not connected to a voiceChannel!')
      return
    }
    try {
      const songs = await player.lavaSearch(
        query,
        {
          tag: `${data.user.username}#${data.user.discriminator}`,
        },
        {
          source: 'yt',
          add: false,
        }
      )
      if (songs) {
        socket.emit('searchSongs', songs)
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
