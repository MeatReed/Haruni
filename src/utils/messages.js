module.exports = (client) => {
  client.InfoEmbed = async (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: '#2196f3',
      },
    })
  }

  client.SuccessEmbed = async (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: 65349,
      },
    })
  }

  client.ErrorEmbed = async (channel, msg) => {
    return channel.send({
      embed: {
        description: msg,
        color: 16711717,
      },
    })
  }
}
