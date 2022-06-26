<template>
  <el-tabs type="border-card">
    <el-tab-pane label="欢迎投稿">
      <div id="base_register">
        <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
                 label-width="0px" v-loading="loading" :ref="registerForm">
          <h3 class="register_title">Hand in writing</h3>
          <el-form-item prop="username">
            <el-input type="text" v-model="registerForm.username"
                      auto-complete="off" placeholder="文章标题" required></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input  type="textarea"
                       :rows="3" v-model="registerForm.password"
                       auto-complete="off" placeholder="文章摘要" required></el-input>
          </el-form-item>
          <el-checkbox-group
            :min="1"
            :max="topics.length"
            v-model="topic"
            @change="handleCheckChange">
            <el-checkbox
              v-for="(item,index) in topics"
              :key="index"
              :label="item"
            >
              {{item}}</el-checkbox>
          </el-checkbox-group>

          <el-button type="text" @click="dialogTableVisible = true">添加作者信息</el-button>
          <el-dialog title="作者信息" :visible.sync="dialogTableVisible">
            <el-table :data="writers" style="width: 100%">
              <el-table-column prop="name" label="姓名">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.name"
                    v-show="scope.row.showEdit"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-show="!scope.row.showEdit">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="job" label="单位">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.job"
                    v-show="scope.row.showEdit"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-show="!scope.row.showEdit">{{scope.row.job}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="国家/地区">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.address"
                    v-show="scope.row.showEdit"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-show="!scope.row.showEdit">{{scope.row.address}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="email" label="邮箱">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.email"
                    v-show="scope.row.showEdit"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-show="!scope.row.showEdit">{{scope.row.email}}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="310px">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    class="btn bg_green"
                    @click="handleEdit(scope.$index, scope.row)"
                  >{{scope.row.showEdit?'保存':"编辑"}}</el-button>
                  <el-button
                    size="mini"
                    :disabled="scope.$index===0"
                    @click="moveUp(scope.$index,scope.row)"><i class="el-icon-arrow-up"></i></el-button>
                  <el-button
                    size="mini"
                    :disabled="scope.$index===(writers.length-1)"
                    @click="moveDown(scope.$index,scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                  <el-button v-model="handleAdd"
                             size="mini"
                             type="success"
                             circle plain
                             icon="el-icon-plus"
                             @click="handleAdd(scope.$index, scope.row)">
                  </el-button>
                  <el-button
                    v-model="handleDelete"
                  type="danger"
                  v-if="writers.length > 1"
                  @click="handleDelete(scope.$index, scope.row)"
                  size="mini"
                 >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
           <el-form-item>
          <div class="file-input">
            <p class="input-container">
              选择pdf
              <input type="file" id="upload" accept="application/pdf"  @change="reName">
            </p>
            <span id="name" style="color:skyblue;size:40px">请选择pdf文件</span>
          </div>
           </el-form-item>

          <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="turn(writers),handIn(),handInFile(registerForm)">handin</el-button>
        </el-form>
      </div>
    </el-tab-pane>
    <!-- <el-tab-pane label="更多功能">暂无</el-tab-pane> -->
  </el-tabs>
</template>


<script>

  export default {
    name: 'handInWriting',
    data () {
      const dataValid = (rule, value, callback) => {
        if(!value || value === '') {
          return callback(new Error('Can\'t be empty'))
        }
        return callback()
      };

      //检查账户
      const checkname = (rule,username,callback) =>{
        if(!username || username ===''){
          return callback(new Error('Can\'t be empty'))
        }
        else if(username.length >50){
          return callback(new Error('50 characters in length'))
        }
          return callback();
      };

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

      return {
        dialogTableVisible: false,
        writers:[
          {
            email: this.$store.state.userDetail.email,
            name: this.$store.state.userDetail.username,
            job: this.$store.state.userDetail.job,
            address: this.$store.state.userDetail.area,
            showEdit: false
          }],
        writerEmail:[],
        writerName:[],
        writerJob:[],
        writerAddress:[],
        userName: "",
        userId: "",
        topic:[],
        topics:[],
        registerForm: {
          username: '',
          password: '',
        },
        rules: {
          // blur 失去鼠标焦点时触发验证
          username: [{required: true, message: '请输入文章标题', trigger: 'blur'}, {validator: checkname, trigger: 'blur'}],
          password: [{required: true, message: '请填写文章摘要', trigger: 'blur'}, {validator: checkpassword, trigger: 'blur'}],
          pdf: [{required: true, message: '请选择pdf文件', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
        },
        loading: false
      }
    },
    methods: {
      reName(){
        let upload=document.getElementById('upload').value;
        let nameContainer=document.getElementById('name');
        nameContainer.innerHTML=upload;
      },
     handleCheckChange(val) {
        console.log(val)
      },
      handleEdit(index, row) {
        console.log(index, row);
        row.showEdit = !row.showEdit;
        if (!row.showEdit) {
          console.log("提交");
          console.log(row);
        }
      },
      handleAdd() {
        let row = {
          email: '',
          name: '',
          job: '',
          address: '',
          showEdit: false,
        };
        this.writers.push(row)
      },
      userTypeChange() {
      },
      moveUp(index,row){
        var that = this;
        console.log('上移',index,row);
        console.log(that.writers[index]);
        if (index > 0) {
          let upDate = that.writers[index - 1];
          that.writers.splice(index - 1, 1);
          that.writers.splice(index,0, upDate);
        } else {
          this.$message({
            message: '已经是第一条，不可上移',
            type: 'warning'
          });
        }
      },
      handleDelete(index) {
        this.writers.splice(index, 1);
        },
      moveDown(index,row){
        var that = this;
        console.log('下移',index,row);
        if ((index + 1) === that.writers.length){
          this.$message({
            message: '已经是最后一条，不可下移',
            type: 'warning'
          });
        } else {
          console.log(index);
          let downDate = that.writers[index + 1];
          that.writers.splice(index + 1, 1);
          that.writers.splice(index,0, downDate);
        }
      },
      handIn(){
        if(this.topic.length>0&&this.writerName.length>0&&
          this.writerName.length===this.writers.length&&document.querySelector('input[type=file]').files[0]!=null
          && document.querySelector('input[type=file]').files[0]!==undefined&& document.querySelector('input[type=file]').files[0]!==''
        ) {
          this.$axios.post('/sendPaper',{
              title: this.registerForm.username,
              summary: this.registerForm.password,
              username: this.$store.state.userDetail.username,
              conferenceFullname: this.$store.state.nowconference.fullName,
              writerEmail: this.writerEmail,
              writerJob: this.writerJob,
              writerName: this.writerName,
              writerAddress: this.writerAddress,
              topics: this.topic,
            },
          )
            .then(resp => {
              if (resp.status === 200) {
                if(resp.data.id == null){
                  this.$message.error('当前会议已存在该稿件，请变更title');
                }
              }
              else
                this.$message.error('提交失败');
            })
            .catch(error => {
              console.log(error);
            })
        }
        else if(this.topic.length>0&&this.writerName.length>0&&(document.querySelector('input[type=file]').files[0]==null||
            document.querySelector('input[type=file]').files[0]===undefined||document.querySelector('input[type=file]').files[0]==='')){
          this.$message({
            message: '文章至少包含一份文件',
            type: 'warning'
          })
        }else if(this.topic.length===0&&this.writerName.length>0&&document.querySelector('input[type=file]').files[0]!==null&&
            document.querySelector('input[type=file]').files[0]!==undefined&&
            document.querySelector('input[type=file]').files[0]!==''){
          this.$message({
            message: '文章至少包含一个topic',
            type: 'warning'
          })}
          else if(this.writerName.length!==this.writers.length){
          this.$message({
            message: '每个作者信息必须填写完整',
            type: 'warning'
          });
          }else{
          this.$message({
            message: '缺乏信息过多',
            type: 'warning'
          });
        }
        },
      handInFile(formname){
        if(this.topic.length>0&&this.writerName.length>0&&this.writerName.length===this.writers.length&&
          document.querySelector('input[type=file]').files[0]!==null&&
            document.querySelector('input[type=file]').files[0]!==undefined&&
            document.querySelector('input[type=file]').files[0]!==''){
          let formData = new FormData();
          formData.append('file',document.querySelector('input[type=file]').files[0]);
          formData.append('username',this.$store.state.userDetail.username);
          formData.append('title',this.registerForm.username);
          formData.append('conferenceFullname',this.$store.state.nowconference.fullName);
          this.$refs[formname].validate(valid => {
            if(valid){
              this.$axios({
                url: '/sendFile',   //****: 你的ip地址
                data: formData,
                method: 'post',
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }).then((resp) => {
                if (resp.status === 200) {
                  this.$router.replace({path:'/myWriting'});
                }
                else
                  this.$message.error('提交文件失败');
              }) // 发送请求
            }})
        }
      },
      turn(writers){
        this.writerEmail=[];
        this.writerName=[];
        this.writerJob=[];
        this.writerAddress=[];
        let a = this.writerEmail;
        let b1 = this.writerName;
        let c = this.writerJob;
        let d = this.writerAddress;
        let that =this;
        writers.forEach(function (value, key, arr) {
          if(value.name!==null&&value.name!==undefined&&value.name!==''&&
            value.email!==null&&value.email!==undefined&&value.email!==''&&
            value.job!==null&&value.job!==undefined&&value.job!==''&&
            value.address!==null&&value.address!==undefined&&value.address!==''){
            b1.push(value.name);
            a.push(value.email);
            c.push(value.job);
            d.push(value.address);
          }
          else{
            that.$message({
              message: '每个作者信息须填写完整',
              type: 'warning'
            });
          }
        });
        this.writerEmail=a;
        this.writerName=b1;
        this.writerJob=c;
        this.writerAddress=d;
      }},

      created(){
      this.topics=this.$store.state.nowconference.topics;
      }}

</script>

<style scoped>
  .file-input{
    line-height:30px;
    position:relative;
    margin-top:10px;
    margin-left:80px;
  }
  .file-input .input-container{
    width:100px;
    height:30px;
    text-align:center;
    background:lightskyblue;
    color:#fff;
    border-radius:3px;
  }
  .file-input input{
    position:absolute;
    left:0;
    top:0;
    opacity:0;
  }
  .file-input #name{
    position:absolute;
    left:100px;
    top:0;
    font-size:12px;
    color:#666;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #base_register{
    height: 100%;
    width: 100%;
    background-size: cover;
    position: relative;
  }
  .register_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .test {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }
  .test input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .test:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }
</style>
