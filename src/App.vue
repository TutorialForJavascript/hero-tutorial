<template>
  <div id="app">
    <el-container>
      <el-header height="120">
        <header>
          <el-row :gutter="10" type="flex" justify="center">
            <h1>英雄指南</h1>
          </el-row>
          <el-row :gutter="10" type="flex" justify="center">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1">仪表盘</el-menu-item>
              <el-menu-item index="2">英雄列表</el-menu-item>
            </el-menu>
          </el-row>
          <el-divider></el-divider>
        </header>
      </el-header>
      <el-main>
        <Dashboard></Dashboard>
        <Herolist></Herolist>
        <Herodetail></Herodetail>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Dashboard from "./views/Dashboard.vue";
import Herodetail from "./views/Herodetail.vue";
import Herolist from "./views/Herolist.vue";

export default {
  name: "app",
  data() {
    return {
      activeIndex: "1"
    };
  },
  components: { Dashboard, Herodetail, Herolist }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
