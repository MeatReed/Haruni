module.exports = (client, socket) => {
  socket.on('loop', (data) => {
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
      if (!player.repeatTrack) {
        player.toggleRepeat('track')
        socket.emit(
          'successMessage',
          `Loop activated, ${player.queue[0].title} music will repeat.`
        )
        return
      } else {
        player.repeatTrack = false
        socket.emit('successMessage', `Loop off.`)
        return
      }
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
