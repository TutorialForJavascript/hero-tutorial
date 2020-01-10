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
          名字：
          <el-input v-model="hero_name" :placeholder="hero.name"></el-input>
          <el-button type="primary" round @click=submitHero>提交</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "herolist",
  data: function() {
    return {
      hero_name: "",
      hero: {
        id: 1,
        name: "隐者之紫"
      }
    };
  },
  methods: {
    submitHero: function (){
      if (this.hero){
        this.hero=Object.assign(this.hero,{name:this.hero_name})
        this.hero_name=""
      }
    }
  }
};
</script>
