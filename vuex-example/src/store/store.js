import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';
import value from './modules/value';
import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions, // <--- You can do this for getters and mutations
  modules: {
    counter,
    value
  }
});
