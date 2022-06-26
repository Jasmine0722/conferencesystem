<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="会议列表">
        <div  class="text item">
          <el-table :data="conferences" style="width: 100%">
            <el-table-column label="所有会议" width="180">
              <el-table-column label="名称" width="180">
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
              <el-table-column label="主席" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.chair }}</span>
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
              <el-table-column label="接受投稿截止日期" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.submissionDeadline }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会议结束" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.releaseDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="nowconference=scope.row,chose()" >
                    会议详情</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane label="更多功能">敬请期待。。。</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    export default {
      name: "allConference",
      data() {
        return {
          username:'',
          b:[],
          a:[],

          conferences: [
            {
              chair: '',
              PCMembers: [],
              abbr: '',
              fullName: '',
              holdDate: '',
              holdPlace: '',
              submissionDeadline: '',
              releaseDate: '',
              authors:[],
              topics:[],
            },
          ],
          nowconference:
            {
              chair: '',
              PCMembers: [],
              authors:[],
              abbr: '',
              fullName: '',
              holdDate: '',
              holdPlace: '',
              submissionDeadline: '',
              releaseDate: '',
              topics:[],
              // openOrNot:'',
            },
          role:{
            chair:'',
            member:'',
            author:'',
            tourist:'',
          },


        }
      },
    created:
    function () {
      this.username='',

        this.$axios.get('/allConference')
          .then(resp => {
            if (resp.status === 200) {
              this.conferences = resp.data.allConference;
            } else {
              this.$message.error('获取会议列表失败');
            }
          })
          .catch(error => {
            console.log(error);
            this.$message.error('获取会议列表失败');
          })
    },

      methods: {
        chose:function () {

          var mm = this.role;

          this.username=this.$store.state.userDetail.username;
          var f =this.username;
          if(this.nowconference.chair == f){
            this.role.chair=f;
          };

          this.b=this.nowconference.pcmembers;//成员集合
          this.b.forEach(function (value, key, arr) {
            if(value.trim()==f.trim()) {
                 mm.member=f;

            }
          });
          this.role=mm;
          this.a=[this.nowconference.authors];
          this.a.forEach(function (value, key, arr) {
            if(value==f) {
             mm.author=f;
            }
          });
          this.role=mm;
          this.$store.commit('myrole',this.role);
          this.$store.commit('meetingDetail', this.nowconference);
          this.$router.replace({path:'/choserole'})
        },


    }
    }


</script>

<style scoped>
</style>
