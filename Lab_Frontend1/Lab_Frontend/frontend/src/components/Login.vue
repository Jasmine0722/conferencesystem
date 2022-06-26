<template>
  <div id="base_login">
    <!-- <el-carousel indicator-position="none" >
      <el-carousel-item v-for="item in 6" :key="item" style="height:100%">
      </el-carousel-item>
    </el-carousel> -->
    <!-- <div class="maintitle">
      <h1>Conference</h1>
    </div> -->
    <el-form :model="loginForm" :rules="rules" class="login_container" label-position="left" label-width="0px"
      v-loading="loading">
      <h2 class="login_title">login</h2>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" plain style="width: 40%;" v-on:click="login">
          login
        </el-button>
        <router-link to="register">
          <el-button type="primary" plain style="width: 40%;">register
          </el-button>
        </router-link>

      </el-form-item>
      <!-- <el-form-item>
        <p>管理员账号：admin</p>
        <p>管理员密码：password</p>
      </el-form-item> -->
    </el-form>

  </div>

</template>

<script>
import ElFormItem from "element-ui/packages/form/src/form-item";

export default {
  components: { ElFormItem },
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '', trigger: 'blur' }],
        password: [{ required: true, message: '', trigger: 'blur' }]
      },
      loading: false
    }
  },


  methods: {
    login() {
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
            this.$store.commit('login', resp.data);
            if (resp.data.userDetail.username !== "admin") {
              this.$router.replace({ path: '/home' })
            } else {
              this.$router.replace({ path: '/admin' })
            }
            this.$message({
              message: '登陆成功，欢迎回来！',
              type: 'success'
            });
          } else {
            this.$message.error('用户不存在或密码错误');
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.message)
          this.$message.error('登陆失败');
        })
    }
  },

  created:
    function () {
      if (this.$store.state.userDetail.username !== null && this.$store.state.userDetail.username !== 'admin') {
        this.$router.replace({ path: '/home' })
      } else if (this.$store.state.userDetail.username == 'admin')
        this.$router.replace({ path: '/admin' })
    },

}
</script>
<style scoped>
#base_login {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  background-color: #e0e7ff;
}

.maintitle {
  color: rgb(192 224 243);
  font-size: 60px;
  position: absolute;
  top: 40%;
  left: 15%;
}

body {
  margin: 0px;
  padding: 0px;
}

.login_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  height: 300px;
  padding: 65px 35px 15px 35px;
  background: #fff;
  border: 1px solid #c7c6c6d3;
  /* box-shadow: 0 0 25px #dfdbdb; */
  position: absolute;
  z-index: 10;
  top: 50px;
  right: 35%;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #262d87;
}

.el-carousel__item:nth-child(6n) {
  background: url("../assets/背景轮换/1.jpg");

  background-size: cover;
  background-position: center;
}

.el-carousel__item:nth-child(6n+1) {
  background: url("../assets/背景轮换/2.jpg");
  background-position: center;

  background-size: cover;
}

.el-carousel__item:nth-child(6n+2) {
  background: url("../assets/背景轮换/3.jpg");
  background-position: center;

  background-size: cover;
}

.el-carousel__item:nth-child(6n+3) {
  background: url("../assets/背景轮换/4.jpg");
  background-position: center;

  background-size: cover;
}

.el-carousel__item:nth-child(6n+4) {
  background: url("../assets/背景轮换/5.jpg");
  background-position: center;

  background-size: cover;
}

.el-carousel__item:nth-child(6n+5) {
  background: url("../assets/背景轮换/6.jpg");
  background-position: center;

  background-size: cover;
}

.el-carousel--horizontal>>>.el-carousel__container {
  height: 700px;
}
</style>
