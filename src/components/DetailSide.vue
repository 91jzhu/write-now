<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{ notebook['title'] }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" @click="change">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{standard(note['updatedAt'])}}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {standard} from "../helpers/util";
import {addNote} from "../apis/notes";
import {Message} from "element-ui";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  created() {
    this.getNotebooks().then(()=>{
      this.setCurBook({curBookId:this.$route.query.notebookId})
      this.getNotes({notebookId:this.curBook.id})
    }).then(()=>{
      this.setCurNote({curNoteId:this.$route.query.noteId})
    })
  },
  data() {
    return {}
  },
  computed:{
    ...mapGetters(['notes','notebooks','curBook'])
  },
  methods: {
    standard,
    ...mapMutations(['setCurBook','setCurNote']),
    ...mapActions(['getNotes','getNotebooks']),
    change(){
      this.$route.query.noteId&&this.setCurNote({curNoteId:this.$route.query.noteId})
    },
    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      this.setCurBook({curBookId:notebookId})
      this.getNotes({notebookId})
      this.setCurNote({noteId:parseInt(this.$route.query.noteId||0)})
    },

    addNote() {
      addNote({notebookId: this.curBook.id})
        .then(res => {
          Message.success('添加成功')
          this.notes.unshift(res.data)
        })
    }
  }
}

</script>


<style scoped lang="less">
@import url(../assets/css/DetailSide.less);

</style>



