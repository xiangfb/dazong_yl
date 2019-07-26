<template>
    <div>
      <el-button type="primary" @click="sub" :loading="loadingBtn">保存</el-button>
      <tree-transfer
      :title="title"
      v-loading="loading"
      :from_data='fromData'
      :to_data='toData'
      pid='parentId'
      :defaultProps="{label:'title'}"
      @addBtn='add'
      @removeBtn='remove'
      :mode='mode'
      height='540px' filter >
      </tree-transfer>

  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer' // 引入
import menu from 'service/admin/systemServe'

export default {
  props: {
    typeName: {
      type: String
    },
    roleId: {
      type: [String, Number]
    }
  },
  watch: {
    // typeName (n) {
    //   console.log(n)
    // }
    typeName: {
      handler (n) {
        console.log(n)
        this.init_list()
        if (n === 'first') {
        }
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      mode: 'transfer', // transfer addressList
      title: ['权限配置', '权限配置'],
      loading: true,
      menuIds: [],
      loadingBtn: false,
      fromData: [],
      toData: []
    }
  },
  methods: {
    // 初始化列表数据
    async init_list () {
      let left = await menu.resource()
      let right = await menu.manageList(this.roleId)
      if (left) {
        this.fromData = left
        this.loading = false
        console.log(left)
      }
      if (right) {
        this.toData = right
        console.log(right)
      }
    },
    resultData (data) {
      data.map(item => {
        this.menuIds.push(item.id)
        if (item.children.length > 0) {
          this.resultData(item.children)
        }
      })
    },
    async sub () {
      this.loadingBtn = true
      this.resultData(this.toData)
      let result = await menu.addMenu({
        'roleId': this.roleId,
        'menuIds': this.menuIds })
      if (result) {
        this.$message.success('提交成功')
        this.loadingBtn = true
        this.$emit('sub')
      }
      console.log('menuIds', this.menuIds)
      console.log(this.roleId)
      console.log(this.toData)
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode === 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      this.toData = toData
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      this.toData = toData
      console.log('obj:', obj)
    }
  },
  comporents: { treeTransfer } // 注册
}

</script>
