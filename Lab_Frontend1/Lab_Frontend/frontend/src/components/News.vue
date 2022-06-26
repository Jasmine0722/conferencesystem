<template>
  <div>

    <el-tabs type="border-card">
      <el-tab-pane label="会议申请">
        <div  class="text item">
          <el-table :data="myapplication" style="width: 100%">
            <el-table-column label="我的会议申请" width="180">
              <el-table-column label="会议名称" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="缩写" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.abbr }}</span>
                </template>
              </el-table-column>
              <el-table-column label="举办日期" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.holdDate }}</span>
              </template>
            </el-table-column>
              <el-table-column label="举办地点" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.holdPlace }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会议结束" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.releaseDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="返回结果" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.state}}</span>
              </template>
            </el-table-column>
              <el-table-column label="注释" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">0:待审核；1：审核通过；2：申请失败</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="会议邀请">
        <div  class="text item">
          <div  class="text item">
            <el-table :data="receivedInvitation" style="width: 100%">
              <el-table-column label="我收到的邀请" width="180">
                <el-table-column label="会议名称" width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="缩写" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.abbr }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="举办日期" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.holdDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="举办地点" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.holdPlace }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="会议结束" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.releaseDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="dealwith(scope.row)">处理会议</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="更多功能">敬请期待。。。</el-tab-pane> -->
    </el-tabs>

  </div>

</template>

<script>
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "news",
    data(){
      return{
       activeName:'1',
        myapplication:[{
          chair: '',
          PCMembers: [],
          abbr: '',
          fullName: '',
          holdDate: '',
          holdPlace: '',
          submissionDeadline: '',
          releaseDate: '',
          authors:[],
          state:'',
        }],
        receivedInvitation:[{
          chair: '',
          PCMembers: [],
          abbr: '',
          fullName: '',
          holdDate: '',
          holdPlace: '',
          submissionDeadline: '',
          releaseDate: '',
          authors:[],
          state:'',
        }],
      }
    },
    created:
      function () {

      this.$axios.post('/message',{
        username:this.$store.state.userDetail.username
      })
        .then(resp=>{
          this.myapplication=resp.data.application,
            this.receivedInvitation=resp.data.invitation
        })
        .catch(error=>{
          console.log(error)
          this.$message.error('捕捉错误');
        })
    },
    methods:{
      dealwith(conference){
        this.$store.state.nowconference=conference;
        this.$router.replace({path:'/chosetopic'})
      },

    }
  }
</script>

<style scoped>

</style>
