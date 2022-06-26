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
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="会议主题及成员">
        <div>
          <el-table :data="nowconference.topics" style="width: 100%" class="table">
            <el-table-column label="所有主题" width="180">
              <el-table-column label="topic" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">topic</span>
                </template>
              </el-table-column>
              <el-table-column label="主题" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-table :data="nowconference.pcmembers" style="width: 100%" class="table">
            <el-table-column label="所有成员" width="180">
              <el-table-column label="member" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">member</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row }}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="会议功能">
        <el-button v-if="this.role.chair != ''&&this.nowconference.openOrNot == false&&this.nowconference.markable == false" @click="openwriting">开启投稿</el-button>
        <el-button v-if="this.role.chair != ''&&this.nowconference.openOrNot==true" @click="jump">邀请成员</el-button>
        <el-button v-if="this.role.author != ''" @click="jumpwrite()">查看投稿</el-button>
        <el-button v-if="this.role.chair == ''
        &&this.role.member !=='chairmember'&&this.$store.state.nowconference.markable == false
        &&this.$store.state.nowconference.openOrNot == true&&username !== nowconference.chair" @click="beauthor">我要投稿</el-button>
        <h3 v-if="(this.nowconference.openOrNot == true&& this.role.chair != '')">审稿策略选择：</h3>
        <el-button v-if="this.nowconference.openOrNot == true&& this.role.chair != ''" @click="chosestra('1')">基于topic相关度</el-button>
        <el-button v-if="this.nowconference.openOrNot == true&& this.role.chair != ''" @click="chosestra('0')">基于审稿平均负担</el-button>
        <el-button v-if="this.nowconference.openOrNot == true&& this.role.chair != ''&&this.nowconference.markable == false" @click="openauthor">开启审稿</el-button>
        <el-button v-if="this.nowconference.finish == 2&& this.role.chair != ''&&this.nowconference.released == false" @click="fabu">发布初次评审结果</el-button>
        <el-button v-if="this.nowconference.finish == 3&& this.role.chair != ''&&this.nowconference.released == false" @click="fabu">发布最终评审结果</el-button>


      </el-tab-pane>
      <!-- <el-tab-pane label="更多设置">敬请期待</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
      components: {ElButton},
      name: "conference-detail",
      data(){
          return{
            username:this.$store.state.userDetail.username,
            stra:'1',
            nowconference:
              {
                chair: '',
                pcmembers: [],
                authors:[],
                abbr: '',
                fullName: '',
                holdDate: '',
                holdPlace: '',
                submissionDeadline: '',
                releaseDate: '',
                topics:[],
                openOrNot:'',
                finish:0,
                released:false,
              },
            role:{
              chair:'',
              member:'',
              author:'',
              tourist:'',
            },


            tableData:[
              {name:'会议名称 ：',data:this.$store.state.nowconference.fullName},
              {name:'名称缩写 ：',data:this.$store.state.nowconference.abbr},
              {name:'会议主席 ：',data:this.$store.state.nowconference.chair},
              {name:'举办地点 ：',data:this.$store.state.nowconference.holdPlace},
              {name:'举办日期 ：',data:this.$store.state.nowconference.holdDate},
              {name:'截止投稿 ：',data:this.$store.state.nowconference.submissionDeadline},
              {name:'会议结束 ：',data:this.$store.state.nowconference.releaseDate},
            ],
         }//return
      },//data




      methods:{

        fabu(){

          this.$axios.post('/releaseMark', {
            conferenceFullname:this.$store.state.nowconference.fullName,
          })
            .then(resp => {
                if (resp.status === 200) {
                  this.$message({
                    message: '发布成功！',
                    type: 'success'
                  });
                  this.$store.state.nowconference.released = true;
                  this.$router.replace({path:'/assessmentResults'});
                }
                else
                  this.$message.error('发布失败');
              }
            )
            .catch(error => {
              console.log(error);
            })
        },

        jumpwrite(){
          this.$router.replace({path:'/myWriting'})
        },
        chosestra(stra){
          if(stra == '1'){
            this.$message('您采用了topic相关度策略！');
            this.stra='1'
          }else{
            this.$message('您采用了人均负担相关度策略！');
            this.stra='0'
          }
        },

        openauthor(){
          if(this.$store.state.nowconference.pcmembers.length < 3){
            this.$message({
              message: '会议成员不足三个，无法开启投稿！',
              type: 'warning'
            });
          }else{
            this.$axios.post('/openMark', {
              conferenceFullname:this.$store.state.nowconference.fullName,
              strategy:this.stra,
              markable:true,
            })
              .then(resp => {
                  if (resp.status === 200) {
                    this.nowconference.openOrNot=false;
                    this.$store.state.nowconference.openOrNot=false;
                    this.nowconference.markable=true;
                    this.$store.state.nowconference.markable=true;
                    this.$message({
                      message: '开启审稿成功！',
                      type: 'success'
                    });
                  }
                  else
                     this.$message.error('开启审稿失败');
                }
              )
              .catch(error => {
                console.log(error);
              })
          }

        },

        openwriting() {
          this.$axios.post('/openConference', {
            chair: this.$store.state.userDetail.username,
            conferenceFullname: this.$store.state.nowconference.fullName,
            openOrNot: true,
          })
            .then(resp => {
                if (resp.status === 200) {
                  this.$message({
                    showClose: true,
                    message: '会议开启成功！',
                    type: 'success'
                  });
                  this.nowconference.openOrNot=true;
                this.$store.state.nowconference.openOrNot=true;
                }
                else
                   this.$message.error('会议开启失败');
              }
            )
            .catch(error => {
              console.log(error);
            })
        },
        jump() {
          this.$router.replace({path: '/search'})
        },
        beauthor(){
          this.$router.replace({path: '/handInWriting'})
        }
      },


      created:
      function () {
        this.role=this.$store.state.myrole;
        this.nowconference=this.$store.state.nowconference;

      }
    }
</script>

<style scoped>
  .table{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
