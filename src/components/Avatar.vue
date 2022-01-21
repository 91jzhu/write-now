<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import {vm} from "../helpers/eventBus";
import {getInfo} from "../apis/auth";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "Avatar.vue",
  data() {
    return {}
  },
  created() {
    if (this.$route.path !== '/login')
      this.checkLogin({path: 'login'})
  },
  methods: {
    ...mapActions(['checkLogin'])
  },
  computed: {
    ...mapGetters(['slug', 'username']),
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
