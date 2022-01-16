<template>
  <div id="note" class="detail">
    <DetailSide @update:notes="notesChange"/>
    <div class="note-detail">
      <div class="note-empty" v-if="!curNote">请选择笔记或新增笔记</div>
      <div class="note-detail-ct" v-else>
        <div class="note-bar">
          <span> 创建日期: {{ curNote['createdAt'] ? standard(curNote['createdAt']) : '未知' }}</span>
          <span> 更新日期: {{ curNote['updatedAt'] ? standard(curNote['updatedAt']) : '未知' }}</span>
          <span>{{ status }}</span>
          <span class="iconfont icon-delete" @click="deleteNote"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="saveNote"
                 placeholder="输入标题" @keydown="status='正在输入...'">
        </div>
        <div class="editor">
          <textarea v-model="curNote.content" @keydown="status='正在输入...'" @input="saveNote"
                    placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getInfo} from "../apis/auth";
import DetailSide from "./DetailSide.vue";
import {standard} from "../helpers/util";
import {vm} from "../helpers/eventBus";
import {debounce} from "../helpers/debounce";
import {deleteNote, updateNote} from "../apis/notes";
export default {
  components: {DetailSide},
  data() {
    return {
      curNote: {},
      notes: [],
      status: '笔记未改动'
    }
  },
  created() {
    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })
    vm.$on('update:notes', val => {
      this.curNote = val[0]
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id.toString() === to.query.noteId)
    next()
  },

  methods: {
    standard,
    notesChange(val) {
      this.notes = val
      this.curNote = val[0]
    },
    saveNote() {
      debounce(() => {
        updateNote({noteId: this.curNote.id},
          {
            title: this.curNote.title,
            content: this.curNote.content
          }).then(() => {
          this.status = '已保存'
        })
          .catch(() => {
            this.status = '保存错误'
          })
      }, 1000)
    },
    deleteNote(){
      deleteNote({noteId:this.curNote.id})
        .then(data=>{
          this.$message.success(data.msg)
          this.notes=this.notes.filter(note=>note.id!==this.curNote.id)
          this.curNote=this.notes[0]
          vm.$emit('update:notes',this.notes)
        })
    },
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/NoteDetail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
