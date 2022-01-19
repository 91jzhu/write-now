import {getAllNotes, updateNote, deleteNote, addNote} from "../../apis/notes";

const state = {
  notes: null,
  curNoteId: null
}

const getters = {
  notes(state) {
    return state.notes || []
  },
  curNote(state) {
    if (!Array.isArray(state.notes)) return {}
    if (!state.curNoteId) return state.notes[0]
    return state.notes.find(item => item.id == state.curNoteId) || {}
  }
}

const mutations = {
  getAllNotes(state, {notes}) {
    state.notes = notes
  },
  addNote(state, {note}) {
    state.notes.unshift(note)
  },
  updateNote(state, {noteId, title, content}) {
    let target = state.notes.find(item => item.id === noteId) || {}
    target.title = title
    target.content = content
  },
  deleteNote(state, {noteId}) {
    state.notes = state.notes.filter(item => item.id != noteId)
  },
  setCurNote(state,payload){
    state.curNoteId=payload.curNoteId
  }
}

const actions = {
  getNotes({commit}, {notebookId}) {
    return getAllNotes({notebookId})
      .then(res => {
        commit('getAllNotes', {notes: res.data})
      })
  },
  addNote({commit}, {notebookId, title, content}) {
    return addNote({notebookId}, {title, content})
      .then(res => {
        commit('addNote', {note: res.data})
      })
  },
  updateNote({commit}, {noteId, title, content}) {
    return updateNote({noteId:parseInt(noteId)}, {title, content})
      .then(() => {
        commit('updateNote', {noteId:parseInt(noteId), title, content})
      })
  },
  deleteNote({commit}, {noteId}) {
    return deleteNote({noteId})
      .then(() => {
        commit('deleteNote', {noteId})
      })
  }
}

export default {state, getters, mutations, actions}
