<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <h1>英雄详情</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-card shadow="hover" v-if="id">
          <template v-slot:header>
            <div class="clearfix">
              <span>{{ hero.id }}</span>
            </div>
          </template>
          <div>
            名字：
            <el-input v-model="hero.name" :placeholder="hero.name"></el-input>
            <el-button type="primary" round @click="submitHero">提交</el-button>
            <el-button type="primary" round @click="goBack">后退</el-button>
          </div>
        </el-card>
        <el-card shadow="hover" v-else>
          名字：
          <el-input v-model="hero.name" placeholder="请输入英雄的名字"></el-input>
          <el-button type="primary" round @click="randomHeroQuality">随机生成</el-button>
          <el-button type="primary" round @click="submitHero" v-if="has_quality">提交</el-button>
        </el-card>
      </el-col>
      <el-col :span="12" v-if="has_quality">
        <h4>英雄属性</h4>
        <ve-radar :data="chartData"></ve-radar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { random100 } from "../utils";

export default {
  name: "herodetail",
  data: function() {
    return {
      hero: {
        name: "",
        quality: {}
      }
    };
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    has_quality: function() {
      if (Object.keys(this.hero.quality).length !== 0) {
        return true;
      } else {
        return false;
      }
    },
    chartData: function() {
      let data = {
        columns: ["name", ...Object.keys(this.hero.quality)],
        rows: [
          {
            name: "max",
            速度: 100,
            成长性: 100,
            持久力: 100,
            破坏力: 100,
            精密度: 100,
            射程距离: 100
          },
          { name: this.hero.name, ...this.hero.quality }
        ]
      };
      console.log(data);
      return data;
    }
  },
  methods: {
    ...mapActions("herolist", ["appendHero", "updateHero"]),
    submitHero: function() {
      if (this.id) {
        let hero = { ...this.hero };
        this.updateHero({ heroId: Number(this.id), source: hero });
        this.hero = Object.assign(this.hero, hero);
      } else {
        let hero = { ...this.hero };
        console.log("************hero")
        console.log(hero)
        this.appendHero({ heroObj: hero });
        this.hero.name = "";
        this.hero.quality = {};
      }
    },
    randomHeroQuality: function() {
      this.hero.quality = {
        速度: random100(),
        成长性: random100(),
        持久力: random100(),
        破坏力: random100(),
        精密度: random100(),
        射程距离: random100()
      };
    },
    goBack: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  watch: {
    id: function(newVal, oldVal) {
      if (newVal === null) {
        this.hero = {
          name: "",
          quality: {}
        };
      }
    }
  },
  created: async function() {
    let heroId = Number(this.id);
    if (heroId) {
      console.log(`url: /hero/${heroId}`);
      this.createdPromise = this.$axios.get(`/hero/${heroId}`);
    }
  },
  mounted: async function() {
    let heroId = Number(this.id);
    if (heroId) {
      let response = await this.createdPromise;
      this.hero = response.data.result;
      console.log(this.hero);
    }
  }
};
</script>
