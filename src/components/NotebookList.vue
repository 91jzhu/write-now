<template>
  <div id="notebook-list">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/note/1">笔记本1</router-link>
      </li>
      <li>
        <router-link to="/note/2">笔记本2</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {getInfo} from "../apis/auth";

export default {
  name: "NotebookList.vue",
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    getInfo().then(res=>{
      !res.isLogin&&this.$router.push({path:'/login'})
    })
  }
}
</script>

<style scoped>

</style>
