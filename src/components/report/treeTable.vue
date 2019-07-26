<template>
  <div>
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from 'drag-tree-table'
var id = 1
export default {
  data () {
    return {
      treeData: {
        lists: [
          {
            id: 110,
            parent_id: 0,
            order: 0,
            name: '客户管理',
            icon: 'fa-handshake-o',
            flag: '',
            uri: '',
            assign: 1,
            lists: [
              {
                id: 201,
                parent_id: 110,
                order: 0,
                name: '联系人',
                icon: 'fa-users',
                flag: 'customer.contacts.get',
                uri: '/customer/contacts',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              },
              {
                id: 173,
                parent_id: 110,
                order: 1,
                name: '客户',
                icon: 'fa-list',
                flag: 'customer.customerList.get',
                uri: '/customer/customerList',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              },
              {
                id: 117,
                parent_id: 110,
                order: 2,
                name: '管理维护记录',
                icon: 'fa-phone',
                flag: 'customer.maintain.get',
                uri: '/customer/maintain',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              },
              {
                id: 383,
                parent_id: 110,
                order: 3,
                name: '客户冲突',
                icon: 'fa-fire',
                flag: '',
                uri: '',
                assign: 1,
                lists: [
                  {
                    id: 390,
                    parent_id: 383,
                    order: 0,
                    name: '个人冲突',
                    icon: 'fa-telegram',
                    flag: 'customer.personalConflict.get',
                    uri: '/customer/personalConflict',
                    assign: 1,
                    lists: null,
                    deep: 3,
                    open: !0
                  },
                  {
                    id: 397,
                    parent_id: 383,
                    order: 1,
                    name: '团队冲突',
                    icon: 'fa-users',
                    flag: 'customer.teamConflict.get',
                    uri: '/customer/teamConflict',
                    assign: 1,
                    lists: null,
                    deep: 3,
                    open: !0
                  },
                  {
                    id: 215,
                    parent_id: 383,
                    order: 2,
                    name: '客户查询',
                    icon: 'fa-search',
                    flag: 'customer.inquiry.get',
                    uri: '/customer/inquiry',
                    assign: 1,
                    lists: null,
                    deep: 3,
                    open: !0
                  }
                ],
                deep: 2,
                open: !0
              },
              {
                id: 138,
                parent_id: 110,
                order: 4,
                name: '线索管理',
                icon: 'fa-ravelry',
                flag: 'customer.clue.get',
                uri: '/customer/clue',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              },
              {
                id: 159,
                parent_id: 110,
                order: 5,
                name: '集团信息',
                icon: 'fa-users',
                flag: 'customer.agent.get',
                uri: '/customer/agent',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              }
            ],
            deep: 1,
            open: !0
          },
          {
            id: 404,
            parent_id: 0,
            order: 1,
            name: '审核中心',
            icon: 'fa-modx',
            flag: '',
            uri: '',
            assign: 1,
            lists: [
              {
                id: 187,
                parent_id: 404,
                order: 0,
                name: '资质审核',
                icon: 'fa-address-book-o',
                flag: 'customer.qualifications.get',
                uri: '/customer/qualifications',
                assign: 1,
                lists: null,
                deep: 2,
                open: !0
              }
            ],
            deep: 1,
            open: !0
          }
        ],
        custom_field: {
          id: 'id',
          lists: 'lists',
          parent_id: 'parent_id'
        },
        columns: [
          {
            type: 'selection',
            title: '菜单名称',
            field: 'name',
            width: 200,
            align: 'center',
            formatter: (item) => {
              return '<el-button type="primary">' + item.name + '</el-button>'
            }
          },
          {
            title: '链接',
            field: 'uri',
            width: 200,
            align: 'center'
          },
          {
            title: '操作',
            type: 'action',
            width: 350,
            align: 'center',
            actions: [
              {
                text: '新增',
                onclick: this.add,
                formatter: (item) => {
                  return '<i>新增</i>'
                }
              },
              {
                text: '删除',
                onclick: this.delete,
                formatter: (item) => {
                  return ' <i>删除</i>'
                }
              }
            ]
          }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    console.log(this.treeData)
  },
  methods: {
    add (row, data = this.treeData.lists) {
      console.log('添加按钮')
      for (var i in data) {
        if (row.id === data[i].id) {
          console.log('查询成功：id=' + row.id)
          console.log(i)
          console.log(data[i].lists)
          // if (!data[i].lists || data[i].lists.length < 1) {
          //   console.log('初始化list...')
          //   data[i].lists = []
          // }
          data[i].lists.push({
            id: id++,
            parent_id: data[i].id,
            order: 5,
            name: '集团信息',
            icon: 'fa-users',
            flag: 'customer.agent.get',
            uri: '/customer/agent',
            assign: 1,
            lists: [],
            deep: 2,
            open: !0
          })
          break
        } else {
          this.add(row, data[i].lists)
        }
      }
    },
    delete (row, data = this.treeData.lists) {
      for (var i in data) {
        if (row.id === data[i].id) {
          console.log('查询成功：id=' + row.id)
          data.splice(i, 1)
          break
        } else {
          this.delete(row, data[i].lists)
        }
      }

      // console.log(e)
    },
    onTreeDataChange (list) {
      this.treeData.lists = list
      console.log(list)
      // custom_field.list === 'children'
      // 自定义lists相应的回传数据也用相同字段
      // this.treeData.children = list
    }
  },
  computed: {},
  watch: {},
  components: {
    dragTreeTable
  }
}
</script>

<style scoped>

</style>
