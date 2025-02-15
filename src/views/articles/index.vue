<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>后台首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章</el-breadcrumb-item>
    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <template #header>
      <div class="card-header">
        <el-button type="primary" plain @click="toAddArticle">新增文章</el-button>
      </div>
    </template>

    <el-form 
      :inline="true" 
      :model="form" 
      label-width="auto">
      <el-form-item label="关键词">
        <el-input v-model='keyword'/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="isShow" style="width: 100px">
          <el-option label="显示" value="1"/>
          <el-option label="隐藏" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchHandle">搜索</el-button>
        <el-button @click='resetHandle'>重置</el-button>
      </el-form-item>
    </el-form>


    <el-table 
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="created_at" label="时间" width="180" />
      <el-table-column fixed="right" label="操作" min-width="30" v-slot="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button link type="danger" size="small" @click="handleClick">删除</el-button>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-pagination background layout="prev, pager, next" :total="total" 
        @current-change="currentChange"
      />
    </template>
    
  </el-card>

</template>


<script setup>
import {ref} from 'vue';
import { useRouter, useRoute } from 'vue-router'

import { ElMessage } from 'element-plus';

const router = useRouter()
// const route = useRoute()

const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const keyword = ref('');
const isShow = ref('1');
const form = null;


const value = ref('b')

async function loadArticles () {
  console.log('登录');
  var payload = JSON.stringify({});
  var jsonHeaders = new Headers({ 'Content-Type':'application/json' });
  const searchParams = new URLSearchParams();
  searchParams.append('page', page.value);
  if(keyword) searchParams.append('keyword', keyword.value);
  searchParams.append('is_show', isShow.value);

  let url = 'http://127.0.0.1:3000/v1/articles?' + searchParams.toString();
  console.log('url ', url);
  var response = await fetch(url, {
      method:'GET',
      headers:jsonHeaders
  });
  var responseJson = await response.json();
  if(response.status == 200){
    total.value = parseInt( response.headers.get('X-Total') );
    console.log('@@',total.value);
    // tableData.value.push(...responseJson);
    tableData.value = responseJson;

  }else{
    let error = responseJson.error ? responseJson.error : '登录失败';
    ElMessage({ message:error, type:'error' });
  }
}

loadArticles();

function currentChange(e){
  console.log('keyword ', keyword.value);
  page.value = e;
  loadArticles();
}

function handleClick(){
  ElMessage({ message:'功能开发中', type:'error' });
}


function searchHandle(){
  page.value = 1;
  loadArticles();
}

function resetHandle(){
  page.value = 1;
  keyword.value = '';
  loadArticles();
}

function handleEdit(e){
  console.log('e: ',e);
  let id = e;
  router.push('/admin/articles/'+id);
}

function toAddArticle(){
  router.push('/admin/articles/add');
}

</script>


