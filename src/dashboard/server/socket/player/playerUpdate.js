module.exports = (client, socket) => {
  client.lavaClient.on('playerUpdate', (player) => {
    const playerCloned = Object.assign({}, player)
    delete playerCloned.client
    delete playerCloned.node
    delete playerCloned.lavaJS
    socket.emit('sendPlayer/' + player.options.guild.id, playerCloned)
  })
}
