<template>
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="el-icon-tickets"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="el-icon-folder-opened"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="el-icon-takeaway-box"></i></router-link>
    </div>
    <div class="logout" @click='onLogout'>
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import {logout} from "../apis/auth";
import {mapActions} from "vuex";

export default {
  name: "Sidebar.vue",
  components: {Avatar},
  methods: {
    ...mapActions(['logout']),
    onLogout(){
      this.logout({path:'login'})
    }
  }
}
</script>

<style scoped lang="less">
.el-icon-folder-opened{
  color:white;
  font-size: 24px;
}
.el-icon-tickets{
  color:white;
  font-size: 24px;
}
.el-icon-takeaway-box{
  color:white;
  font-size: 24px;
}
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;


  .icons {
    margin-top: 15px;

    a {
      padding: 12px 0;
      display: block;
    }

    .router-link-active {
      background-color: #5e6266;
    }
  }

    .logout {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      cursor: pointer;
    }

    .iconfont {
      color: #fff;
    }
  }
</style>
