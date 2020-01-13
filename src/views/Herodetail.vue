<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <h1>英雄详情</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="clearfix" v-if="hero">
            <span>{{ hero.id }}</span>
          </div>
        </template>
        <div>
          <div v-if="hero">
            名字：
            <el-input v-model="hero_name" :placeholder="hero.name"></el-input>
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
import { mapActions } from "vuex";

export default {
  name: "herodetail",
  data: function() {
    return {
      hero_name: ""
    };
  },
  computed: {
    hero: function(){
      let heroId = null
      return this.$store.getters['herolist/getHero'](heroId)
    }
  },
  methods: {
    ...mapActions("herolist", ["appendHero", "updateHero"]),
    submitHero: function() {
      if (this.hero) {
        let hero = {...this.hero}
        hero = Object.assign(hero, { name: this.hero_name });
        this.hero_name = "";
        this.updateHero({ heroId: 1, source: hero });
      } else {
        let hero = { name: this.hero_name };
        this.hero_name = "";
        this.appendHero({ heroObj: hero });
      }
    }
  }
};
</script>
