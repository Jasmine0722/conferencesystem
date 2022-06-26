<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="稿件讨论">
        稿件讨论：

        <el-table :data="comments" style="width: 100%">
          <el-table-column label="所有评论" width="180">
            <el-table-column label="名称" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户名" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px" >{{ scope.row.username }}</span>
                <span style="margin-left: 10px" v-if="paperuser == scope.row.username ">作者的rebuttal：</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.comment}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>


        <el-button  v-if="number==1 " @click="modify()">修改评审结果</el-button>
        <el-button  v-if="number==1" @click="nomodify()">确认不修改</el-button>
        <el-button  v-if="number ==2&&rebuttal==true" @click="modify()">再次修改</el-button>
        <el-button  v-if="number ==2&&rebuttal==true" @click="nomodify()">确认不修改</el-button>


        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="帖子：">
            <el-input v-model="formInline.information" placeholder="内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addComment()">发帖</el-button>
          </el-form-item>
        </el-form>


      </el-tab-pane>
      <!-- <el-tab-pane label="更多功能">敬请期待</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
      components: {ElButton},
      name: "talking",

      data(){
          return{
            username:this.$store.state.userDetail.username,
            nownumber:this.$store.state.nownumber,
            paperuser:this.$store.state.nowpaper.username,

            formInline: {
             information:'',
            },

            comments:[{username:'',comment:'',conferenceFullname:'',paperTitle:''}],
            number:this.$store.state.nownumber,
            rebuttal:this.$store.state.nowpaper.rebuttal

          }
      },
      methods:{
        modify(){
          this.$router.replace({path:'/submitReview'});

        },
        nomodify(){

          this.number=this.number+1,

          this.$axios.post('/noModify ',{

            id:this.$store.state.nowpaper.id,
            username:this.$store.state.userDetail.username

          })
            .then(resp => {
              if (resp.status === 200) {
                if(resp.data.comments == null){
                  this.$message({
                    message: '已确认不修改！',
                    type: 'success'
                  });
                }else{
                  this.comments = resp.data.comments;
                }

              } else {
                this.$message.error('确认不修改失败');
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error('确认不修改失败');
            })
        },


        addComment(){
          this.comments.push({username:this.$store.state.userDetail.username,comment:this.formInline.information,
            conferenceFullname:this.$store.state.nowpaper.conferenceFullname,
            paperTitle:this.$store.state.nowpaper.title
          });

         this.$axios.post('/addComment',{
           paperTitle:this.$store.state.nowpaper.title,
           conferenceFullname:this.$store.state.nowpaper.conferenceFullname,
           username:this.$store.state.userDetail.username,
           comment:this.formInline.information,
         })
           .then(resp => {
             if (resp.status === 200) {
               this.$message({
                 message: '评论成功！',
                 type: 'success'
               });
             }
           })
           .catch(error => {
             console.log(error)
             console.log(error.message)
             this.$message.error('评论失败');
           })
          this.formInline.information='';
        }
      },
      created:
        function(){
          this.$axios.post('/getComment',{

            id:this.$store.state.nowpaper.id

          })
            .then(resp => {
              if (resp.status === 200) {
                if(resp.data.comments == null){
                  this.$message({
                    message: '讨论为空！',
                    type: 'success'
                  });
                }else{
                  this.comments = resp.data.comments;
                }

              } else {
                this.$message.error('获取帖子失败');
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error('获取帖子失败');
            })
        }
    }
</script>

<style scoped>
</style>
