<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import {getInfo} from "../apis/auth";

export default {
  name: "NotebookList.vue",
  data() {
    return {
      notebooks: [],
      msg: '笔记本列表'
    }
  },
  created() {
    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })
  }
}
</script>

<style scoped lang="less">
@import url('../assets/css/NotebookList.less');

</style>
