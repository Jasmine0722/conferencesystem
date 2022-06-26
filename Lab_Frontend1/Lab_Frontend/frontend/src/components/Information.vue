<template>
  <div  class="text item">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <div  class="text item">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="个人信息" width="180">
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="信息">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.data }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" >编辑</el-button>
                </template>
              </el-table-column> -->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="信息修改">功能尚未解锁</el-tab-pane>
      <el-tab-pane label="更多设置">敬请期待</el-tab-pane> -->
    </el-tabs>
  </div>

</template>

<script>
  export default {
    name: "information",
    data(){
      return{
        user:'',
        email:'',
        location:'',
        unit:'',
        fullname:'',

        tableData:[
          {name:'用户名 ：',data:this.$store.state.userDetail.username},
          {name:'真实姓名 ：',data:this.$store.state.userDetail.fullname},
          {name:'邮箱 ：',data:this.$store.state.userDetail.email},
          {name:'地址 ：',data:this.$store.state.userDetail.area},
          {name:'工作 ：',data:this.$store.state.userDetail.job},
        ],
      }
    },

    created:
      function () {
        this.user=JSON.parse(localStorage.getItem('userDetail')).username
        this.email=JSON.parse(localStorage.getItem('userDetail')).email
        this.location=JSON.parse(localStorage.getItem('userDetail')).area
        this.unit=JSON.parse(localStorage.getItem('userDetail')).job
        this.fullname=JSON.parse(localStorage.getItem('userDetail')).fullname
      }



  }
</script>

<style scoped>

</style>
