import * as types from '@/store/types'
import {commit} from 'lodash'

const state = {
  isOpen: false,
  userData: null
}
const getters = {
  isOpen (state) {
    return state.isOpen
  },
  userId (state) {
    return state.userData ? Reflect.get(state.userData, 'uid') : null
  }
}
const actions = {
  openLoginModal () {
    commit('SET_IS_OPEN', true)
  },
  closeLoginModal () {
    commit('SET_IS_OPEN', false)
  },
  saveUserInStorage (userData) {
    localStorage.setItem('userData', JSON.stringify(userData))
    commit('SET_USER_DATA', userData)
  },
  logoutUser () {
    localStorage.removeItem('userData')
    commit('SET_USER_DATA', null)
  }
}
const mutations = {
  [types.SET_SIGNIN_MODAL_OPEN] (state, payload) {
  },
  SET_IS_OPEN () {
    state.isOpen = isOpen
  },
  SET_USER_DATA (state, userData) {
    state.userData = userData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
