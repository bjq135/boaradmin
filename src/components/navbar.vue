<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
        style="height:40px"
        src="/site-logo.png"
        alt="Element logo"
      />
    </el-menu-item>
    <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <el-menu-item index="2-1">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
