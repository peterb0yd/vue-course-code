const state = {
  counter: 1,
  value: 0
};


const getters = {
  value: state => {
    return state.value;
  }
};


// Synchronous tasks
const mutations = {
  updateValue: (state, payload) => {
    state.value = payload;
  }
};


// Async tasks
const actions = {
  updateValue: ({ commit }, payload) => {
    commit('updateValue', payload);
  }
};


// EXPORT
export default {
  state,
  getters,
  mutations,
  actions
}
