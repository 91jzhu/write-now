import {getInfo, login, register} from "../../apis/auth";
import Router from '../../router/index.js'

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
  setUser(state,payload){
    state.user=payload.user
  }
}

const actions = {
  login({commit}, {username,password}){
    return login({username,password})
      .then(res=>{
        console.log(res)
        commit('setUser',{user:res.data})
      })
  },
  register({commit}, {username,password}){
    return register({username,password})
      .then(res=>{
        console.log(res);
        commit('setUser',{user:res.data})
      })
  },
  checkLogin({commit,state},payload){
    if(state.user)
      return Promise.resolve()
    getInfo().then(res=>{
      if(res['login']){
        Router.push(payload).then()
      }else{
        commit('setUser',{user:res.data})
      }
    })
  }
}

export default {state, getters, mutations, actions}
