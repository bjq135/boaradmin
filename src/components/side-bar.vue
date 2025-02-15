<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse-transition=false
    :router="true"
  >
    <el-menu-item index="/admin/index">
      <Setting />
      <span>系统首页</span>
    </el-menu-item>
    <!--  <el-menu-item index="2">
      <Setting />
      <span>站点设置</span>
    </el-menu-item> -->
    <el-sub-menu index="3">
      <template #title>
        <Setting />
        <span>文章管理</span>
      </template>
      <el-menu-item index="/admin/articles/index">文章</el-menu-item>
      <el-menu-item index="/admin/categories/index">分类</el-menu-item>
      <el-menu-item index="/admin/pages/index">页面</el-menu-item>
      <el-menu-item index="/admin/tags/index">标签</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <Setting />
        <span>用户管理</span>
      </template>
      <el-menu-item index="/admin/users/index">用户</el-menu-item>
      <el-menu-item index="/admin/users/captcha">验证码</el-menu-item>
      <el-menu-item index="/admin/users/logs">日志</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/admin/assets">
      <setting />
      <span>附件</span>
    </el-menu-item>
  </el-menu>
</template>


<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

