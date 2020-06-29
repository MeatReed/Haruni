const path = require('path')
const fs = require('fs').promises

module.exports = (client, io) => {
  io.on('connection', async (socket) => {
    const filePath = path.join(__dirname, './player')
    const files = await fs.readdir(filePath)
    for (const file of files) {
      if (file.endsWith('.js')) {
        require(path.join(filePath, file))(client, socket)
      }
    }
  })
}
