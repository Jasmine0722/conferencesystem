<template>
    <el-tabs type="border-card">
      <el-tab-pane label="申请会议">
        <div id="base_register">
        <el-form :model="meetingForm" :rules="rules" class="demo-dynamic" label-position="left" v-loading="loading" :ref="meetingForm" label-width="180px">
          <!-- <h2 class="register_title">Meeting Application</h2> -->
          <el-form-item prop="abbr" label="会议简称 ：" class="left">
            <el-input id ="1" type="text"  v-model="meetingForm.abbr" auto-complete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item prop="fullName" label="会议全称 ：" class="left">
            <el-input id ="2" type="text" v-model="meetingForm.fullName" auto-complete="off" class="input"></el-input>
          </el-form-item>
          <el-form-item prop="holdPlace" label="会议开设地点 ：" class="left">
            <el-input id ="3" type="text" v-model="meetingForm.holdPlace" auto-complete="off" class="input"></el-input>
          </el-form-item>

          <el-form-item prop="holdDate" label="会议开设时间 ：" class="left">
            <el-time-select v-model="meetingForm.holdDate"  id ="4" :picker-options="{ start: '08:30', step: '00:15', end: '18:30'}" class="input">
            </el-time-select>
          </el-form-item>


          <el-form-item prop="submissionDeadline" label="投稿截止日期 ：" class="left">
            <el-date-picker id="5" v-model="meetingForm.submissionDeadline"
              :picker-options="pickerOptionsStart" type="date" class="input">
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="releaseDate"  label="评审结果发布日期 ：" class="left">
            <el-date-picker id="6" v-model="meetingForm.releaseDate"
              :picker-options="pickerOptionsEnd" type="date" class="input">
            </el-date-picker>
          </el-form-item>

            <el-form-item prop="topic" label="主题 ：" :rules="[ { required: true, message: '请输入会议主题', trigger: 'blur' },
            { type: '', message: '请输入正确的主题', trigger: ['blur', 'change'] } ]" class="left">
              <el-input v-model="meetingForm.topic" class="input"></el-input>
            </el-form-item>

            <el-form-item v-for="(domain, index) in meetingForm.topics" :label="'主题' + (index+2) +' :'" :key="domain.key "
                          :prop="'topics.' + index + '.value'" :rules="{ required: true, message: '主题不能为空', trigger: 'blur'}" class="left">
              <el-input v-model="domain.value" class="input"></el-input>
              <el-button @click.prevent="removeDomain(domain)" class="deleatebutton">删除</el-button>
            </el-form-item >
            <el-form-item class="topicbutton">
              <el-button @click="addDomain" >新增主题</el-button>
            </el-form-item>

          <el-form-item style="width: 100%">
            <el-button type="primary" icon="el-icon-thumb" v-on:click="submit(meetingForm)">apply</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-tab-pane>

      <!-- <el-tab-pane label="更多功能">等得花都谢了</el-tab-pane> -->
    </el-tabs>


</template>

<script >
  export default {
    name: 'applyConference',
    data() {
      const dataValid = (rule, value, callback) => {
        if(!value || value === '') {
          return callback(new Error('Can\'t be empty'))
        }
        return callback()
      }

      return {


        username:'',
        meetingForm: {
          abbr: '',
          fullName: '',
          holdDate: '',
          holdPlace: '',
          submissionDeadline: '',
          releaseDate: '',
          topic:'',
          topics: [{
            value: ''
          }],

        },
        pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.meetingForm.releaseDate;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime() || time.getTime() < Date.now();
            }else{
              return time.getTime() < Date.now();
            }


          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.meetingForm.submissionDeadline;
            if (beginDateVal) {
              return (
                time.getTime() < new Date(beginDateVal).getTime()
              );
            }else{
              return time.getTime() < Date.now();
            }


          }
        },





        rules: {
          abbr:[ {required: true, message: '请输入会议简称', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          fullName:[{required: true, message: '请输入会议全称', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          holdDate: [{required: true, message: '请选择会议时间', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          holdPlace: [{required: true, message: '请输入会议地点', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          submissionDeadline: [{required: true, message: '请选择投稿截止日期', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          releaseDate: [{required: true, message: '请选择结果发布日期', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
        },
        loading: false
      }
    },
    methods: {

      submit(formName){

        if(document.getElementById("1").value==''||document.getElementById("1").value==undefined||document.getElementById("1").value==null||
           document.getElementById("2").value==''||document.getElementById("2").value==undefined||document.getElementById("2").value==null||
           document.getElementById("3").value==''||document.getElementById("3").value==undefined||document.getElementById("3").value==null||
           document.getElementById("4").value==''||document.getElementById("4").value==undefined||document.getElementById("4").value==null||
           document.getElementById("5").value==''||document.getElementById("5").value==undefined||document.getElementById("5").value==null||
           document.getElementById("6").value==''||document.getElementById("6").value==undefined||document.getElementById("6").value==null
        )
          this.$message({
            message: '请输入完整信息',
            type: 'warning'
          });
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$axios.post('/applyConference',{
                username:this.username,
                abbr: this.meetingForm.abbr,
                fullName: this.meetingForm.fullName,
                holdDate: this.meetingForm. holdDate,
                holdPlace: this.meetingForm. holdPlace,
                submissionDeadline: this.meetingForm.submissionDeadline,
                releaseDate: this.meetingForm.releaseDate,
                topic:this.meetingForm.topic,
                topics:this.meetingForm.topics,
              }
            )
              .then(resp => {
                // 根据后端的返回数据修改
                if(resp.status === 200 ) {
                  // 跳转到login
                  this.$message({
                    message: '申请提交成功',
                    type: 'success'
                  });
                  this.$router.replace('/allConference')
                }else
                  this.$message.error('提交失败');

              })
              .catch(error => {
                console.log(error);
                this.$message.error('捕捉到错误');
              })
          } else {
            this.$message({
              message: '请输入完整信息！',
              type: 'warning'
            });
          }
        })
      },

      removeDomain(item) {
        var index = this.meetingForm.topics.indexOf(item)
        if (index !== -1) {
          this.meetingForm.topics.splice(index, 1)
        }
      },
      addDomain() {
        this.meetingForm.topics.push({
          value: '',
          key: Date.now()
        });
      },

      },

    created:
      function(){
        this.username=JSON.parse(localStorage.getItem('userDetail')).username
      }
    }

</script>

<style scoped>
  #base_register{
    height: 100%;
    width: 100%;
    background-size: cover;
    position: relative;
    padding:100px auto;
  }

  .register_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .input{
    width:60%;
    float: left;
  }
  .deleatebutton{
    float: left;
    margin-left: 30px;
  }
  .topicbutton{
  }

  .left{
    margin-left: 50px;
  }
</style>
