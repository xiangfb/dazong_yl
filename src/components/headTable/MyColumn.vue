<template>

  <el-table-column :prop="col.prop"
    :label="col.label"
    :width="col.width===0?'':col.width"
    :show-overflow-tooltip="true"
    align="center">

    <template v-if="col.children">
      <my-column v-for="(item, index) in col.children"
        :key="index"
        :col="item"></my-column>
    </template>

  </el-table-column>
</template>

<script>
export default {
  name: 'MyColumn',
  props: {
    col: {
      type: Object
    }
  }
}
</script>
<style scoped>
</style>
