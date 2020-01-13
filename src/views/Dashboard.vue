<template>
  <div class="dashboard">
    <el-row type="flex" justify="center">
      <h2>Top Heros</h2>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col
        :span="Math.floor(24/first5heros.length)"
        v-for="(hero,index) in first5heros"
        :key="index"
      >
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
