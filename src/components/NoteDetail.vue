<template>
  <div id="note" class="detail">
    <DetailSide  @update:notes="val=>this.notes=val"/>
    <div class="note-detail">
      <div class="note-empty">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAt ? standard(curNote.createdAt) : '未知' }}</span>
          <span> 更新日期: {{ curNote.updatedAt ? standard(curNote.updatedAt) : '未知' }}</span>
          <span>{{ curNote.status ? curNote.status : '未保存' }}</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-model="curNote.content" @keydown="statusText='正在输入...'"
                    placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body">
          </div>
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

export default {
  name: "NoteDetail.vue",
  components: {DetailSide},
  data() {
    return {
      curNote: {},
      notes:[]
    }
  },
  created() {

    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })
  },
  beforeRouteUpdate(to,from,next){
    console.log(to,from)
    this.curNote=this.notes.find(note=>note.id.toString()===to.query.noteId)
    console.log(this.curNote);
    next()
  },
  methods: {
    standard,
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
