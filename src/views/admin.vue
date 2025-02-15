<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <navbar></navbar>
      </el-header>
      <el-container>
        <el-aside width="">
          <side-bar></side-bar>
        </el-aside>
        <el-container class="admin-widget">
          <el-main>
            <router-view />
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import navbar from '../components/navbar.vue';
import SideBar from '../components/side-bar.vue';

</script>

<style type="text/css">

</style>