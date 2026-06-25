const state = {
  value: 0
}

const getters = {
  doubleValue: state => state.value * 2
}

const mutations = {
  increment(state) {
    state.value += 1
  },
  decrement(state) {
    state.value -= 1
  }
}

const actions = {
  increment({ commit }) {
    commit('increment')
  },
  decrement({ commit }) {
    commit('decrement')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
