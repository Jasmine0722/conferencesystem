<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="具体详情">
        <el-table :data="tableData" stripe style="width: 100%" class="position">
          <el-table-column prop="name" label="名称" width="380">
          </el-table-column>
          <el-table-column prop="value" label="信息" width="180">
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我要反驳" v-if="(this.$store.state.nowmark.scores[0]<0||
      this.$store.state.nowmark.scores[1]<0||this.$store.state.nowmark.scores[2]<0)">
        <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
                 label-width="0px" v-loading="loading" :ref="registerForm">
          <el-form-item prop="password">
            <el-input  type="textarea"
                       :rows="3" v-model="registerForm.password"
                       auto-complete="off" placeholder="请输入您的反驳信息" required></el-input>
          </el-form-item>
          <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="handIn">handin</el-button>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>

</template>

<script>
    export default {
        name: "assessment-detail",
      data(){
        const checkpassword=(rule,password,callback)=>{
          if(!password || password ===''){
            return callback(new Error('Can\'t be empty'))
          }
          else if(password.length>800){
            return callback(new Error('800 characters in length'))
          }
          else
            return callback();
        };
        return{
            tableData:[{
              name:'稿件名 ：',
              value:this.$store.state.nowmark.paperTitle
            },{
              name:'得分一 ：',
              value:this.$store.state.nowmark.scores[0]
            },{
              name:'得分二 ：',
              value:this.$store.state.nowmark.scores[1]
            },{
              name:'得分三 ：',
              value:this.$store.state.nowmark.scores[2]
            },{
              name:'confidence1 :',
              value:this.$store.state.nowmark.confidences[0]
            },{
              name:'confidence2 :',
              value:this.$store.state.nowmark.confidences[1]
            },{
              name:'confidence3 :',
              value:this.$store.state.nowmark.confidences[2]
            },{
              name:'评语一 ：',
              value:this.$store.state.nowmark.discribes[0]
            },{
              name:'评语二 ：',
              value:this.$store.state.nowmark.discribes[1]
            },{
              name:'评语三 ：',
              value:this.$store.state.nowmark.discribes[2]
            },],

            nowmark:{
              paperTitle:'',
              conferenceFullname:'',
              pcmembers:[],
              finish:[],
              scores:[],
              confidences:[],
              discribes:[],
            },
            registerForm: {
              password: '',
            },
            rules: {
              // blur 失去鼠标焦点时触发验证
            password: [{required: true, message: '请填写此文段', trigger: 'blur'}, {validator: checkpassword, trigger: 'blur'}],
            },

          }
      },
      methods:{
          handIn(){
            if(this.registerForm.password!=null && this.registerForm.password!==undefined
              && this.registerForm.password!=='') {

              console.log(this.registerForm.password)
              console.log(this.$store.state.nowmark.paperTitle)
              console.log(this.$store.state.nowmark.conferenceFullname)
              console.log(this.$store.state.userDetail.username)


              this.$axios.post('/rebuttal',{
                 rebuttal: this.registerForm.password,
                 paperTitle:this.$store.state.nowmark.paperTitle,
                 conferenceFullname:this.$store.state.nowmark.conferenceFullname,
                 username:this.$store.state.userDetail.username,
                },
              )
                .then(resp => {
                  if (resp.status === 200) {
                    this.$message({
                      message: '已提交反驳信息！',
                      type: 'success'
                    });
                    this.$router.replace({path:'/home'});
                  }
                  else
                    this.$message.error('提交失败');
                })
                .catch(error => {
                  console.log(error);
                })
            }
          }
      },
      created:
      function () {
        this.nowmark=this.$store.state.nowmark;
      }
    }

</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .position{
    margin-left: 5%;
  }
</style>
