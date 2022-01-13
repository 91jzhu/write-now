<template>
  <div class="detail" id="notebook-list">
    <header>
      <el-button type="primary" size="medium" plain round icon="el-icon-brush" @click.prevent="onCreate">新建笔记本
      </el-button>
    </header>
    <main>
      <div class="layout">
        <h2>笔记本列表({{ notebooks.length }})</h2>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
            <div class="coat">
              <div class="wrapper top">
                <i class="el-icon-reading"></i>
                <span class="iconfont icon-notebook"></span> {{ notebook.title }}
                <span class="counts">{{ notebook['noteCounts'] }}</span>
              </div>
              <div class="wrapper">
                <span class="date">{{ standard(notebook['createdAt']) }}</span>
                <el-button @click.stop.prevent="onEdit(notebook)" type="primary" icon="el-icon-edit" round size="small">
                  编辑
                </el-button>
                <el-button @click.stop.prevent="onDelete(notebook)" type="danger" icon="el-icon-delete" circle
                           size="small"></el-button>
              </div>
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
      this.$prompt('请输入笔记本的标题', '新建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,16}$/,
        inputErrorMessage: '标题格式不正确，长度应不超过20个字符且不为空'
      }).then(({value}) => addNotebook({title: value}))
        .then(res => {
          this.notebooks.unshift(res.data)
          this.$message({type: 'success', message: res.msg})
        }).catch(() => this.$message.info('取消新增'))
    },
    onEdit(notebook) {
      let title
      this.$prompt('请输入新的的标题', '编辑标题', {
        inputValue: notebook.title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,16}$/,
        inputErrorMessage: '标题格式不正确，长度应不超过20个字符且不为空'
      }).then(({value}) => {
        title = value
        return updateNotebook(notebook.id, {title})
      }).then(res => {
        notebook.title = title
        this.$message.success(res.msg)
      }).catch(() => this.$message.info('取消编辑'))
    },
    onDelete(notebook) {
      this.$confirm('此操作将笔记本放入回收站, 是否继续?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
        deleteNotebook(notebook.id)
      ).then(() => {
        this.notebooks = this.notebooks.filter(item => item.id !== notebook.id)
        this.$message.success('删除成功!');
      }).catch(() => this.$message.info('已取消删除'))
    }
  }
}
</script>

<style scoped lang="less">
@import url('../assets/css/NotebookList.less');

</style>
