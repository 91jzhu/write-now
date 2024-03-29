import {getInfo, login, logout, register} from "../../apis/auth";
import router from '../../router/index.js'

const state = {
  user: null
}

const getters = {
  username(state) {
    if (state.user && state.user.username)
      return state.user.username
  },
  slug(state) {
    if (state.user && state.user.username)
      return state.user.username.charAt(0)
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  }
}

const actions = {
  login({commit}, {username, password}) {
    return login({username, password})
      .then(res => {
        console.log(res)
        commit('setUser', {user: res.data})
      })
  },
  register({commit}, {username, password}) {
    return register({username, password})
      .then(res => {
        console.log(res);
        commit('setUser', {user: res.data})
      })
  },
  checkLogin({commit, state}, payload) {
    if (state.user)
      return Promise.resolve()
    getInfo().then(res => {
      if (!res['isLogin']) {
        router.push(payload).then()
      } else {
        commit('setUser', {user: res.data})
      }
    })
  },
  logout({commit},payload) {
    logout().then(() => {
      commit('setUser', {user: null})
      router.push(payload).then()
    })
  }
}

export default {state, getters, mutations, actions}
