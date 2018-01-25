import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      showNavbar: true,
      content: null,
      params: {
        tab: '',
        limit: '',
        page: ''
      },
      lists: {
        all: [],
        ask: [],
        good: [],
        share: [],
        job: []
      }
    },
  });
}
