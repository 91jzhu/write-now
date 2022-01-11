<template>
  <div id="trash-detail">
    <h1>{{msg}} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
import {getInfo} from "../apis/auth";

export default {
  name: "TrashDetail.vue",
  data () {
    return {
      msg: '回收站笔记详情页'
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
