module.exports = (client, socket) => {
  client.lavaClient.on('destroyPlayer', (player) => {
    socket.emit('destroyPlayer/' + player.options.guild.id)
  })
}
