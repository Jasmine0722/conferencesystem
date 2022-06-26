<template>
  <el-tabs type="border-card">
    <el-tab-pane label="提交审批">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>稿件名称：{{nowpaper.name}}</el-form-item>
        <el-form-item label="稿件评分" prop="region">
          <el-select v-model="ruleForm.score" placeholder="请选择稿件评分">
            <el-option label="-2 ：reject" value="-2"></el-option>
            <el-option label="-1 ：weak reject" value="-1"></el-option>
            <el-option label="1 ：weak accept" value="1"></el-option>
            <el-option label="2 ：accept" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="confidence" prop="region">
          <el-select v-model="ruleForm.confidence" placeholder="请选择confidence">
            <el-option label="very low" value="-2"></el-option>
            <el-option label="low" value="-1"></el-option>
            <el-option label="high" value="1"></el-option>
            <el-option label="very high" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="稿件评语" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>

          <el-button type="primary" @click="submitForm('ruleForm')">提交审批</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-tab-pane>
    <!-- <el-tab-pane label="更多功能">敬请期待</el-tab-pane> -->
  </el-tabs>

</template>

<script>
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
      components: {ElFormItem},
      name: "submit-review",
        data() {
          return {
            nowpaper:{
              name:'',
              score1:'',
              score2:'',
              score3:'',
              confidence1:'',
              confidence2:'',
              confidence3:'',
              review1:'',
              review2:'',
              review3:'',
            },
            ruleForm: {
              score:-2,
              confidence:-2,
              desc: ''
            },
            rules: {
              score: [
                { required: true, message: '请选择稿件评分', trigger: 'change' }
              ],
              confidence: [
                { required: true, message: '请选择confidence', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写稿件评语', trigger: 'blur' },
                { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' }
              ]
            }
          };
        },
        methods: {
          submitForm(formName) {
            console.log(this.$store.state.nowpaper.title);
            console.log(this.$store.state.nowpaper.conferenceFullname);

            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$axios.post('/submitReview',{
                  conferenceFullname:this.$store.state.nowpaper.conferenceFullname,
                  username:this.$store.state.userDetail.username,
                  paperTitle:this.$store.state.nowpaper.title,
                  score:this.ruleForm.score,
                  confidence:this.ruleForm.confidence,
                  describe:this.ruleForm.desc,
                  }
                )
                  .then(resp => {
                    // 根据后端的返回数据修改
                    if(resp.status === 200 ) {
                      // 跳转到login
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      });
                      this.$router.replace('/home')
                    }else
                    this.$message.error('提交失败');

                  })
                  .catch(error => {
                    console.log(error);
                    this.$message.error('捕捉错误');
                  })
              } else {
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        },
      created:
      function () {
        this.nowpaper=this.$store.state.nowpaper;
      }
    }
</script>

<style scoped>

</style>
