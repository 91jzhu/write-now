<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link @click="()=>toggleNote(note)"
          :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{standard(note['updatedAt'])}}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {getAll} from '../apis/notebook'
import {vm} from '../helpers/eventBus'
import {standard} from "../helpers/util";
import {addNote, getAllNotes} from "../apis/notes";

export default {
  created() {
    getAll().then(res => {
      this.notebooks = res.data
      this.curBook = this.notebooks.find(notebook => notebook.id.toString() === this.$route.query.notebookId)
          || this.notebooks[0] || {}
        return getAllNotes({notebookId: this.curBook.id})
      }).then(res => {
      this.notes = res.data
      this.$emit('update:notes', this.notes[0])
      // vm.$emit('update:notes', this.notes)
    })
  },

  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: {}
    }
  },

  methods: {
    standard,
    toggleNote(note){
      console.log(note);
    },
    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.curBook = this.notebooks.find(notebook => notebook.id === notebookId)
      getAllNotes({notebookId})
        .then(res => {
          this.notes = res.data
          this.$emit('update:notes', this.notes[0])
        })
    },

    addNote() {
      addNote({notebookId: this.curBook.id})
        .then(res => {
          console.log(res)
          this.notes.unshift(res.data)
        })
    }
  }
}

</script>


<style scoped lang="less">
@import url(../assets/css/DetailSide.less);

</style>



