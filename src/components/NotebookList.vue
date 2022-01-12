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
              <span>{{ notebook['noteCounts']}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{standard(notebook['createdAt'])}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {getInfo} from "../apis/auth";
import {addNotebook, deleteNotebook, getAll, updateNotebook} from "../apis/notebook";
import {standard} from "../helpers/util";

export default {
  name: "NotebookList.vue",
  data() {
    return {
      notebooks: [],
    }
  },
  created() {
    getInfo().then(res => {
      !res["isLogin"] && this.$router.push({path: '/login'})
    })

    getAll().then(res => {
      this.notebooks = res.data
    })
  },
  methods: {
    standard,
    onCreate() {
      const title = window.prompt('请输入笔记本的标题')
      if (title.trim() === '') {
        alert('标题不能为空')
        return
      }
      addNotebook({title})
        .then(res => {
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },
    onEdit(notebook) {
      let title = window.prompt('修改标题', notebook.title)
      updateNotebook(notebook.id, {title})
        .then(res => {
          notebook.title = title
          alert(res.msg)
        })

    },
    onDelete(notebook) {
      let confirm = window.confirm('是否删除')
      confirm && deleteNotebook(notebook.id).then(res => {
        this.notebooks = this.notebooks.filter(item => item.id !== notebook.id)
        alert(res.msg)
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('../assets/css/NotebookList.less');

</style>
