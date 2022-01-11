<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import {vm} from "../helpers/eventBus";
import {getInfo} from "../apis/auth";
getInfo().then((data)=>{
  console.log(data);
})
export default {
  name: "Avatar.vue",
  data() {
    return {
      username: '未登录'
    }
  },
  created(){
    vm.$on('info',username=>{
      this.username=username
    })
    getInfo().then(({data,isLogin})=>{
      if(isLogin){
        this.username=data.username
      }
    })
  },

  computed:{
    slug(){
      return this.username.charAt(0)
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
