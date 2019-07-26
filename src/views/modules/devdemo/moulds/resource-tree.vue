<template>
  <div>
    <resource-tree :visible="visible" title="选择车辆类型" :tree-data="data" :default-props="defaultProps" :tree-height="treeHeight" @cancel="visible = false"/>
  </div>
</template>

<script>
import { ResourceTree } from 'components/base/index'
export default {
  data () {
    return {
      visible: true,
      treeHeight: 300,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      data: [{ 'a_attr': { 'vehcCode': '06' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '04d264a389b5414693ab34080b875363', 'state': { 'disabled': false }, 'text': '一拖二半挂', 'vehcCode': '06' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '07' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '3b22e324140049059c7fad47b5d255d6', 'state': { 'disabled': false }, 'text': '二拖三半挂', 'vehcCode': '07' }, { 'a_attr': { 'vehcCode': '05' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '4391cb88ddde46578c2bbc3aacf33a03', 'state': { 'disabled': false }, 'text': '前四后八', 'vehcCode': '05' }, { 'a_attr': { 'vehcCode': '08' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '460e06efedc246bdb574b4e901ec2bbd', 'state': { 'disabled': false }, 'text': '其它', 'vehcCode': '08' }, { 'a_attr': { 'vehcCode': '03' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '86c6af17f66d4ab1b4abc2acd0698eb9', 'state': { 'disabled': false }, 'text': '前四后四', 'vehcCode': '03' }, { 'a_attr': { 'vehcCode': '01' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': 'd4aa924de11b462da6de93c43e17aaa1', 'state': { 'disabled': false }, 'text': '单桥', 'vehcCode': '01' }, { 'a_attr': { 'vehcCode': '04' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': 'e4ab4152df094331a940a02f6cc96eae', 'state': { 'disabled': false }, 'text': '前四后六', 'vehcCode': '04' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }, { 'a_attr': { 'vehcCode': '02' }, 'hasChildren': false, 'leaf': true, 'enabled': true, 'root': true, 'id': '19c3d0c6604d4ad8a73213d9afaf2e02', 'state': { 'disabled': false }, 'text': '双桥', 'vehcCode': '02' }]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {},
  watch: {},
  components: {
    ResourceTree
  }
}
</script>

<style scoped>

</style>
