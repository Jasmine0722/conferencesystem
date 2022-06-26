<template>
  <el-tabs type="border-card">
    <el-tab-pane label="搜索结果">
      <el-collapse  id="pane" v-model="activeName" >
      <el-collapse-item  name="1">
        <span class="main-font"  slot="title" >搜索结果：</span>
        <div v-for="(item,index) in users2" :key="index">
          <div class="childpane">
            <el-form class="container" label-position="left" label-width="0px">
              <h3 class="title"> 他的真实姓名{{item.fullname}}</h3>
              <div class="title">他的邮箱：{{item.email}}</div>
              <div class="title">他的地址：{{item.area}}</div>
              <el-button v-on:click="confirm(item.username)">加入邀请名单</el-button><br/>
            </el-form>
          </div>
        </div>
        <el-button  v-on:click="send">发出邀请</el-button>
        <router-link to="search"><el-button>返回邀请</el-button></router-link>
      </el-collapse-item>

    </el-collapse>
    </el-tab-pane>
    <!-- <el-tab-pane label="更多功能">敬请期待</el-tab-pane> -->
  </el-tabs>

</template>

<script>
    export default {
        name: "results",
      data() {
        return {
          activeName:'1',
          searchname:this.$store.state.searchname,
          users: [
            {
              username: '',
              password:'',
              fullname:'',
              email:'',
              area:'',
              unit:'',
              conferenceFullname:[],
            }
          ],
          users2: [],
          users3: []
        }
      },
      created() {
        this.searchname=this.$store.state.searchname,
          this.$axios.get('/getAllUser')
            .then(resp => {
                if (resp.status === 200) {
                  this.users = resp.data.users;
                  var a =this.searchname;
                  var b =this.users2;
                  this.users.forEach(function (value, key, arr) {
                    if (value.fullname.trim() == a.trim()){
                      b.push(value)
                    }
                  })
                  this.users2=b;
                }
                else

                this.$message.error('发现错误');
              }
            )
            .catch(error => {
              console.log(error);
            })},
      methods: {
          confirm(username){
            var a =this.users3;

            if(a.length ==0){
              a.push(username);
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.users3=a;
            }else{
              var temp=false;
              var that =this;
              a.forEach(function (value, key, arr) {
                if (value.trim() == username.trim()){
                  that.$message({
                    message: '用户已在添加名单当中!',
                    type: 'warning'
                  });
                  temp=true;
                }
              })


              if(!temp){
                a.push(username)
              }
              this.users3=a;
            }


          },

        send(){
          this.$axios.post('/invite',{
            usernames:this.users3,
            conferenceFullname: this.$store.state.nowconference.fullName,
            chair:this.$store.state.userDetail.username,
          })
            .then(resp => {
                if (resp.status === 200) {

                  if(resp.data.invitedOrNot == true){
                    this.$message({
                      message: '已发出过邀请',
                      type: 'warning'
                    });
                  }else{
                    this.$message({
                      message: '邀请成功！',
                      type: 'success'
                    });
                  }

                }
                else
              this.$message.error('邀请失败');
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

</style>
