<template>
  
  <div class="login">
    <h1>欢迎来到manage管理系统</h1>
    <!-- <h2>登录/注册</h2> -->
    <el-tabs type="border-card" class="login-tabs" stretch @tab-click="handleTabsClick">
      
      <el-tab-pane label="用户登录" name="">
        <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-Form">

          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">点击登录</el-button>
            <el-button type="info" @click="resetForm('loginForm')">清空列表</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>


      <el-tab-pane label="用户注册" name="register">

        <el-form ref="registerForm" :model="registerForm" status-icon :rules="rules" class="login-Form">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="verifypassword">
            <el-input type="password" v-model="registerForm.verifypassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">点击注册</el-button>
            <el-button type="info" @click="resetForm('registerForm')">清空列表</el-button>
          </el-form-item>
        </el-form>


      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
// 引入登录、注册等网络请求
//import api from '../api'

import { mapMutations } from "vuex"


export default {
  name: "Login",
  data() {
    //具体验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入用户名"))
      }
      callback()
    }

    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码"))
      } else if (value.length < 3) {
        callback(new Error("密码长度不够"))
      }
      callback()
    }
    var validateVerifyPassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入二次密码"))
      } else if (value != this.registerForm.password) {
        callback(new Error("密码不一致"))
      }
      callback()

    }

    return {
      currentIndex: "login",
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        verifypassword: '',
      },
      backImg:"../../public/backImg/back1.jpg",

      activeTab: "",
      //验证规则
      rules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePassWord, trigger: 'blur' }],
        verifypassword: [{ validator: validateVerifyPassWord, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeTab === "") {
            //console.log(this.loginForm)
            //登录
            this.$api.login({
              username: this.loginForm.username,
              password: this.loginForm.password
            }).then(res => {
              console.log(res)
              if (res.status === 200) {
                this.setUser(res)
                localStorage.setItem("ezManage",
                  JSON.stringify(res)
                );
                this.$router.push('/')
                this.$notify({
                  title: '成功',
                  message: '登录成功！',
                  type: 'success',
                  position: 'top-left'
                });

              } else {
                this.$notify.error({
                  title: '登录失败',
                  message: '用户名或密码错误',
                  position: 'top-left'
                });
              }
            })
          }
          //注册
          if (this.activeTab === "register") {
            //console.log(this.registerForm)
            this.$api.register({
              username: this.registerForm.username,
              password: this.registerForm.password
            }).then(res => {
              //用户名验证
              if (res.token) {
                this.$notify.error({
                  title: '注册失败！',
                  message: '该用户已存在,换一个用户名吧~',
                  position: 'top-left'
                });
              } else
                if (res.status === 200) {
                  this.$notify({
                    title: '注册成功！',
                    message: '请前往登录页面进行登录操作',
                    type: 'success',
                    position: 'top-left'
                  });
                  this.$refs[formName].resetFields();
                } else {
                  console.log('error submit!!');
                  this.$notify.error({
                    title: '注册失败！',
                    message: '请填入正确的注册信息,重新进行注册',
                    position: 'top-left'
                  });
                  return false;
                }
            })
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleTabsClick(tab) {
      //console.log(tab.name)
      this.activeTab = tab.name
    }
  },
}
</script>

<style scoped lang="less">
/*
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312
宋体：SimSuncss中中文字体（font-family）的英文名称

Mac OS的一些：
华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light

Windows的一些：
新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei

装Office会生出来的一些：
隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei

*/

h1{
  margin-top: 50px;
  color: rgb(61, 57, 179);
  font-family:STFangsong
}
.login {
  

  background: url("../../public/backImg/back1.jpg");
  background-repeat: no-repeat;//将图片样式不重复
  background-size: 100% 100%;  //设置图片大小
  position: fixed; /* 充满全屏 */
  height: 100%; //设置div高度
  width: 100%; //设置div宽度
  

  .login-Form {

    padding: 40px 60px;
    
  }

  .login-tabs {
  width: 600px;
  margin:  auto;
  margin-top: 40px;
  //border: 2px double #cec7c7;
  opacity: 0.9;
  }

}
</style>