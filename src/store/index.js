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
    },
    [getters.IS_NOT_FOUND](state){
      return state.status === constants.NOT_FOUND
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
    [actions.FETCH_FORK_LIST]({commit}, {name, page}){
      commit(mutations.SET_LOADING_STATUS, constants.LOADING)
      return forkService.getRepoForks(name, page).then(({data, lastPage}) => {
        commit(mutations.SET_LOADING_STATUS, constants.LOADED)
        commit(mutations.SET_FORKS, data)
        return lastPage
      }).catch(error => {
        if(error.response && error.response.status === 404){
          commit(mutations.SET_LOADING_STATUS, constants.NOT_FOUND)
          return 0
        }
        return Promise.reject(error)
      })
    }
  }
})
