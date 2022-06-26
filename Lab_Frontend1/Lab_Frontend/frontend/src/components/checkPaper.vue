<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="我分配到的稿件">
        <div  class="text item">
          <el-table :data=" papers" style="width: 100%">
            <el-table-column label="所有稿件" width="180">
              <el-table-column label="文章标题" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column label="文章摘要" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.summary}}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否审批过" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{finishs[scope.$index]}}</span>
                </template>
              </el-table-column>
              <el-table-column label="注释" width="180">
                <template slot-scope="scope">
                  <span>true：已审阅<br />false：待审批</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">

                  <el-button size="mini" v-on:click="preview(scope.$index)">在线预览</el-button>

                  <el-button size="mini" v-on:click="downLoad(scope.$index)"> 下载pdf</el-button>

                  <el-button size="mini" v-on:click="nowpaper=scope.row, number=numbers[scope.$index],gotalk()"
                             v-if="scope.row.finish=true">查看讨论</el-button>

                  <el-button type="primary" style="width: 40%;margin-top: 10px;margin-left: 0;" v-if="!finishs[scope.$index]" v-on:click="nowPaper(scope.row)">去审稿</el-button>
                </template>

              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane label="更多功能"></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "checkPaper",
      data(){
      return {
        papers:[{
          username:'',
          conferenceFullname:'',
          title:'',
          summary:'',
          writerEmail:[],
          writerName:[],
          writerJob:[],
          writerAddress:[],
          topics:[],
          id:0,
        }],
        number:0,
        numbers:[],

        nowpaper:{
          username:'',
          conferenceFullname:'',
          title:'',
          summary:'',
          writerEmail:[],
          writerName:[],
          writerJob:[],
          writerAddress:[],
          topics:[],
          id:0,
        },
        finishs:[],
      }


        },
      methods:{
          gotalk(){
            this.$store.commit('nowpaper',this.nowpaper)
            this.$store.commit('nownumber',this.number)
            this.$router.replace({path:'/talking'});
          },

        retalk(){

        },

       preview(index){
                this.$axios({
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  url: '/download',
                  method: 'post',
                  data: { id: this.papers[index].id,},
                  responseType: 'blob',
                })
                  .then((resp) => {
                    if (resp.status === 200) {
                      const binaryData = [];
                      binaryData.push(resp.data);
                      let pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }));
                      window.open(pdfUrl);
                    }
                    else
                      this.$message.error('下载文件失败');
                  }) // 发送请求
              },
          nowPaper(paper){
            this.$store.commit('nowpaper',paper);
            this.$router.replace({path:'/submitReview'})
          },
          downLoad(index){
                      this.$axios({
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        url: '/download',
                        method: 'post',
                        data: { id: this.papers[index].id,},
                        responseType: 'blob',
                      })

                        .then((resp) => {
                        if (resp.status === 200) {
                          let blob = new Blob([resp.data],{type: 'application/pdf'});
                          const elink = document.createElement('a');
                           elink.download = this.papers[index].title+".pdf";
                          elink.style.display = 'none';
                          elink.href = URL.createObjectURL(blob);
                          document.body.appendChild(elink);
                          elink.click();
                          URL.revokeObjectURL(elink.href); // 释放URL 对象
                          document.body.removeChild(elink);
                        }
                        else
                          this.$message.error('下载文件失败');
                      }) // 发送请求
                    }
          },

      created(){
          this.$axios.post('/myDistribution',{
          username:this.$store.state.userDetail.username,
        })
          .then(resp => {
              if (resp.status === 200) {
                this.papers = resp.data.papers;
                this.numbers=resp.data.numbers;
                console.log(resp.data.numbers);
                console.log(this.numbers);
                this.finishs=resp.data.finishs;
              }
              else
                this.$message.error('分配稿件错误！');
            }
          )
          .catch(error => {
            console.log(error);
          });
      }
    }
</script>

<style scoped>

</style>
