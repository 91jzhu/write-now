import {addNotebook, deleteNotebook, getAll, updateNotebook} from "../../apis/notebook";

const state = {
  notebooks: null,
  curBookId: null
}

const getters = {
  notebooks(state) {
    return state.notebooks || []
  },
  curBook(state) {
    if (!Array.isArray(state.notebooks)) return {}
    if (!state.curBookId) return state.notebooks[0]
    return state.notebooks.find(item => item.id == state.curBookId) || {}
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
    let target = state.notebooks.find(item => item.id == payload.notebookId) || {}
    target.title = payload.title
  },
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(item => item.id != payload.notebookId)
  },
  setCurBook(state, payload) {
    state.curBookId = payload.curBookId
  }
}

const actions = {
  getNotebooks({commit}) {
    return getAll()
      .then(res => {
        commit('setNotebooks', {notebooks: res.data})
      })
  },
  addNotebook({commit}, payload) {
    return addNotebook({title: payload.title})
      .then(res => {
        commit('addNotebook', {notebook: res.data})
      })
  },
  updateNotebook({commit}, payload) {
    return updateNotebook(payload.notebookId, {title: payload.title})
      .then(() => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
      })
  },
  deleteNotebook({commit}, payload) {
    return deleteNotebook(payload.notebookId)
      .then(() => {
        commit('deleteNotebook', {notebookId: payload.notebookId})
      })
  }

}

export default {state, getters, mutations, actions}
