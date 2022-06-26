<template>
    <el-row class="tac" v-if="$route.meta.keepaside">
      <el-col :span="12">
        <!--<h5>用户导航</h5>-->
        <div class="block"><el-avatar :size="80" :src="circleUrl"></el-avatar></div>
        <span>{{username}}</span>
        <el-menu :default-active="this.$route.name" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  >
          <el-menu-item index="Home">
            <i class="el-icon-s-home"></i>
            <router-link to="Home">首页</router-link>
          </el-menu-item>
          <el-menu-item index="Information">
            <i class="el-icon-user-solid"></i>
            <router-link to="Information">个人信息</router-link>
          </el-menu-item>
          <el-menu-item index="Conference">
            <i class="el-icon-suitcase"></i>
            <router-link to="Conference">我的会议</router-link>
          </el-menu-item>
          <el-menu-item index="applyConference">
            <i class="el-icon-edit"></i>
            <router-link to="applyConference">申请会议</router-link>
          </el-menu-item>
          <el-menu-item index="allConference">
            <i class="el-icon-menu"></i>
            <router-link to="allConference">所有会议</router-link>
          </el-menu-item>
          <el-menu-item index="searchCon">
            <i class="el-icon-search"></i>
            <router-link to="searchCon">查找会议</router-link>
          </el-menu-item>
          <el-menu-item index="News">
            <i class="el-icon-message"></i>
            <router-link to="News">消息中心</router-link>
          </el-menu-item>
          <el-menu-item index="assessmentResults">
            <i class="el-icon-finished"></i>
            <router-link to="assessmentResults">评审结果</router-link>
          </el-menu-item>
          <el-menu-item index="checkPaper">
            <i class="el-icon-s-unfold"></i>
            <router-link to="checkPaper">分配稿件</router-link>
          </el-menu-item>
          <el-menu-item index="logout">
            <i class="el-icon-s-check"></i>
            <router-link to="logout">用户登出</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="10">
            <i class="el-icon-more"></i>
            更多功能
          </el-menu-item> -->

        </el-menu>
      </el-col>
    </el-row>


</template>

<script>

    export default {
      name: "asideheader",
      data(){
        return{
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          username:this.$store.state.userDetail.username,
        }
      },
      created(){
        console.log(this.$route);
        console.log(this.$route.name);
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  .tac{
    height:100%;
    width:100%;
  }

  .el-col-12{
    width:100%;
    padding-top: 50px;
  }

  /*.el-submenu{*/
    /*width:60%;*/
    /*padding-left: 20%;*/
  /*}*/

  .el-menu-item{
    width:60%;
    /*padding-left: 20%;*/
    margin-left: 20%;
  }
</style>
