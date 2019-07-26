<template>
    <div>{{activeName}}
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :typeName='activeName' label="菜单权限" name="first">
      <transferMenu :roleId='roleId'></transferMenu>
    </el-tab-pane>
    <el-tab-pane label="公司权限" name="second">
      <orgTab v-model="userShow" @addClick='addClick' :roleId='roleId'></orgTab>
      <el-dialog width="80%"
    append-to-body
    :visible.sync="userShow">
      <tabDetail v-model="userShow" @checkList='checkList'  :roleId='roleId'/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userShow = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    </el-tab-pane>
    <el-tab-pane label="化验单权限" name="third">
      <assayTab v-model="orderShow" @addClick='orderS' :roleId='roleId'></assayTab>
      <el-dialog width="80%"
      append-to-body
      :visible.sync="orderShow">
        <assayDetail v-model="orderShow" @checkList='orderCheckList'  :roleId='roleId'/>
        <span slot="footer" class="dialog-footer">
          <el-button @click="orderShow = false">取 消</el-button>
          <el-button type="primary" @click="addOrder">确 定</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import roleService from 'service/admin/systemServe'
import transferMenu from './menu'
import orgTab from './orgTab'
import tabDetail from './tabDetail'
import assayTab from './assayTab'
import assayDetail from './assayDetail'
export default {
  components: {
    transferMenu, orgTab, tabDetail, assayTab, assayDetail
  },
  props: {
    show: {
      type: Boolean
    },
    roleId: {
      type: [String, Number]
    }
  },
  watch: {
    show: {
      handler (n) {
        console.log(n)
        if (n) {
          // this.init_list()
          console.log('这是真的')
          return false
        }
        Object.assign(this.$data, this.$options.data())
      },
      immediate: true
    }
  },
  data () {
    return {
      type: '',
      orderShow: false,
      userShow: false,
      resultData: [],
      orderData: [],
      activeName: 'first',
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
    // 菜单切换
    handleClick (tab, event) {
    },
    addClick () {
      this.userShow = true
    },
    orderS () {
      console.log('skjlkjsdlkjfsdlkajldkj')
      this.orderShow = true
    },
    checkList (e) {
      this.resultData = e
      console.log(e)
    },
    orderCheckList (e) {
      this.orderData = e
      console.log(e)
    },
    async addUser () {
      let orgIds = this.resultData.map(item => {
        return item.id
      })
      console.log(orgIds)
      if (orgIds.length < 1) {
        this.$message.error('请选择数据')
        return false
      }
      let result = await roleService.addOrgs({ roleId: this.roleId, orgIds }, 'roles', 'org')
      if (result) {
        this.userShow = false
      }
      console.log('提交数据', this.resultData)
    },
    async addOrder () {
      let assayIds = this.orderData.map(item => {
        return item.id
      })
      console.log(assayIds)
      if (assayIds.length < 1) {
        this.$message.error('请选择数据')
        return false
      }
      let result = await roleService.addOrgs({ roleId: this.roleId, assayIds }, 'roles', 'ass')
      if (result) {
        this.orderShow = false
      }
      console.log('提交数据', this.orderData)
    }

  }
}

</script>
