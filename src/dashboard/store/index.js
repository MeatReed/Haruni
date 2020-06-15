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
  loop(context, { guildID }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/loop/' + guildID)
      .then((data) => {
        return data
      })
  },
  stop(context, { guildID }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/stop/' + guildID)
      .then((data) => {
        return data
      })
  },
  skip(context, { guildID }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/skip/' + guildID)
      .then((data) => {
        return data
      })
  },
  seek(context, { guildID, seek }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/seek/' + guildID + '/' + seek)
      .then((data) => {
        return data
      })
  },
  setVolume(context, { guildID, volume }) {
    return this.$axios
      .$post(
        this.$axios.defaults.baseURL +
          '/api/setVolume/' +
          guildID +
          '/' +
          volume
      )
      .then((data) => {
        return data
      })
  },
}
