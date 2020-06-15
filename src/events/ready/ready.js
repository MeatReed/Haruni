const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready')
  }
  run(client) {
    console.log(client.user.tag + ' has logged in.')
  }
}
