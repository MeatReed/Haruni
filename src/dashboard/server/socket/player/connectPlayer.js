module.exports = (client, socket) => {
  socket.on('connectPlayer', (data) => {
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
    const member = guild.members.cache.get(data.user.id)
    if (!member.voice.channel) {
      socket.emit('errorMessage', 'Please join a vocal channel!')
      return
    }
    const textChannel = client.guilds.cache
      .get(process.env.DEFAULT_GUILD_ID)
      .channels.cache.get(process.env.DEFAULT_TEXTCHANNEL_ID)
    try {
      if (!client.lavaClient.playerCollection.get(guildID)) {
        client.lavaClient.spawnPlayer({
          guild,
          voiceChannel: member.voice.channel,
          textChannel,
          deafen: true,
          trackRepeat: false,
          queueRepeat: false,
          skipOnError: true,
        })
      }
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
