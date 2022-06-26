<template>
  <div  class="text item">
    <el-collapse  id="pane" v-model="activeName" >
      <el-collapse-item  name="1">
        <span class="main-font"  slot="title" >待审批会议</span>
        <div v-for="(item,index) in waitingConference" :key="index">
          <div class="childpane">
            <el-form class="container" label-position="left" label-width="0px">
              <h3 class="title"> 会议名称：{{item.fullName}}</h3>
              <div class="title">申请人：{{item.chair}}</div>
              <div class="title">举办日期：{{item.holdDate}}</div>
              <div class="title">举办地点：{{item.holdPlace}}</div>
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="attitude(!ifagree,item.fullName)">Agree</el-button>
                <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="attitude(ifagree,item.fullName)">Reject</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <span class="main-font2"  slot="title" >已过审会议</span>
        <div v-for="(item,index) in agreeConference" :key="index">
          <div class="childpane">
            <el-form class="container" label-position="left" label-width="0px">
              <h3 class="title"> 会议名称：{{item.fullName}}</h3>
              <div class="title">申请人：{{item.chair}}</div>
              <div class="title">举办日期：{{item.holdDate}}</div>
              <div class="title">举办地点：{{item.holdPlace}}</div>
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%;background: #afb4db;border: none" >passed</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="3">
        <span class="main-font2"  slot="title" >已拒绝会议</span>
        <div v-for="(item,index) in refuseConference" :key="index">
          <div class="childpane">
            <el-form class="container" label-position="left" label-width="0px">
              <h3 class="title"> 会议名称：{{item.fullName}}</h3>
              <div class="title">申请人：{{item.chair}}</div>
              <div class="title">举办日期：{{item.holdDate}}</div>
              <div class="title">举办地点：{{item.holdPlace}}</div>
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 40%;background: #afb4db;border: none" >refused</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-item>



    </el-collapse>



  </div>
</template>

<script>
    export default {
        name: "admin",
      data(){
        return{
          activeName:'1',

          ifagree:false,

          waitingConference:[
            {
              chair: '',
              abbr: '',
              fullName: '',
              holdDate: '',
              holdPlace: '',
              submissionDeadline: '',
              releaseDate: '',
            },
          ],
          agreeConference:[
            {
              chair: '',
              abbr: '',
              fullName: '',
              holdDate: '',
              holdPlace: '',
              submissionDeadline: '',
              releaseDate: '',
            },
          ],
          refuseConference:[
            {
              chair: '',
              abbr: '',
              fullName: '',
              holdDate: '',
              holdPlace: '',
              submissionDeadline: '',
              releaseDate: '',
            },
          ],
        }
      },


      created:
        function () {
        this.$axios.get('/admin')
          .then(resp=>{
            this.waitingConference=resp.data.waitingConference;
            this.agreeConference=resp.data.agreeConference;
            this.refuseConference=resp.data.refuseConference;
            this.$router.replace({path:'/admin'})
          })
          .catch(error=>{
            console.log(error);
            this.$message({
              showClose: true,
              message: '管理员信息错误',
              type: 'error'
            });
          })},

      methods:{
        attitude(ifagree,conferenceName){
          this.$axios.post('/handleConference',{
            agreeOrNot:ifagree,
            conferenceFullname:conferenceName,
          })
            .then(resp=>{
              this.$message({
                showClose: true,
                message: '已回复',
                type: 'success'
              });
              this.$router.go(0);
            })
            .catch(error => {
              console.log(error);
              this.$message({
                showClose: true,
                message: '管理员信息错误',
                type: 'error'
              });
            })
        }
      }
    }
</script>

<style scoped>

  #pane{
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
  }
  .main-font{
    color: red;
    font-size: larger;
  }
  .main-font2{
    color: black;
    font-size: larger;
  }



  .title {
    margin: 0px auto 20px auto;
    color: black;
  }

  .childpane{
    /* height: 200px; */
    margin: 0px 50px 40px;
    width: 20%;
    position:relative;
    float:left;
  }

  .container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0px 20px 20px;
    width: 100%;
    height: 100%;
    padding: 25px 35px 10px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /* box-shadow: 0 0 25px gray; */
  }

  body {
    margin: 0px;
    padding: 0px;
  }

</style>
