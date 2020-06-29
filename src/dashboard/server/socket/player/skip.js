module.exports = (client, socket) => {
  socket.on('skip', async (data) => {
    const user = data.user
    if (!user) {
      socket.emit('errorMessage', 'You are not connected!')
      return
    }
    const guildID = data.guildID
    if (!guildID) {
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
      await player.stop()
      socket.emit('successMessage', 'The music has been skipped!')
      return
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
