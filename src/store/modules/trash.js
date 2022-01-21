import {getAll, deleteNote, revertNote} from "../../apis/trash";
import {Message} from "element-ui";

const state = {
  trashNotes: null,
  curTrashNoteId: null
}

const getters = {
  trashNotes(state) {
    return state.trashNotes
  },
  curTrashNote(state) {
    if (!state.trashNotes) return {}
    if (!state.curTrashNoteId) return state.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id === state.curTrashNoteId) || {}
  },
  belongTo(state, getters, rootState, rootGetters) {
    console.log(rootGetters.notebooks);
    console.log(getters.curTrashNote);
    let notebook = rootGetters.notebooks.find(notebook => notebook.id === getters.curTrashNote.notebookId) || {}
    return notebook.title || ''
  }
}

const mutations = {
  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes
  },
  addTrashNote(state, payload) {
    state.trashNotes.unshift(payload.note)
  },
  deleteTrashNote(state, payload) {
    state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
  },
  setCurTrashNote(state, payload) {
    state.curTrashNoteId = payload.curTrashNoteId
  }
}

const actions = {
  getTrashNotes({commit}) {
    return getAll()
      .then(res => {
        commit('setTrashNotes', {trashNotes: res.data})
      })
  },
  deleteTrashNote({commit}, {noteId}) {
    return deleteNote({noteId})
      .then(() => {
        commit('deleteTrashNote', {noteId})
        Message.success('删除成功')
      })
  },
  revertTrashNote({commit}, {noteId}) {
    return revertNote({noteId})
      .then(() => {
        commit('deleteTrashNote', {noteId})
        Message.info('已恢复笔记')
      })
  }
}

export default {state, mutations, getters, actions}
