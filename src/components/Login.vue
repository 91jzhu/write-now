<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="()=>toggle('signup')">创建账户</h3>
<!--            <transition name="slide">-->
              <div v-bind:class="{show: isSignUp}" class="register">
                <input type="text" placeholder="用户名" v-model="signUp.username" @change="onSignUp">
                <input type="password" placeholder="密码" v-model="signUp.password" @change="onSignUp"
                       @keyup.enter="onSignUp">
                <p :class="{error:signUp.isError}">{{ signUp.notice }}</p>
                <div class="button" @click="onSignUp">创建账号</div>
              </div>
<!--            </transition>-->
            <h3 @click="()=>toggle('signin')">登录</h3>
<!--            <transition name="slide">-->
              <div v-bind:class="{show: isSignIn}" class="login">
                <input type="text" placeholder="输入用户名" v-model="signIn.username" @change="onSignIn">
                <input type="password" placeholder="密码" v-model="signIn.password" @change="onSignIn"
                       @keyup.enter="onSignIn">
                <p :class="{error:signIn.isError}">{{ signIn.notice }}</p>
                <div class="button" @click="onSignIn"> 登录</div>
              </div>
<!--            </transition>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login.vue",
  data() {
    return {
      isSignUp: true,
      isSignIn: false,
      signUp: {
        username: '',
        password: '',
        notice: '创建后请记住用户名和密码',
        isError: false
      },
      signIn: {
        username: '',
        password: '',
        notice: '请输入用户名和密码',
        isError: false
      },
    }
  },
  methods: {
    toggle(type) {
      this.isSignIn = type === 'signin' && !this.isSignIn;
      this.isSignUp = type === 'signup' && !this.isSignUp;
    },
    validate(obj = {}) {
      const {isValidU, noticeU} = this.validUsername(obj.username)
      const {isValidP, noticeP} = this.validPassword(obj.password)
      if (!isValidU) {
        obj.notice = noticeU
        obj.isError = true
        return
      }
      if (!isValidP) {
        obj.notice = noticeP
        obj.isError = true
        return
      }
      obj.isError = false
      obj.notice = ""
    },
    onSignUp() {
      this.validate(this.signUp)
    },
    onSignIn() {
      this.validate(this.signIn)
    },
    validUsername(username) {
      return {
        isValidU: /^[a-zA-Z_0-9\u4e00-\u9fa5]{3,15}$/.test(username),
        noticeU: '用户名必须是3-15个字符，仅限数字、字母或下划线'
      }
    },
    validPassword(password) {
      return {
        isValidP: /^.{6,16}$/.test(password),
        noticeP: '密码长度为6-16位'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;

}


.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}


.modal-container {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;


  .main {
    flex: 1;
    background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;

  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      margin-top: -1px;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;

      }


    }


    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;

    }


    .login, .register {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .4s;
      &.show{
        height:193px
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;

      }

      input:focus {
        outline: 3px solid #9dcaf8;

      }


      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;

      }

      .error {
        color: red;

      }
    }

    .login {
      border-top: 0;

    }
  }
}
</style>
