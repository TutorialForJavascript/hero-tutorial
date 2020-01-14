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
          <el-button type="primary" round @click="goBack" v-if="hero!==null">后退</el-button>
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
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    hero: function() {
      //let heroId = this.$route.params.id;
      let heroId = Number(this.id);
      //let heroId = null
      let h = this.$store.getters["herolist/getHero"](heroId);
      return h;
    }
  },
  methods: {
    ...mapActions("herolist", ["appendHero", "updateHero"]),
    submitHero: function() {
      if (this.hero) {
        let hero = { ...this.hero };
        hero = Object.assign(hero, { name: this.hero_name });
        this.hero_name = "";
        this.updateHero({ heroId: this.id, source: hero });
        
      } else {
        let hero = { name: this.hero_name };
        this.hero_name = "";
        this.appendHero({ heroObj: hero });
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
