<template>
  <div id="app">
    <el-container>
      <!-- <LuffyHeader v-if="$route.meta.keepinitial"></LuffyHeader> -->
      <!-- <adminheader /> -->
      <el-header style="height:90px;background:rgba(0, 0, 128, 1)">
      <el-row>
        <el-col :span="12"><div class="topname">Conference</div></el-col>
        <el-col :span="12">
          <div style="float:right;line-height: 90px;" v-show="this.$store.state.token !== null">
            <el-button style="width:100px;" v-on:click="logout">退出管理
            </el-button>
          </div>
        </el-col>
      </el-row>
      </el-header>
      <el-container class="none">
        <el-aside v-if="$route.meta.keepinitial">
          <asideheader />
          <adAside />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LuffyHeader from '@/components/LuffyHeader'
import adminheader from '@/components/adminheader'
import ElContainer from "element-ui/packages/container/src/main";
import ElHeader from "element-ui/packages/header/src/main";
import asideheader from '@/components/asideheader'
import ElAside from "element-ui/packages/aside/src/main";
import ElMain from "element-ui/packages/main/src/main";
import ElFooter from "element-ui/packages/footer/src/main";
import adAside from '@/components/adAside'



export default {
  name: 'App',
  components: {
    ElFooter,
    ElMain,
    ElAside,
    ElHeader,
    ElContainer,
    LuffyHeader,
    adminheader,
    asideheader,
    adAside,
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      if (this.$route.path !== '/login') {
        this.$router.replace('/login')
      }
    }
  },
}
</script>

<style>
.none /deep/ .el-main {
  padding: 0;
}

.none /deep/ .el-aside {
  padding: 0;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
  padding: 0px;

}

.el-main {
  padding: 0px;
}

.topname {
  position: relative;
  left: 20px;
  text-align: initial;
  font-size: 30px;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  color: #FFFFFF;
  line-height: 90px;
}
</style>
