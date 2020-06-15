module.exports = class BaseCommand {
  constructor({
    name = null,
    description = 'Aucune description détectée.',
    category = null,
    usage = 'Aucune utilisation détectée.',
    enabled = true,
    guildOnly = false,
    nsfw = false,
    ownerOnly = false,
    aliases = new Array(),
    userPermissions = new Array(),
    clientPermissions = new Array(),
  }) {
    this.name = name
    this.description = description
    this.category = category
    this.usage = usage
    this.enabled = enabled
    this.guildOnly = guildOnly
    this.nsfw = nsfw
    this.ownerOnly = ownerOnly
    this.aliases = aliases
    this.userPermissions = userPermissions
    this.clientPermissions = clientPermissions
  }
}
