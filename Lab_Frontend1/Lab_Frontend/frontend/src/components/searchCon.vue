<template>
  <el-tabs type="border-card">
    <el-tab-pane label="查找会议">
      <el-form :model="loginForm" :rules="rules" class="login_container" label-position="left" label-width="0px"
        v-loading="loading">
        <h3 class="login_title">查找会议</h3>
        <el-form-item prop="conferenceFullname">
          <el-input type="text" v-model="loginForm.conferenceFullname" auto-complete="off" placeholder="请输入会议全称"
            required></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">

          <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="jump2()">查找
          </el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="更多功能"> </el-tab-pane> -->
  </el-tabs>
</template>

<script>
export default {
  name: "search-con",
  data() {
    return {
      conferences2: [],
      searchFullname: '',
      loginForm: {
        conferenceFullname: '',
      },

      rules: {
        conferenceFullname: [{ required: true, message: '', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    jump2() {
      this.$store.commit('searchFullname', this.loginForm.conferenceFullname);


      this.$axios.get('/allConference')
        .then(resp => {
          if (resp.status === 200) {
            this.conferences = resp.data.allConference;
            var a = this.loginForm.conferenceFullname;
            var b = this.conferences2;
            this.conferences.forEach(function (value, key, arr) {
              if (value.fullName.trim() == a.trim()) {
                b.push(value)
              }
            })
            this.conferences2 = b;
            if (b.length == 0) {
              this.$message({
                message: '会议不存在！',
                type: 'warning'
              });
            } else {
              this.$router.replace({ path: '/secondResults' });
            }
          }
          else
            this.$message.error('发现错误！');
        }
        )
        .catch(error => {
          console.log(error);
        })
    }
  }

}
</script>

<style scoped>
#base_login {
  background: url("../assets/background/checkerboard-cross.png") repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
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
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #494e8f;
}
</style>
