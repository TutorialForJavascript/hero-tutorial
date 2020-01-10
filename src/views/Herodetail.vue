<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <h1>英雄详情</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="clearfix" v-if="hero(1)">
            <span>{{ hero(1).id }}</span>
          </div>
        </template>
        <div>
          <div v-if="hero(1)">
            名字：
            <el-input v-model="hero_name" :placeholder="hero(1).name"></el-input>
          </div>
          <div v-else>
            名字：
            <el-input v-model="hero_name" placeholder="请输入英雄的名字"></el-input>
          </div>
          <el-button type="primary" round @click="submitHero">提交</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "herodetail",
  data: function() {
    return {
      hero_name: ""
    };
  },
  computed: {
    ...mapGetters("herolist", ["hero"])
  },
  methods: {
    ...mapActions("herolist", ["appendHero", "updateHero"]),
    submitHero: function() {
      let hero = this.hero(1);
      if (hero) {
        hero = Object.assign(hero, { name: this.hero_name });
        this.hero_name = "";
        this.updateHero({ heroId: 1, source: hero });
      } else {
        console.log(this.appendHero);
        hero = { name: this.hero_name };
        this.appendHero({ heroObj: hero });
        //this.$store.dispatch("herolist/appendHero",{heroObj:hero})
      }
    }
  }
};
</script>
