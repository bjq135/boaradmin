<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <h2>BoarCMS</h2>
        <p class="mt-15">开箱即用的中台前端/设计解决方案</p>
        <ul class="mt-20">
          <li>内置常用模板</li>
          <li>样式美观大方</li>
          <li>丰富的布局模式</li>
          <li>轻量灵活的框架</li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-row>
          <el-col :span="20">
            <h3>浏览数</h3>
            <h2>6786787</h2>
          </el-col>
          <el-col :span="4">
            <el-icon :size="25" :color="color">
              <View />
            </el-icon>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mt-20">
        <el-row>
          <el-col :span="20">
            <h3>分类数</h3>
            <h2>28</h2>
          </el-col>
          <el-col :span="4">
            <el-icon :size="25" :color="color">
              <Folder />
            </el-icon>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-row>
          <el-col :span="20">
            <h3>文章数</h3>
            <h2>1222</h2>
          </el-col>
          <el-col :span="4">
            <el-icon :size="25" :color="color">
              <Document />
            </el-icon>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mt-20">
        <el-row>
          <el-col :span="20">
            <h3>页面数</h3>
            <h2>23</h2>
          </el-col>
          <el-col :span="4">
            <el-icon :size="25" :color="color">
              <Memo />
            </el-icon>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  
  <el-row class="mt-20">
    <el-col :span="24">
      <el-card>
        <template #header>
          <h3>访问趋势</h3>
        </template>
        <canvas id="myChart" width="400" height="100"></canvas>
      </el-card>
    </el-col>
  </el-row>
</template>


<script setup>
import { reactive, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const form = reactive({
  size: '50',
});

onMounted(() => {
  console.log(`the component is now mounted.`);
  initChartJS();
});


function initChartJS(){
  console.log(123);
  var ctx = document.getElementById("myChart");
  
  const labels = ['2025-01','2025-02','2025-03','2025-04','2025-05','2025-06'];

  // const labels = Utils.months({count: 7});
  const data = {
    labels: labels,
    datasets: [
      {
        label: '最近访问',
        data: [65, 59, 80, 81, 56, 2000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: '最近访问',
        data: [800, 200, 280, 281, 356, 1000],
        fill: false,
        borderColor: 'rgb(75, 70, 70)',
        tension: 0.1
      },
    ]
  };
  const config = {
    type: 'line',
    data: data,
  };
  var myLineChart = new Chart(ctx, config);

}
</script>


<style scoped>
#myChart{
  width: 600px;
  height: 300px;
}
</style>