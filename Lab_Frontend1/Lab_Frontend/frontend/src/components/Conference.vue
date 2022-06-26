
<template>

  <div id="app">
    <el-tabs type="border-card">
      <el-tab-pane label="我创建的">
        <div class="text item">
          <el-table :data="chairconference" style="width: 100%">
            <el-table-column label="我参加的会议" width="180">
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
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" @click="nowconference = scope.row, jump('chair')">会议详情</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我参加的">
        <div class="text item">
          <el-table :data="pcconference" style="width: 100%">
            <el-table-column label="我参加的会议" width="180">
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
                  <el-button size="mini" @click="nowconference = scope.row, jump('member')">会议详情</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我投稿的">

        <div class="text item">
          <el-table :data="authorconference" style="width: 100%">
            <el-table-column label="我投稿的会议" width="180">
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
                  <el-button size="mini" @click="nowconference = scope.row, jump('author')">会议详情</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>





</template>



<script>
import ElMain from "element-ui/packages/main/src/main";

export default {
  components: { ElMain },
  name: "conference",

  data() {
    return {
      a: [],
      b: [],
      role: {
        chair: '',
        member: '',
        author: '',
        tourist: '',
      },

      chairconference: [{
        chair: '',
        PCMembers: [],
        abbr: '',
        fullName: '',
        holdDate: '',
        holdPlace: '',
        submissionDeadline: '',
        releaseDate: '',
        authors: [],
        topics: [],
      }],



      pcconference: [{
        chair: '',
        PCMembers: [],
        abbr: '',
        fullName: '',
        holdDate: '',
        holdPlace: '',
        submissionDeadline: '',
        releaseDate: '',
        authors: [],
        topics: [],
      }],

      authorconference: [{
        chair: '',
        PCMembers: [],
        abbr: '',
        fullName: '',
        holdDate: '',
        holdPlace: '',
        submissionDeadline: '',
        releaseDate: '',
        authors: [],
        topics: [],
      }],



      nowconference:
      {
        chair: '',
        PCMembers: [],
        abbr: '',
        fullName: '',
        holdDate: '',
        holdPlace: '',
        submissionDeadline: '',
        releaseDate: '',
        authors: [],
        topics: [],
      },
    }
  },


  methods: {

    jump: function (str) {
      var role = this.role;

      var ev = this.nowconference;
      var f = this.$store.state.userDetail.username;
      this.$store.commit('meetingDetail', ev);

      if (str == 'chair') {
        this.role.chair = 'chair';
        this.$store.commit('myrole', this.role);
        this.$router.replace({ path: '/choserole' });
      } else if (str == 'member' && this.nowconference.chair == this.$store.state.userDetail.username) {
        this.role.member = 'member';
        this.role.chair
        this.a = [this.nowconference.authors];
        this.a.forEach(function (value, key, arr) {
          if (value == f) {
            role.author = f;
          }
        });
        this.role = role;
        this.$store.commit('myrole', this.role);
        this.$router.replace({ path: '/choserole' })
      } else if (str == 'member' && this.nowconference.chair !== this.$store.state.userDetail.username) {
        this.role.member = 'member';
        this.a = [this.nowconference.authors];
        this.a.forEach(function (value, key, arr) {
          if (value == f) {
            role.author = f;
          }
        });
        this.role = role;
        this.$store.commit('myrole', this.role);
        this.$router.replace({ path: '/choserole' })
      } else {
        this.role.author = 'author';
        this.b = [this.nowconference.PCMembers];//成员集合
        this.b.forEach(function (value, key, arr) {
          if (value == f) {
            role.member = f;
          }
        });
        this.role = role;
        this.$store.commit('myrole', this.role);
        this.$router.replace({ path: '/choserole' })
      }


    },

  },

  created:
    function () {
      this.$axios.post('/myConference', {
        username: this.$store.state.userDetail.username,
      },
      )
        .then(resp => {
          this.chairconference = resp.data.chairConference,
            this.pcconference = resp.data.pcconference,
            this.authorconference = resp.data.authorConference

        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '捕捉到错误',
            type: 'success'
          });
        })

    },


}

</script>

<style scoped>
</style>
