<template>
  <div :style="{'max-height': `300px`, 'overflow-y': 'auto'}">
    <el-tree
      :data="treeData"
      ref="tree"
      class="p-10"
      show-checkbox
      :props="defaultProps"
      @node-click="nodeClick">
      <div slot-scope="data">
        {{setDefaultProps(data)}}
      </div>
    </el-tree>
  </div>
</template>

<script>
import Ajax from '_router/ajax'
import Config from 'config'
export default {
  data () {
    return {
      treeData: []
    }
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    defaultProps: { // 配置选项
      type: Object,
      default () {
        return {
          searchKey: '',
          label: ''
        }
      }
    }
  },
  watch: {
    fieldData: {
      handler: 'getFieldData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    setDefaultProps (data) {
      let ary = this.defaultProps.label.split(',')
      let str = ''
      for (let item in data.data) {
        if (ary.indexOf(item) > -1) {
          str += data.data[item] + ' '
        }
      }
      return str
    },
    nodeClick (data, node, event) { // 点击节点触发
      this.$emit('node-click', data, node, event)
    },
    getSelectionList () {
      return this.$refs.tree.getCheckedNodes()
    },
    getFieldData (val) {
      this.getData()
    },
    getData () {
      if (this.fieldData.treeResUrl) {
        Ajax[this.fieldData.treeResMethod.toLowerCase()]({
          url: Config.service.api + this.fieldData.treeResUrl
        }).then(res => {
          this.treeData = this.mapLoop(res)
        })
      }
    },
    mapLoop (data) {
      return data.map(item => {
        if (item.children) {
          item.children = this.mapLoop(item.children)
        }
        return {
          ...item,
          ...item.jsonObject,
          id: item.jsonObject.id
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
