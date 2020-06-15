require('dotenv').config()

module.exports = (client) => {
  client.getOwner = () => {
    return client.users.cache.get(process.env.DISCORD_BOT_OWNER)
  }
}
