import Vue from 'vue'
import Vuex from 'vuex'
import {constants, mutations, getters, actions} from './types'
import forkService from "@/api/forkService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: constants.NOT_LOADED,
    forks: []
  },
  getters: {
    [getters.IS_LOADED](state){
      return state.status === constants.LOADED
    },
    [getters.IS_LOADING](state){
      return state.status === constants.LOADING
    },
    [getters.IS_NOT_LOADED](state){
      return state.status === constants.NOT_LOADED
    }
  },
  mutations: {
    [mutations.SET_LOADING_STATUS](state, status){
      state.status = status;
    },
    [mutations.SET_FORKS](state, forks){
      state.forks = forks
    }
  },
  actions: {
    [actions.FETCH_FORK_LIST]({commit}, name){
      commit(mutations.SET_LOADING_STATUS, constants.LOADING)
      forkService.getRepoForks(name).then(data => {
        commit(mutations.SET_LOADING_STATUS, constants.LOADED)
        commit(mutations.SET_FORKS, data)
      })
    }
  }
})
