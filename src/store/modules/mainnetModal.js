import * as types from '@/store/types'
import {commit} from 'lodash'

const state = {
  mainnetIsOpen: false,
};
const getters = {
  [types.IS_NETWORK_MODAL_OPEN] (state) {
    return state.mainnetIsOpen
  }
};
const actions = {
  [types.OPEN_NETWORK_MODAL] ({commit}, payload) {
    commit('SET_NETWORK_IS_OPEN', true)
  },
  [types.CLOSE_NETWORK_MODAL] ({commit}, payload) {
    commit('SET_NETWORK_IS_OPEN', false)
  },
};
const mutations = {
  [types.SET_NETWORK_MODAL_OPEN] (state, payload) {
  },
  SET_NETWORK_IS_OPEN (state, payload) {
    state.mainnetIsOpen = payload;
  },
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
