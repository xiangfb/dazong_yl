export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  column: [
	  {
      label: '名称',
      prop: 'name'
    },
	  {
      label: '地址',
      prop: 'address'
    },
    {
      label: '介绍',
      prop: 'intro'
    },
	  {
      label: '创建人',
      prop: 'createBy',
      formatter: function (row,value,label,column) {
        return value.username;
      }

    },
	  {
      label: '创建时间',
      prop: 'createDate'
    },
  ]
}
