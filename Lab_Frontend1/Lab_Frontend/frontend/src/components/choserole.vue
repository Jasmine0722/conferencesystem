<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="身份选择">

        <el-radio-group v-model="radioTreaty" @change="selectpart">
          <el-radio v-model="radio1" label="1" border v-if="this.role.chair != ''" >chair</el-radio>
          <el-radio v-model="radio1" label="2" border v-if="this.role.member!= ''" >PC member</el-radio>
          <el-radio v-model="radio1" label="3" border v-if="this.role.author != ''">author</el-radio>
          <el-radio v-model="radio1" label="4" border  v-if="this.role.chair == ''&&username !== chair">tourist</el-radio>
        </el-radio-group>
        <el-button @click="enter()">进入会议</el-button>
      </el-tab-pane>
      <!-- <el-tab-pane label="更多功能">敬请期待</el-tab-pane> -->

    </el-tabs>
  </div>
</template>

<script>
    import ElForm from "element-ui/packages/form/src/form";

    export default {
      components: {ElForm},
      name: "choserole",
      data(){
          return{
            username:this.$store.state.userDetail.username,
            chair:this.$store.state.nowconference.chair,
            radioTreaty: '1',
            role:{
              chair:'',
              member:'',
              author:'',
              tourist:'',
            },

            temprole:{
              chair:'',
              member:'',
              author:'',
              tourist:'',
            },
            radio1: '1',

          }
      },
      methods:{
          selectpart:function (val) {
            if(val==='1'){

              this.$message('您选择了主席身份！');
              this.temprole.chair='chair';
              this.temprole.member='';
              this.temprole.author='';
            }else if(val==='2'){

              if(this.role.chair !== ''){
                this.$message('你选择了成员（主席）身份！');
                this.temprole.member='chairmember';
              }else{
                this.$message('您选择了成员身份！');
                this.temprole.member='member';
              }
              this.temprole.chair='';
              this.temprole.author='';
            }else if(val==='3'){
              this.$message('您选择了投稿人身份！');
              this.temprole.chair='';
              this.temprole.member='';
              this.temprole.author='author';
            }else{
              this.$message('您选择了游客身份！');
              this.temprole.chair='';
              this.temprole.member='';
              this.temprole.author='';
            }
          },

          enter:function () {
            this.$store.commit('myrole',this.temprole);
            this.$router.replace({path:'/conferenceDetail'})
          },
      },

      created:
      function () {
        this.role=this.$store.state.myrole;
        if(this.role.chair !== ''){
          this.temprole.chair='chair';
        }else if(this.role.member != ''){
          this.temprole.member='member';
        }else if(this.role.author !=''){
          this.temprole.author='author';
        }else{
          this.temprole.tourist='';
        }
      }
    }
</script>

<style scoped>

</style>
