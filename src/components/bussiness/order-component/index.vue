<template>
  <div class="order-component">
     <CustomTable
      class="m-b-15"
      :data="data"
      id="orderList"
      rowKey="id"
      @currentChange="handleCurrentChange"
      :tableHeader="tableHeader"
    ></CustomTable>
     <CustomTable
      class="m-b-15"
      :data="data1"
      id="materialList"
      rowKey="id"
      @currentChange="handleCurrentChange1"
      :tableHeader="tableHeader1"
    ></CustomTable>
  </div>
</template>
<script>
export default {
  name: 'order-component',
  data () {
    return {
      data1: [],
      tableHeader1: [
        {
          fieldName: 'materielCode',
          fieldExplain: '物料编码'
        },
        {
          fieldName: 'materielName',
          fieldExplain: '物流名称'
        }
      ]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tableHeader: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleCurrentChange () {

    },
    handleCurrentChange1 () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
