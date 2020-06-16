export const state = () => {
  return {
    user: null,
    token: null,
  }
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
  },
  LOGOUT(state) {
    state.user = null
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      commit('SET_USER_DATA', req.user)
    }
  },
  logout({ commit }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/logout')
      .then((data) => {
        commit('LOGOUT')
      })
  },
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
  connect(context, { guildID }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/connect/' + guildID)
      .then((data) => {
        return data
      })
  },
  lavaSearch(context, { guildID, query }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/lavaSearch/' + guildID, {
        query,
      })
      .then((data) => {
        return data
      })
  },
  addToQueue(context, { guildID, url }) {
    return this.$axios
      .$post(this.$axios.defaults.baseURL + '/api/addToQueue/' + guildID, {
        url,
      })
      .then((data) => {
        return data
      })
  },
}
