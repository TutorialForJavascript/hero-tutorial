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
        <el-card shadow="hover">
          <span>{{ hero.name }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="handleEdit(hero)">修改</el-button>
          </div>
        </el-card>
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
  },
  methods: {
    handleEdit(hero) {
      this.$router.push({
        name: "Herodetail",
        params: { id: hero.id.toString() }
      });
    }
  },
  created: function () {
   this.$store.dispatch('herolist/syncHeros')
  }
};
</script>
