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
    if (!member) {
      socket.emit('errorMessage', "You're not on this server.")
      return
    }
    if (!member.voice.channel) {
      socket.emit('errorMessage', 'Please join a vocal channel!')
      return
    }
    const textChannel = client.guilds.cache
      .get(process.env.DEFAULT_GUILD_ID)
      .channels.cache.get(process.env.DEFAULT_TEXTCHANNEL_ID)
    try {
      const player = client.lavaClient.spawnPlayer({
        guild,
        voiceChannel: member.voice.channel,
        textChannel,
        deafen: true,
        trackRepeat: false,
        queueRepeat: false,
        skipOnError: true,
      })
      const playerCloned = Object.assign({}, player)
      delete playerCloned.client
      delete playerCloned.node
      delete playerCloned.lavaJS
      socket.emit('sendPlayer/' + player.options.guild.id, playerCloned)
    } catch (error) {
      if (error) {
        socket.emit('errorMessage', 'An error has occurred.')
      }
    }
  })
}
