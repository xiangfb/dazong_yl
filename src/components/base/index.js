import GlobalPopup from './global-popup/index'
import CommonPopup from './common-popup/index'
import PopupList from './global-popup/list'
import PopupListMould from './global-popup/list-mould'
import RoutineList from './list/routine'
import TreeTable from './list/tree-table'
import FormColumn from './form/column'
import MasterChildForm from './form/master-child-form'
import TabForm from './form/tab-form'
import EditTable from './form/edit-table'
import TreeForm from './form/tree-form'
import ResourceTable from './resource/table'
import ResourceTree from './resource/tree'
import ResourceTreeTable from './resource/tree-table'

export {
  GlobalPopup,
  CommonPopup,
  PopupList,
  PopupListMould,
  RoutineList, // 常规列表模板 FORMAT_LIST_BASE
  TreeTable, // 树形+列表 FORMAT_TREE_LIST
  FormColumn, // 四列或者八列表单 FORMAT_FOUR_COLUMN_FORM / FORMAT_EIGHT_COLUMN_FORM
  MasterChildForm, // 主子表-表单 FORMAT_MASTER_CHILD_FORM
  TabForm, // 选项卡切换表单 FORMAT_TAB_FORM
  EditTable, // 可编辑TABLE表单 FORMAT_EDIT_FORM
  TreeForm, // 树形+表单 FORMAT_TREE_FORM
  ResourceTable, // 弹窗选择（查询+数据列表） FORMAT_RESOURCE_QUERY_DATALIST
  ResourceTree, // 弹窗选择（树形） FORMAT_RESOURCE_TREE
  ResourceTreeTable // 弹窗选择（树形+查询+数据列表） FORMAT_RESOURCE_TREE_QUERY_DATALIST
}
