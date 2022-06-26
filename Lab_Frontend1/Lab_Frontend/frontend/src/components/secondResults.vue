<template>
  <div  class="text item">
    <el-tabs type="border-card">
      <el-tab-pane label="会议查找信息">
        <div  class="text item">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="会议信息" width="180">
              <el-table-column label="名称" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="信息" width="180">
                <template slot-scope="scope">
                  {{ scope.row.name ==='会议全称 ：' ? singleConference.fullName : '' }}
                  {{ scope.row.name ==='会议简称 ：' ? singleConference.abbr : '' }}
                  {{ scope.row.name ==='会议创始人 ：' ? singleConference.chair : '' }}
                  {{ scope.row.name ==='会议开设时间 ：' ? singleConference.holdDate : '' }}
                  {{ scope.row.name ==='会议开设地点：' ? singleConference.holdPlace : '' }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" >编辑</el-button>

                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <br/><router-link to="searchCon"><el-button>返回会议查找</el-button></router-link>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="更多设置">敬请期待</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "second-results",
      data() {
        return {
          searchFullname:this.$store.state.searchFullname,
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
            },
          ],
          singleConference:{
            chair: '',
            PCMembers: [],
            abbr: '',
            fullName: '',
            holdDate: '',
            holdPlace: '',
            submissionDeadline: '',
            releaseDate: '',
          },
          tableData:[
            {name:'会议创始人 ：',data:"s"},
            {name:'会议简称 ：',data:"S"},
            {name:'会议全称 ：',data:"S"},
            {name:'会议开设时间 ：',data:"S"},
            {name:'会议开设地点：',data:"S"},
          ],

        }
      },
created(){
    this.searchFullname=this.$store.state.searchFullname;
    this.$axios.get('/allConference')
    .then(resp => {
        if (resp.status === 200) {
          this.conferences = resp.data.allConference;
          var a =this.searchFullname;
          var b ='';
          this.conferences.forEach(function (value, key, arr) {
            if (value.fullName == a){
              b=value;
            }
          })
         this.singleConference=b;
        }
        else
          this.$message.error('发现错误！');
      }
    )
    .catch(error => {
      console.log(error);
    })
}


    }
</script>

<style scoped>

</style>
