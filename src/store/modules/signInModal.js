import * as types from '@/store/types'
import {commit} from 'lodash'

const state = {
  isOpen: false,
  userData: null
};
const getters = {
  [types.IS_SIGNIN_MODAL_OPEN] (state) {
    return state.isOpen
  },
  [types.GET_USER_ID] (state) {
    return state.userData ? Reflect.get(state.userData, 'uid') : null
  }
};
const actions = {
  [types.OPEN_LOGIN_MODAL] ({commit}, payload) {
    commit('SET_IS_OPEN', true)
  },
  [types.CLOSE_LOGIN_MODAL] ({commit}, payload) {
    commit('SET_IS_OPEN', false)
  },
  [types.SAVE_USER_IN_STORAGE] ({commit}, userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    commit('SET_USER_DATA', userData)
  },
  [types.LOGOUT_USER] ({commit}, payload) {
    localStorage.removeItem('userData');
    commit('SET_USER_DATA', null)
  }
};
const mutations = {
  [types.SET_SIGNIN_MODAL_OPEN] (state, payload) {
  },
  SET_IS_OPEN (state, payload) {
    state.isOpen = payload;
    console.log('state mutated', state)
  },
  SET_USER_DATA (state, userData) {
    state.userData = userData
  }
};

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
