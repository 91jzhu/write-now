<template>
  <div id="note" class="detail">
    <DetailSide/>
    <div id="note-detail">
      <h1>notebookId : {{ $route.query.notebookId }}</h1>
      <h1>noteId : {{ $route.query.noteId }}</h1>
    </div>
  </div>
</template>

<script>
import {getInfo} from "../apis/auth";
import DetailSide from "./DetailSide.vue";

export default {
  name: "NoteDetail.vue",
  components: {DetailSide},
  data() {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })
  }
}
</script>

<style scoped>
@import url(../assets/css/NoteDetail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
