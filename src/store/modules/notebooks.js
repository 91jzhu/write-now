import {addNotebook, deleteNotebook, getAll, updateNotebook} from "../../apis/notebook";

const state = {
  notebooks: []
}

const getters = {
  notebooks(state) {
    return state.notebooks
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload['notebook'])
  },
  updateNotebook(state, payload) {
    let target = state.notebooks.find(item => item.id === payload.notebookId) || {}
    target.title = payload.title
  },
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(item => item.id !== payload.notebookId)
  }
}

const actions = {
  getNotebooks({commit}) {
    getAll()
      .then(res => {
        commit('setNotebooks', {notebooks: res.data})
      })
  },
  addNotebook({commit}, payload) {
    addNotebook({title: payload.title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
      })
  },
  updateNotebook({commit}, payload) {
    updateNotebook(payload.notebookId, {title: payload.title})
      .then(() => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
      })
  },
  deleteNotebook({commit}, payload) {
    deleteNotebook(payload.notebookId)
      .then(() => {
        commit('deleteNotebook', {notebookId: payload.notebookId})
      })
  }

}

export default {state, getters, mutations, actions}
