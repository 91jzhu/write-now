import {getAllNotes, updateNote, deleteNote, addNote} from "../../apis/notes";

const state = {
  notes: [],
  curNoteId: null
}

const getters = {
  notes(state) {
    return state.notes||[]
  },
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
    state.notes = state.notes.filter(item => item.id !== noteId)
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
    addNote({notebookId}, {title, content})
      .then(res => {
        commit('addNote', {note: res.data})
      })
  },
  updateNote({commit}, {noteId, title, content}) {
    updateNote({noteId}, {title, content})
      .then(() => {
        commit('updateNote', {noteId, title, content})
      })
  },
  deleteNote({commit}, {noteId}) {
    deleteNote({noteId})
      .then(() => {
        commit('deleteNote', {noteId})
      })
  }
}

export default {state, getters, mutations, actions}
