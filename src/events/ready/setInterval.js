const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready')
  }

  run(client) {
    setInterval(function () {
      client.user.setActivity('Bot Online', {
        type: 'LISTENING',
      })
    }, 900000)
  }
}
