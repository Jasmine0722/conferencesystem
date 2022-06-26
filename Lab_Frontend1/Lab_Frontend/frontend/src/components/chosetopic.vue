<template>
  <div  class="text item">
    <el-tabs type="border-card">
      <el-tab-pane label="会议详情">
        <div  class="text item">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="此会议" width="180">
              <el-table-column label="名称" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="信息" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.data }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini">编辑</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="主题选择">
        <el-form>
        <el-checkbox-group v-model="checkboxGroup" :min="1">
          <el-checkbox v-for="(topic,index) in topics" :label="'topic'+index +':'+topic" :key="topic.key" border></el-checkbox>
        </el-checkbox-group>
        <el-button @click="attitude(!ifagree,conferenceName,username)">接受</el-button>
        <el-button @click="attitude(ifagree,conferenceName,username)">拒绝</el-button>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="更多设置">敬请期待</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
      components: {ElButton},
      name: "chosetopic",
        data(){
          return{
            checkboxGroup: [],
            username:'',
            conferenceName:'',
            ifagree:false,
            tableData:[
              {name:'会议名称 ：',data:this.$store.state.nowconference.fullName},
              {name:'名称缩写 ：',data:this.$store.state.nowconference.abbr},
              {name:'会议主席 ：',data:this.$store.state.nowconference.chair},
              {name:'举办地点 ：',data:this.$store.state.nowconference.holdPlace},
              {name:'举办日期 ：',data:this.$store.state.nowconference.holdDate},
              {name:'截止投稿 ：',data:this.$store.state.nowconference.submissionDeadline},
              {name:'会议结束 ：',data:this.$store.state.nowconference.releaseDate},
            ],

            topics:[],
          }
        },

      methods:{
        attitude(ifagree,newfullname,newmyusername){
          this.$axios.post('/handleInvitation',{
            agreeOrNot:ifagree,
            conferenceFullname:newfullname,
            username:newmyusername,
            checkedtopic:this.checkboxGroup,
          })
            .then(resp=>{
              if(this.checkboxGroup.length == 0){
                this.$message({
                  showClose: true,
                  message: '请先选择主题！',
                  type: 'warning'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: '已回复',
                  type: 'success'
                });
                this.$router.replace({path:'/conference'})
              }

            })
            .catch(error => {
              console.log(error)
              this.$message({
                showClose: true,
                message: '捕捉错误',
                type: 'success'
              });
            })
        }
      },

      created:
        function () {
          this.username=this.$store.state.userDetail.username;
          this.nowconference=this.$store.state.nowconference;
          this.topics=this.$store.state.nowconference.topics;
          this.conferenceName=this.$store.state.nowconference.fullName;
        }
    }
</script>

<style scoped>

</style>
