<template>
  <div class="auth-widget">
    <h2>登录</h2>
    <el-input v-model="account" placeholder="请输入账户" />
    <el-input v-model="password" type="password" placeholder="请输入密码" />
    <el-button type="primary" v-on:click="login(account, password)">登录</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';


const account = ref('');
const password = ref('');

async function login (account, password) {
  console.log('登录');
  var payload = JSON.stringify({ account, password });
  var jsonHeaders = new Headers({ 'Content-Type':'application/json' });
  var response = await fetch('http://127.0.0.1:3000/v1/auth/login', {
      method:'POST',
      body:payload,
      headers:jsonHeaders
  });
  var responseJson = await response.json();
  if(response.status == 200){
    console.log('json1: ',  responseJson);
    if(responseJson.token){
      localStorage.setItem('token', responseJson.token);
      location.href = '/admin/index'
    }else{
      ElMessage({message:'登录失败',type:'error'});
    }
  }else{
    let error = responseJson.error ? responseJson.error : '登录失败';
    ElMessage({ message:error, type:'error' });
  }
}

</script>

<style>
.auth-widget{
  padding: 20px;
  background-color: var(--vt-bg-color-card);
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 100px auto 0 auto;
  align-items: center;
  box-shadow: 0 0 10px var(--vt-border-color);
  border-radius: var(--vt-border-radius);
}
.auth-widget h2{
  margin: 0px 0 10px 0;
  font-weight: bold;
}
.auth-widget .el-input{
  margin: 0 0 15px;
}
</style>