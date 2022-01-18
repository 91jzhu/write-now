import Vue from "vue";
import Vuex from 'vuex'
import notebook from './modules/notebooks.js'
import note from './modules/note.js'
import trash from './modules/trash.js'
import user from './modules/user.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    notebook,
    note,
    trash,
    user
  }
})
