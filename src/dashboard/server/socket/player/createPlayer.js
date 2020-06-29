module.exports = (client, socket) => {
  client.lavaClient.on('createPlayer', (player) => {
    const playerCloned = Object.assign({}, player)
    delete playerCloned.client
    delete playerCloned.node
    delete playerCloned.lavaJS
    socket.emit('createPlayer/' + player.options.guild.id, playerCloned)
  })
}
