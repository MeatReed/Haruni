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
}
