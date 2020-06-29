module.exports = (client, socket) => {
  socket.on('getPlayer', (data) => {
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
      socket.emit('sendPlayer', null)
      socket.emit('errorMessage', 'The bot is not connected to a voiceChannel!')
      return
    }
    const playerCloned = Object.assign({}, player)
    delete playerCloned.client
    delete playerCloned.node
    delete playerCloned.lavaJS
    socket.emit('sendPlayer/' + guildID, playerCloned)
  })
}
