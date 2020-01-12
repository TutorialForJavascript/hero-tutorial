<template>
  <div class="dashboard">
    <el-row type="flex" justify="center">
      <h2>Top Heros</h2>
    </el-row>
    <el-row :gutter="1" type="flex" justify="space-around" v-for="(hero,index) in first5heros" :key="index">
      <el-col :span="4">
        <el-card shadow="hover">{{ hero.name }}</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters("herolist", ["first5heros"])
  }
};
</script>
