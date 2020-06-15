module.exports = (client) => {
  client.InfoEmbed = (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: '#2196f3',
      },
    })
  }

  client.SuccessEmbed = (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: 65349,
      },
    })
  }

  client.ErrorEmbed = (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: 16711717,
      },
    })
  }
}
