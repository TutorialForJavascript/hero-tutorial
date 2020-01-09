<template>
  <div class="dashboard">
    <el-row type="flex" justify="center">
      <h2>Top Heros</h2>
    </el-row>
    <el-row :gutter="1" type="flex" justify="space-around">

      <el-col :span="4">
        <el-card shadow="hover">白金之星</el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">红色魔术师</el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">隐者之紫</el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">法皇</el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">银色战车</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dashboard"
  
};
</script>
