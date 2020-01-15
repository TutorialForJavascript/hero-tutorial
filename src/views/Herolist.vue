<template>
  <div class="herolist">
    <el-row type="flex" justify="center">
      <h2>Hero List</h2>
    </el-row>
    <el-row type="flex" justify="center">
      <el-table :data="heros" style="width: 100%">
        <el-table-column label="id" width="180" align="center">
          <template v-slot:default="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="name" width="180" align="center">
          <template v-slot:default="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot:default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "herolist",
  computed: {
    ...mapState("herolist", {
      heros: state => state.heros
    })
  },
  methods: {
    handleEdit(index, row) {
      let id = row.id.toString();
      this.$router.push({
        name: "Herodetail",
        params: { id }
      });
    },
    handleDelete(index, row) {
      this.deleteHero({ heroId: row.id });
    },
    ...mapActions("herolist", ["deleteHero"])
  },
  created: function() {
    this.$store.dispatch("herolist/syncHeros");
  }
};
</script>