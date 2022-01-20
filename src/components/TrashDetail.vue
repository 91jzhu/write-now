<template>
  <div id="trash-detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ standard(note['updatedAt']) }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote['createdAt'] ? standard(curTrashNote['createdAt']) : '未知' }}</span>
        <span> 更新日期: {{ curTrashNote['updatedAt'] ? standard(curTrashNote['updatedAt']) : '未知' }}</span>
        <span>所属笔记本: {{ curTrashNote.belongTo }}</span>

        <a class="btn action" @click="onRevert">恢复</a>
        <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="preview">{{ preview }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import MarkDownIt from 'markdown-it'
import {standard} from "../helpers/util";

let md = new MarkDownIt()

export default {
  name: "TrashDetail.vue",
  data() {
    return {
      trashNotes: [
        {
          id: 3,
          title: 'hello',
          content: '### world',
          createdAt: "",
          updatedAt: '',
          belongTo: '34'
        },
        {
          id: 4,
          title: 'fuck',
          content: ' mother',
          createdAt: "",
          updatedAt: '',
          belongTo: '12'
        }
      ],
      curTrashNote: {
        id: 3,
        title: 'hello',
        content: '### world',
        createdAt: "",
        updatedAt: '',
        belongTo: '55'
      }
    }
  },
  created() {
    this.checkLogin()
  },
  computed: {
    preview() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  methods: {
    standard,
    ...mapActions(['checkLogin']),
    onRevert() {
      console.log('revert');
    },
    onDelete() {
      console.log('delete');
    }
  }
}
</script>

<style scoped lang="less">
@import url(../assets/css/NoteDetail.less);
@import url(../assets/css/DetailSide.less);
#trash-detail{
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex:1;

  .note-bar{
    .action{
      float:right;
      margin-left: 10px;
      padding:2px 4px;
      font-size: 12px;
    }
  }
}

</style>
