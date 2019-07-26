<template>
  <div>
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from 'drag-tree-table'
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
              return '<a>' + item.name + '</a>'
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
                text: '查看角色',
                onclick: this.onDetail,
                formatter: (item) => {
                  return '<i>查看角色</i>'
                }
              },
              {
                text: '编辑',
                onclick: this.onEdit,
                formatter: (item) => {
                  return ' <i>编辑</i>'
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

  },
  methods: {
    onTreeDataChange (list) {
      this.treeData.lists = list
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
