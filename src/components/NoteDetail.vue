<template>
  <div id="note" class="detail">
    <DetailSide @update:notes="notebookChange"/>
    <div class="note-detail">
      <div class="note-empty">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期:{{ standard(curNote.createdAt) }}</span>
          <span> 更新日期:{{ standard(curNote.updatedAt) }}</span>
          <span> 已保存</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          {{ curNote.title }}
          <input type="text" v-model="curNote.title"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          {{ curNote.content }}
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
      curNote: {
        title: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        status: ''
      }
    }
  },
  created() {
    vm.$on('toggleNote', (note) => {
      this.curChange(note)
    })
    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })
  },
  methods: {
    standard,
    curChange({content = '', title, createdAt, updatedAt} = {}) {
      this.curNote.title = title
      this.curNote.content = content
      this.curNote.createdAt = createdAt
      this.curNote.updatedAt = updatedAt
    },
    notebookChange(note) {
      this.curChange(note)
    }
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
