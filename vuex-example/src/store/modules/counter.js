import * as types from '../types';

const state = {
  counter: 0
};

const getters = {
  getCounter: state => {
    return state.counter;
  },
  [types.DOUBLE_COUNTER]: state => {
    return state.counter*2;
  },
  [types.CLICK_COUNTER]: state => {
    return state.counter + ' clicks';
  }
};

// Synchronous tasks
const mutations = {
  increment: (state, payload) => {    // Payload is optional!
    payload = typeof payload !== "number" ? 1 : payload;
    state.counter += payload;
  },
  decrement: (state, payload) => {
    payload = typeof payload !== "number" ? 1 : payload;
    state.counter -= payload;
  }
};

// Async tasks
const actions = {
  increment: ({ commit }) => {
    commit('increment')
  },
  decrement: ({ commit }) => {
    commit('decrement')
  },
  asyncIncrement: ({ commit }, payload) => {
    setTimeout(() => {
      commit('increment', payload.by)  // Payload is optional!
    }, payload.duration)
  },
  asyncDecrement: ({ commit }, payload) => {
    setTimeout(() => {
      commit('decrement', payload.by)
    }, payload.duration);
  }
};


// EXPORT
export default {
  state,
  getters,
  mutations,
  actions
}
