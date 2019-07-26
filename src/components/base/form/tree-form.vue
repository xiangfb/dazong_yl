<template>
  <div class="p-b-n float-hidden">
    <div class="f-l-tree bg-white">
      <div :style="{'height': `${maxHeight - 25}px`, 'overflow-y': 'auto'}" class="p-b-n m-b-10">
        <el-tree
          ref="elTree"
          class="p-10"
          highlight-current
          node-key="id"
          @node-click="nodeClick"
          :data="treeData"
          :props="treeProps" />
      </div>
    </div>
    <div class="f-l-list bg-white">
      <CustomBtnGroup v-if="btnGroup.length > 0" class="p-10 p-b-n" @on-click="butMonitor" :limit="limit" :btn-group="btnGroup"></CustomBtnGroup>
      <form-column
        :is-show-but="true"
        width="calc(100% - 20px)"
        @submit='butMonitor'
        @popup-confirm="popupConfirm"
        :max-height="maxHeight"
        :fieldData="fieldData"
        :modelData="modelData"></form-column>
    </div>
  </div>
</template>

<script>
import FormColumn from './column.vue'
export default {
  name: 'tree-table',
  data () {
    return {
      treeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    maxHeight: {
      type: [String, Number],
      default: 1067
    },
    limit: {
      type: Number,
      default: 5
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    btnGroup: { // 按钮组
      type: Array,
      default () {
        return []
      }
    },
    fieldData: { // 模板资源数据
      type: Object,
      required: true
    },
    modelData: { // 表单数据
      type: Object,
      required: true
    }
  },
  created () {
    // setCurrentNode
  },
  mounted () {

  },
  watch: {
    treeData: {
      handler: 'getTreeData',
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    popupConfirm (data, fatherData, index, resourceList) {
      this.$emit('popup-confirm', data, fatherData, index, resourceList)
    },
    getTreeData (e) {
      let timer = setInterval(() => {
        if (this.$refs.elTree) {
          clearInterval(timer)
          this.$refs.elTree.setCurrentKey(e && e[0] && e[0].id)
        }
      }, 500)
      // console.log(this.$refs)
      // this.$refs.elTree.setCurrentNode([e.id])
    },
    nodeClick (data, node, event) { // 点击节点触发
      this.$emit('node-click', data, node, event)
    },
    butMonitor (type, data) { // 按钮组触发
      this.$emit('submit', type, data)
    }
  },
  computed: {},
  components: {
    FormColumn
  }
}
</script>

<style scoped>

</style>
