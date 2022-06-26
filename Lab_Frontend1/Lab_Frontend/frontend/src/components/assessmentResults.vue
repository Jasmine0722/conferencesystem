<template>
  <el-tabs type="border-card">
    <el-tab-pane label="评审详情">
      <el-tabs type="border-card">
        <el-tab-pane label="评审列表">
          <div  class="text item">
            <el-table :data="assessments" style="width: 100%">
              <el-table-column label="所有评审结果" width="180">
                <el-table-column label="稿件名称" width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.paperTitle }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评分一" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.scores[0] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评分二" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.scores[1] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="评分三" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.scores[2] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="confidence1" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.confidences[0] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="confidence2" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.confidences[1] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="confidence3" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.confidences[2] }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="查看评审详情" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="nowmark=scope.row,chose()" >评审详情</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="更多功能">敬请期待。。。</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="更多功能">敬请期待</el-tab-pane>

  </el-tabs>
</template>

<script>
    export default {
        name: "assessment-results",
      methods: {
          chose(){
            this.$store.commit('nowmark',this.nowmark);
            this.$router.replace({path:'/assessmentDetail'});
          }
      },

      data() {
        return {
          assessments:[{
            paperTitle:'',
            conferenceFullname:'',
            pcmembers:[],
            finish:[],
            scores:[],
            confidences:[],
            discribes:[],
          }],
          nowmark:{
            paperTitle:'',
            conferenceFullname:'',
            pcmembers:[],
            finish:[],
            scores:[],
            confidences:[],
            discribes:[],
          },
        }
      },

      created:
      function () {
        // this.username='',

          this.$axios.post('/myMark',{
            username:this.$store.state.userDetail.username
          })
            .then(resp => {
              if (resp.status === 200) {
                this.assessments = resp.data.marks;
              } else {
                this.$message.error('获取评审结果失败');
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error('捕捉到错误');
            })
      }
    }
</script>

<style scoped>

</style>
