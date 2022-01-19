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
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook">
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
import {standard} from "../helpers/util";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NotebookList.vue",
  data() {
    return {}
  },
  created() {
    this.checkLogin({path:'login'})
    this.getNotebooks()
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  methods: {
    standard,
    ...mapActions(['getNotebooks', 'addNotebook', 'updateNotebook', 'deleteNotebook','checkLogin']),
    onCreate() {
      this.$prompt('请输入笔记本的标题', '新建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,16}$/,
        inputErrorMessage: '标题格式不正确，长度应不超过20个字符且不为空'
      }).then(({value}) => this.addNotebook({title: value}))
        .then(() => {
          this.$message.success('新增成功')
        }).catch(() => this.$message.info('取消新增'))
    },

    onEdit(notebook) {
      this.$prompt('请输入新的的标题', '编辑标题', {
        inputValue: notebook.title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,16}$/,
        inputErrorMessage: '标题格式不正确，长度应不超过20个字符且不为空'
      }).then(({value}) => {
        this.updateNotebook({notebookId: notebook.id, title: value})
      }).then(() => {
        this.$message.success('修改成功')
      }).catch(() => this.$message.info('取消编辑'))
    },

    onDelete(notebook) {
      this.$confirm('此操作将笔记本放入回收站, 是否继续?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
        this.deleteNotebook({notebookId: notebook.id})
      ).then(() => {
        this.$message.success('删除成功!');
      }).catch(() => this.$message.info('已取消删除'))
    }
  }
}
</script>

<style scoped lang="less">
@import url('../assets/css/NotebookList.less');
</style>
