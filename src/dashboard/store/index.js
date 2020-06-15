export const actions = {
  getPlayer(context, { guildID }) {
    return this.$axios
      .$get(this.$axios.defaults.baseURL + '/api/getPlayer/' + guildID)
      .then((data) => {
        return data
      })
  },
  pause(context, { guildID }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/pause/' + guildID)
      .then((data) => {
        return data
      })
  },
}
