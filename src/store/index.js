import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import menu from './modules/menu'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    heartbeatIntervalId: null
  },
  mutations: {
  },

  actions: {


    logoutUser({ commit }) {
      commit('setUserLoggedIn', false)
    }
  },
  getters: {
    isLoggedIn: state => state.isUserLoggedIn
  },
  modules: {
    app,
    settings,
    user,
    menu
  },
  getters
})

export default store
