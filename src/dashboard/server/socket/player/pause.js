module.exports = (client, socket) => {
  socket.on('pause', async (data) => {
    const user = data.user
    if (!user) {
      socket.emit('errorMessage', 'You are not connected!')
    }
    const guildID = data.guildID
    if (!guildID) {
      socket.emit('errorMessage', 'One value is missing.')
    }
    const guild = client.guilds.cache.get(guildID)
    if (!guild) {
      socket.emit('errorMessage', 'The guild does not exist.')
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
      if (player.playPaused === false) {
        await player.pause()
        socket.emit('successMessage', 'The music has been paused.')
        return
      } else {
        await player.resume()
        socket.emit('successMessage', 'The music has been resumed.')
        return
      }
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
