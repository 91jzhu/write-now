<template>
  <div id="note" class="detail">
    <DetailSide/>
    <div class="note-detail">
      <div class="note-empty" v-if="!curNote">请选择笔记或新增笔记</div>
      <div class="note-detail-ct" v-else>
        <div class="note-bar">
          <span> 创建日期: {{ curNote['createdAt'] ? standard(curNote['createdAt']) : '未知' }}</span>
          <span> 更新日期: {{ curNote['updatedAt'] ? standard(curNote['updatedAt']) : '未知' }}</span>
          <span>{{ status }}</span>
          <span class="iconfont icon-delete" @click="ondeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="translation"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onsaveNote"
                 placeholder="输入标题" @keydown="status='正在输入...'">
        </div>
        <div class="editor">
          <textarea v-model="curNote.content" @keydown.stop="status='正在输入...'" @input="onsaveNote"
                    placeholder="输入内容, 支持 markdown 语法" v-show="!PreviewShow"></textarea>
          <div class="preview markdown-body" v-show="PreviewShow"
               v-html="preview">
            {{ preview }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DetailSide from "./DetailSide.vue";
import {standard} from "../helpers/util";
import {debounce} from "../helpers/debounce";
import MarkDownIt from 'markdown-it'
import {mapActions, mapGetters, mapMutations} from "vuex";

let md = new MarkDownIt()

export default {
  components: {DetailSide},
  data() {
    return {
      status: '笔记未改动',
      PreviewShow: false,
      preview:''
    }
  },
  computed:{
    ...mapGetters(['notes','curNote'])
  },
  created() {
    this.checkLogin({path:'login'})
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({noteId:to.query.noteId})
    next()
  },

  methods: {
    standard,
    ...mapMutations(['setCurNote']),
    ...mapActions(['updateNote','deleteNote','checkLogin']),
    translation(){
      this.PreviewShow=!this.PreviewShow
      this.preview=md.render(this.curNote.content)
    },
    onsaveNote() {
      debounce(() => {
        if(!this.curNote) return
        this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
          .then(() => {
          this.status = '已保存'
        })
          .catch(() => {
            this.status = '保存错误'
          })
      }, 500)
    },
    ondeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(() => {
          this.$message.success('删除成功')
          this.$router.replace({path: '/note'})
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
