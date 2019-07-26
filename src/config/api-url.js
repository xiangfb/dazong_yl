import Config from 'config'

const jsonurl = {
  oss: {
    getToken: Config.service.oss + '/aliSts/getToken'
  },
  api: {
    test: '/api/rule'
  },
  // 前端资源管理
  frontend: {
    scan: Config.service.admin + '/resourceBackend/scan',
    all: Config.service.admin + '/sys/resource/list',
    create: Config.service.admin + '/resourceFrontend/create',
    getPermision: Config.service.admin + '/resourceFrontend/info',
    setPermision: Config.service.admin + '/sys/resource/bound/menu'
  },
  admin: {
    fetchMenu: Config.service.admin + '/sys/menu2/tree',
    addMenu: Config.service.admin + '/sys/menu2',
    deleteMenu: Config.service.admin + '/sys/menu2/{id}',
    getMenuById: Config.service.admin + '/sys/menu2/{id}',
    updateMenuById: Config.service.admin + '/sys/menu2',
    roleList: Config.service.admin + '/role/page',
    getPermissionListById: Config.service.admin + '/sys/menu2/{id}/resource',
    getBackEndTree: Config.service.admin + '/sys/menu2/resource/tree',
    getRoleTreeById: Config.service.admin + '/sys/menu2/tree/{id}',
    updateRoleTreeById: Config.service.admin + '/role/menu'
  },
  role: {
    list: Config.service.admin + '/sys/role',
    create: Config.service.admin + '/sys/role/create'

  },
  /** 左边树接口 TODO: 重复  去掉 ************************************************************************/
  tree: {
    trees: Config.service.api + '/sys-group/trees', // [get] 供应商集团档案
    organization: Config.service.api + '/sys-organization/trees' // [get] 公司档案
  },
  /** 用户信息请求 ************************************************************************/
  user: {
    codeImage: Config.service.api + '/code/image', // 验证码图片
    login: Config.service.api + '/oauth/token', // [post/get] 登录/刷新令牌
    userInfo: Config.service.api + '/sys-info/me', // [get] 获取用户信息
    logout: Config.service.api + '/base/logout', // [get] 退出登录
    editpwd: Config.service.api + '/sys-user/password/modify/{id}', // [put] 修改密码
    forgetpwd: Config.service.api + '/sys-user/{id}/password/reset' // [put] 重置密码
  },
  /** 动态报表 ************************************************************************/
  report: {
    styleHeadSet: Config.service.api + '/report/template-style-head/current/{id}', // 设置当前模板样式
    styleHeadCreate: Config.service.api + '/report/template-style-head/create', // 另存为模板样式信息
    styleHeadUpdate: Config.service.api + '/report/template-style-head/update', // 更新模板样式信息
    addItemHead: Config.service.api + '/report/template-style-body/addItem', // 添加复杂表头
    editItemHead: Config.service.api + '/report/template-style-body/update', // 编辑复杂表头
    fields: Config.service.api + '/report/template-fields-info/fields', // 统计内容，统计依据查询列表
    temList: Config.service.api + '/report/template-info/list/{id}', // 获取模板列表
    temResult: Config.service.api + '/report/template-info/result/{id}', // 动态报表查询结果
    addTem: Config.service.api + '/report/template-info/create', // 获取新增动态报表
    checkTem: Config.service.api + '/report/template-info/info/{id}', // 查询指定模版信息
    updateTem: Config.service.api + '/report/template-info/update', // 更新动态模板
    getSubtotal: Config.service.api + '/report/template-count-format/info/{id}', // 获取小计样式
    subtotal: Config.service.api + '/report/template-count-format/currentCountTemplate', // 确认小计样式
    reportStyleList: Config.service.api + '/report/template-style-head/list/{id}', // 报表样式列表
    styleTable: Config.service.api + '/report/template-style-head/info/{id}', // 报表格式Table
    queryCompareChar: Config.service.api + '/report/base/info/queryCompareChar', // 查询比较符
    queryLinkChar: Config.service.api + '/report/base/info/queryLinkChar', // 查询连接符
    addMenu: Config.service.api + '/report/template-info/addMenu/{id}', // [post] 添加到菜单
    remTem: Config.service.api + '/report/template-info/{id}' // 删除模板
  },
  /** menu请求 ************************************************************************/
  menu: {
    menuList: Config.service.api + '/sys-menu/list', // [get] 获取菜单资源
    menuButList: Config.service.api + '/sys-menu/manage_button_list', // [get] 获取菜单按钮列表
    menuManageList: Config.service.api + '/sys-menu/manage_list', // [get] 菜单管理-列表
    menuDetail: Config.service.api + '/sys-menu/info/{id}', // [get] 获取某个菜单详情
    deleteMenu: Config.service.api + '/sys-menu/{id}', // [delete] 获取某个菜单详情
    createMenu: Config.service.api + '/sys-menu/create', // [post] 菜单管理-新增
    sysInfoList: Config.service.api + '/sys-info/list', // [get] 获取系统资源
    updateMenuById: Config.service.api + '/sys-menu/update', // [put] 修改菜单
    formatAllotDetail: Config.service.api + '/optimus_prime/cg-format-allot/findList', // [get] 菜单管理-获得当前菜单对应绑定的模板关系数据
    formatSelect: Config.service.api + '/optimus_prime/cg-format/select', // [post] 获取模板列表
    createFormatAllot: Config.service.api + '/optimus_prime/cg-format-allot/create' // [post] 菜单管理-添加绑定模板
  },
  company: {
    getCount: Config.service.api + '/purorder/tr-registry/getCount', // [get] 首页车辆信息统计
    getCardCount: Config.service.api + '/purorder/tr-registry/getCardCount', // [get] 首页车辆信息统计
    getPuCount: Config.service.api + '/measure/mm-pu-weigh-sub/getPuCount', // [get] 首页采购等统计信息
    getSaCount: Config.service.api + '/measure/mm-sa-weigh-sub/getSaCount', // [get] 首页销售等统计信息
    getVehicleTable: Config.service.api + '/purorder/tr-registry/getVehicleTable', // [get]
    currentOrgs: Config.service.api + '/sys-user-org/currentOrgs', // [post] 获得当前公司列表
    switchOrg: Config.service.api + '/sys-user-org/switchOrg/{id}' // [post] 切换公司
  },
  mouldResource: {
    tabsEnumList: Config.service.api + '/material/as-allocate-scheme/enumList', // [get] 可切换表单枚举列表
    searchList: Config.service.api + '/optimus_prime/cg-format/type/search/{id}', // [get] 弹窗资源搜索列表
    optimusPrime: Config.service.api + '/optimus_prime/cg-format/type/subs', // [get] 模块资源配置
    optimusPrimePopup: Config.service.api + '/optimus_prime/cg-format/type/subs/{id}', // [get] 弹窗资源模板
    computationGroupCreate: Config.service.api + '/material/as-computation-group/material/create', // [post] 基础档案新增
    getMaterialList: Config.service.api + '/material/as-computation-group/material/list', // [post] 获取基础档案数据
    getGropList: Config.service.api + '/sys-group/list', // [post] 获取基础档案集团档案数据
    // 帆软报表模块
    frReport: {
      print: Config.service.api + '/finereport/fr/print', // [post] fr打印
      getFrUrl: Config.service.api + '/finereport/fr/getFrUrl' // [get] 获取帆软服务地址
    },
    // 出入参
    params: {
      param: Config.service.api + '/optimus_prime/cg-format-form-sub-param/list/param', // [get] 获取弹窗入参列表
      listParam: Config.service.api + '/optimus_prime/cg-format-form-sub-param/getparams', // [get] 获取列表弹窗入参列表
      resource: Config.service.api + '/optimus_prime/cg-format-form-sub-param/list/resource', // [get] 获取弹窗出参列表
      subs: Config.service.api + '/optimus_prime/cg-format/type/subs/{id}', // [get] 表单字段下拉 表单模板的id / 结果字段下拉 弹窗模板的id
      search: Config.service.api + '/optimus_prime/cg-format/type/search/{id}', // [get] 查询字段下拉
      create: Config.service.api + '/optimus_prime/cg-format-form-sub-param/create/list', // [post] 提交保存
      listCreate: Config.service.api + '/optimus_prime/cg-format-form-sub-param/list/create' // [post] 列表弹窗提交保存
    },
    // 仓库管理
    wareHouse: {
      getWareHouse: Config.service.api + '/material/as-warehouse/list', // [POST]获取仓库档案列表信
      saveWareHouse: Config.service.api + '/material/as-warehouse/material/create', // [POST]仓库信息保存
      detailWareHouse: Config.service.api + '/material/as-warehouse/material/get/{id}', // [GET]仓库详情查询
      updateWareHouse: Config.service.api + '/material/as-warehouse/material/update', // [PUT]仓库修改
      deleteWareHouse: Config.service.api + '/material/as-warehouse/delete/{id}', // [PUT]仓库修改
      syn: Config.service.api + '/material/as-warehouse/datax', // [PUT]仓库档案同步
      enableWareHouse: Config.service.api + '/material/as-warehouse/enable', // [POST]仓库档案启用
      unenableWareHouse: Config.service.api + '/material/as-warehouse/disable' // [POST]仓库档案禁用
    },
    group: {
      trees: Config.service.api + '/sys-group/trees', // [get] 集团档案
      formData: Config.service.api + '/sys-group/list', // [POST] 集团档案查询
      add: Config.service.api + '/sys-group/add/{id}', // [get] 集团档案新增查询
      save: Config.service.api + '/sys-group/create', // [POST] 集团档案保存
      delete: Config.service.api + '/sys-group/delete/{id}', // [Delete] 集团档案删除
      update: Config.service.api + '/sys-group/update' // [POST] 集团档案修改
    },
    organization: {
      trees: Config.service.api + '/sys-organization/trees', // [get] 公司档案
      syn: Config.service.api + '/sys-organization/datax', // [PUT]公司档案同步
      formData: Config.service.api + '/sys-organization/list', // [POST] 公司档案数据
      add: Config.service.api + '/sys-organization/add/{id}', // [get] 公司档案新增查询
      save: Config.service.api + '/sys-organization/create', // [POST] 公司档案保存
      delete: Config.service.api + '/sys-organization/delete/{id}', // [Delete] 公司档案删除
      update: Config.service.api + '/sys-organization/update' // [PUT] 公司档案修改
    },
    dept: {
      trees: Config.service.api + '/sys-dept/trees', // [get] 部门档案
      formData: Config.service.api + '/sys-dept/list', // [POST] 部门档案数据
      add: Config.service.api + '/sys-dept/add/{id}', // [get] 部门档案新增查询
      save: Config.service.api + '/sys-dept/create', // [POST] 部门档案保存
      delete: Config.service.api + '/sys-dept/delete/{id}', // [Delete] 部门档案删除
      update: Config.service.api + '/sys-dept/update' // [PUT] 部门档案修改
    },
    factory: {
      list: Config.service.api + '/material/as-factory/list', // [POST]获取工厂档案列表信
      syn: Config.service.api + '/material/as-factory/datax', // [PUT]工厂档案同步
      save: Config.service.api + '/material/as-factory/material/create', // [POST]工厂信息保存
      detail: Config.service.api + '/material/as-factory/material/get/{id}', // [GET]工厂详情查询
      update: Config.service.api + '/material/as-factory/material/update', // [PUT]工厂修改
      delete: Config.service.api + '/material/as-factory/material/delete/{id}', // [DELETE]工厂修改
      enable: Config.service.api + '/material/as-factory/enable', // [POST]工厂档案启用
      unenable: Config.service.api + '/material/as-factory/disable' // [POST]工厂档案禁用
    },
    dayPlan: {
      create: Config.service.api + '/registry/tr-registry/planCreate' // [POST]日计划批量导入登记单
    },
    customerClass: {
      trees: Config.service.api + '/material/as-customer-class/material/tree', // [get] 客户类别
      formData: Config.service.api + '/material/as-customer-class/material/list', // [POST] 客户类别数据
      syn: Config.service.api + '/material/as-customer-class/datax', // [PUT]客户类别档案同步
      add: Config.service.api + '/material/as-customer-class/add/{id}', // [get] 客户类别新增查询
      save: Config.service.api + '/material/as-customer-class/material/create', // [POST] 客户类别保存
      delete: Config.service.api + '/material/as-customer-class/delete/{id}', // [PUT] 客户类别删除
      update: Config.service.api + '/material/as-customer-class/material/update' // [PUT] 客户类别修改
    },
    vendorClass: {
      trees: Config.service.api + '/material/as-vendor-class/material/tree', // [get] 供应商类别
      formData: Config.service.api + '/material/as-vendor-class/material/list', // [POST] 供应商类别数据
      syn: Config.service.api + '/material/as-vendor-class/datax', // [PUT]供应商类别档案同步
      add: Config.service.api + '/material/as-vendor-class/add/{id}', // [get] 供应商类别新增查询
      save: Config.service.api + '/material/as-vendor-class/material/create', // [POST] 供应商类别保存
      delete: Config.service.api + '/material/as-vendor-class/delete/{id}', // [PUT] 供应商类别删除
      update: Config.service.api + '/material/as-vendor-class/material/update' // [PUT] 供应商类别修改
    },
    inventoryClass: {
      trees: Config.service.api + '/material/as-inventory-class/material/tree', // [get] 物料类别
      formData: Config.service.api + '/material/as-inventory-class/material/list', // [POST] 物料类别数据
      syn: Config.service.api + '/material/as-inventory-class/datax', // [PUT]物料类别档案同步
      add: Config.service.api + '/material/as-inventory-class/add/{id}', // [get] 物料类别新增查询
      save: Config.service.api + '/material/as-inventory-class/material/create', // [POST] 物料类别保存
      delete: Config.service.api + '/material/as-inventory-class/delete/{id}', // [PUT] 物料类别删除
      update: Config.service.api + '/material/as-inventory-class/material/update' // [PUT] 物料类别修改
    },
    reportClass: {
      trees: Config.service.api + '/material/as-report-form-class/material/tree', // [get] 报表类别
      formData: Config.service.api + '/material/as-report-form-class/material/list', // [POST] 报表类别数据
      add: Config.service.api + '/material/as-report-form-class/add/{id}', // [get] 报表类别新增查询
      save: Config.service.api + '/material/as-report-form-class/material/create', // [POST] 报表类别保存
      delete: Config.service.api + '/material/as-report-form-class/delete/{id}', // [PUT] 报表类别删除
      update: Config.service.api + '/material/as-report-form-class/material/update' // [PUT] 报表类别修改
    },
    // 报表(集团)档案
    reportGroup: {
      trees: Config.service.api + '/material/as-report-form-class/material/tree', // [get] 报表分类
      list: Config.service.api + '/material/as-report-form/list', // [post] 报表(集团)档案数据
      save: Config.service.api + '/material/as-report-form/material/create', // [POST] 报表(集团)档案保存
      update: Config.service.api + '/material/as-report-form//material/update', // [POST] 报表(集团)档案修改
      delete: Config.service.api + '/material/as-report-form/material/delete/{id}', // [DELETE] 报表(集团)档案保存
      defaulted: Config.service.api + '/material/as-report-form/setting/defaulted/{id}', // 设置默认模板
      detail: Config.service.api + '/material/as-report-form/material/get/{id}', // [GET]报表(集团)详情查询
      downFile: Config.service.api + '/material/as-report-form/download/{id}'// [GET]报表(集团)模板下载
    },
    // 报表(公司)档案
    reportOrganization: {
      trees: Config.service.api + '/material/as-report-form-class/material/tree', // [get] 报表分类
      list: Config.service.api + '/material/as-report-form-org/list', // [post] 报表(公司)档案数据
      save: Config.service.api + '/material/as-report-form-org/material/create', // [POST] 报表(公司)档案保存
      update: Config.service.api + '/material/as-report-form-org/material/update', // [POST] 报表(公司)档案修改
      delete: Config.service.api + '/material/as-report-form-org/material/delete/{id}', // [DELETE] 报表(集团)档案保存
      defaulted: Config.service.api + '/material/as-report-form-org/setting/defaulted/{id}', // 设置默认模板
      detail: Config.service.api + '/material/as-report-form-org/material/get/{id}', // [GET]报表(公司)详情查询
      downFile: Config.service.api + '/material/as-report-form-org/download/{id}'// [GET]报表(公司)模板下载
    },
    location: {
      trees: Config.service.api + '/material/as-location/material/tree', // [get] 货位档案
      formData: Config.service.api + '/material/as-location/material/list', // [POST] 货位档案数据
      add: Config.service.api + '/material/as-location/add/{id}', // [get] 货位档案新增查询
      save: Config.service.api + '/material/as-location/material/create', // [POST] 货位档案保存
      delete: Config.service.api + '/material/as-location/delete/{id}', // [PUT] 货位档案删除
      update: Config.service.api + '/material/as-location/material/update' // [PUT] 货位档案修改
    },
    // 自定义档案类别
    defdocClass: {
      trees: Config.service.api + '/material/as-defdoc-class/material/tree', // [get] 自定义档案类别
      formData: Config.service.api + '/material/as-defdoc-class/material/list', // [POST] 自定义档案类别数据
      syn: Config.service.api + '/material/as-defdoc-class/datax', // [PUT]自定义档案类别同步
      add: Config.service.api + '/material/as-defdoc-class/add/{id}', // [get] 自定义档案类别新增查询
      save: Config.service.api + '/material/as-defdoc-class/material/create', // [POST] 自定义档案类别保存
      delete: Config.service.api + '/material/as-defdoc-class/delete/{id}', // [PUT] 自定义档案类别删除
      update: Config.service.api + '/material/as-defdoc-class/material/update' // [PUT] 自定义档案类别修改
    },
    computationGroup: {
      list: Config.service.api + '/material/as-computation-group/material/list', // [POST]获取计量单位组列表
      create: Config.service.api + '/material/as-computation-group/material/create', // [POST]计量单位组保存
      detail: Config.service.api + '/material/as-computation-group/material/get/{id}', // [GET]计量单位组详情查询
      update: Config.service.api + '/material/as-computation-group/material/update', // [PUT]计量单位组修改
      enable: Config.service.api + '/material/as-computation-group/enable', // [POST]计量单位组启用
      disable: Config.service.api + '/material/as-computation-group/disable', // [POST]计量单位组禁用
      delete: Config.service.api + '/material/as-computation-group/delete/{id}' // [PUT]计量单位组删除
    },
    person: {
      list: Config.service.api + '/material/as-person/material/list', // [POST]获取人员档案列表
      create: Config.service.api + '/material/as-person/material/create', // [POST]人员档案保存
      detail: Config.service.api + '/material/as-person/material/get/{id}', // [GET]人员档案详情查询
      update: Config.service.api + '/material/as-person/material/update', // [PUT]人员档案修改
      enable: Config.service.api + '/material/as-person/enable', // [POST]人员档案启用
      disable: Config.service.api + '/material/as-person/disable', // [POST]人员档案禁用
      delete: Config.service.api + '/material/as-person/material/delete/{id}' // [DELETE]人员档案删除
    },
    icCard: {
      list: Config.service.api + '/material/as-ic-card/material/list', // [POST]IC卡列表
      create: Config.service.api + '/material/as-ic-card/material/create', // [POST]IC卡保存
      detail: Config.service.api + '/material/as-ic-card/material/get/{id}', // [GET]IC卡详情查询
      update: Config.service.api + '/material/as-ic-card/material/update', // [PUT]IC卡修改
      enable: Config.service.api + '/material/as-ic-card/enable', // [POST]IC卡启用
      disable: Config.service.api + '/material/as-ic-card/disable', // [POST]IC卡禁用
      loss: Config.service.api + '/material/as-ic-card/loss', // [POST]IC卡挂失
      reuse: Config.service.api + '/material/as-ic-card/reuse', // [POST]IC卡复用
      delete: Config.service.api + '/material/as-ic-card/delete/{id}' // [PUT]IC卡删除
    },
    vehicle: {
      list: Config.service.api + '/material/as-vehicle/material/list', // [POST]获取车辆字典列表
      create: Config.service.api + '/material/as-vehicle/material/create', // [POST]车辆字典保存
      detail: Config.service.api + '/material/as-vehicle/material/get/{id}', // [GET]车辆字典详情查询
      update: Config.service.api + '/material/as-vehicle/material/update', // [PUT]车辆字典修改
      enable: Config.service.api + '/material/as-vehicle/enable', // [POST]车辆字典启用
      disable: Config.service.api + '/material/as-vehicle/disable', // [POST]车辆字典禁用
      delete: Config.service.api + '/material/as-vehicle/material/delete/{id}' // [DELETE]车辆字典删除
    },
    vehicleAxles: {
      list: Config.service.api + '/material/as-vehicle-axles/material/list', // [POST]获取车辆轴数类型列表
      create: Config.service.api + '/material/as-vehicle-axles/material/create', // [POST]车辆轴数类型保存
      detail: Config.service.api + '/material/as-vehicle-axles/material/get/{id}', // [GET]车辆轴数类型详情查询
      update: Config.service.api + '/material/as-vehicle-axles/material/update', // [PUT]车辆轴数类型修改
      enable: Config.service.api + '/material/as-vehicle-axles/enable', // [POST]车辆轴数类型启用
      disable: Config.service.api + '/material/as-vehicle-axles/disable', // [POST]车辆轴数类型禁用
      delete: Config.service.api + '/material/as-vehicle-axles/material/delete/{id}' // [DELETE]车辆轴数类型删除
    },
    vehicleClass: {
      list: Config.service.api + '/material/as-vehicle-class/material/list', // [POST]获取车辆类型列表
      create: Config.service.api + '/material/as-vehicle-class/material/create', // [POST]车辆类型保存
      detail: Config.service.api + '/material/as-vehicle-class/material/get/{id}', // [GET]车辆类型详情查询
      update: Config.service.api + '/material/as-vehicle-class/material/update', // [PUT]车辆类型修改
      enable: Config.service.api + '/material/as-vehicle-class/enable', // [POST]车辆类型启用
      disable: Config.service.api + '/material/as-vehicle-class/disable', // [POST]车辆类型禁用
      delete: Config.service.api + '/material/as-vehicle-class/material/delete/{id}' // [DELETE]车辆类型删除
    },
    queue: {
      list: Config.service.api + '/door/as-queue/list', // [POST]获取排队列表
      create: Config.service.api + '/door/as-queue/create', // [POST]排队保存
      detail: Config.service.api + '/door/as-queue/toDetail/{id}', // [GET]排队详情查询
      update: Config.service.api + '/door/as-queue/update', // [PUT]排队修改
      enable: Config.service.api + '/door/as-queue/enable', // [POST]排队启用
      disable: Config.service.api + '/door/as-queue/disable', // [POST]排队禁用
      delete: Config.service.api + '/door/as-queue/delete/{id}' // [DELETE]排队删除
    },
    dischargeaddress: {
      list: Config.service.api + '/door/as-dischargeaddress/list', // [POST]获取排队_卸货地点列表
      create: Config.service.api + '/door/as-dischargeaddress/create', // [POST]排队_卸货地点保存
      detail: Config.service.api + '/door/as-dischargeaddress/toDetail/{id}', // [GET]排队_卸货地点详情查询
      update: Config.service.api + '/door/as-dischargeaddress/update', // [PUT]排队_卸货地点修改
      enable: Config.service.api + '/door/as-dischargeaddress/enable', // [POST]排队_卸货地点启用
      disable: Config.service.api + '/door/as-dischargeaddress/disable', // [POST]排队_卸货地点禁用
      delete: Config.service.api + '/door/as-dischargeaddress/delete/{id}' // [DELETE]排队_卸货地点删除
    },
    queueMatch: {
      list: Config.service.api + '/door/as-queue-match/list', // [POST]获取排队匹配列表
      create: Config.service.api + '/door/as-queue-match/create', // [POST]排队匹配保存
      toCreate: Config.service.api + '/door/as-queue-match/toCreate', // [get]排队匹配跳转新增
      detail: Config.service.api + '/door/as-queue-match/toDetail/{id}', // [GET]排队匹配详情查询
      update: Config.service.api + '/door/as-queue-match/update', // [PUT]排队匹配修改
      enable: Config.service.api + '/door/as-queue-match/enable', // [POST]排队匹配启用
      disable: Config.service.api + '/door/as-queue-match/disable', // [POST]排队匹配禁用
      delete: Config.service.api + '/door/as-queue-match/delete/{id}' // [DELETE]排队匹配删除
    },
    driver: {
      list: Config.service.api + '/material/as-driver/material/list', // [POST]获取司机档案列表
      create: Config.service.api + '/material/as-driver/material/create', // [POST]司机档案保存
      detail: Config.service.api + '/material/as-driver/material/get/{id}', // [GET]司机档案详情查询
      update: Config.service.api + '/material/as-driver/material/update', // [PUT]司机档案修改
      enable: Config.service.api + '/material/as-driver/enable', // [POST]司机档案启用
      disable: Config.service.api + '/material/as-driver/disable', // [POST]司机档案禁用
      delete: Config.service.api + '/material/as-driver/material/delete/{id}' // [DELETE]司机档案删除
    },
    line: {
      list: Config.service.api + '/material/as-line/material/list', // [POST]获取线路档案列表
      create: Config.service.api + '/material/as-line/create', // [POST]线路档案保存
      detail: Config.service.api + '/material/as-line/update/{id}', // [GET]线路档案详情查询
      update: Config.service.api + '/material/as-line/updates', // [PUT]线路档案修改
      enable: Config.service.api + '/material/as-line/enable', // [POST]线路档案启用
      disable: Config.service.api + '/material/as-line/disable', // [POST]线路档案禁用
      delete: Config.service.api + '/material/as-line/deleteList/{id}' // [DELETE]线路档案删除
    },
    numberPrefixType: {
      list: Config.service.api + '/material/as-number-prefix-type/material/list', // [POST]获取编号前缀类型列表
      create: Config.service.api + '/material/as-number-prefix-type/material/create', // [POST]编号前缀类型保存
      detail: Config.service.api + '/material/as-number-prefix-type/material/get/{id}', // [GET]编号前缀类型详情查询
      update: Config.service.api + '/material/as-number-prefix-type/material/update', // [PUT]编号前缀类型修改
      enable: Config.service.api + '/material/as-number-prefix-type/enable', // [POST]编号前缀类型启用
      disable: Config.service.api + '/material/as-number-prefix-type/disable', // [POST]编号前缀类型禁用
      delete: Config.service.api + '/material/as-number-prefix-type/delete/{id}' // [DELETE]编号前缀类型删除
    },
    place: {
      list: Config.service.api + '/material/as-place/material/list', // [POST]获取地点档案列表
      create: Config.service.api + '/material/as-place/material/create', // [POST]地点档案保存
      syn: Config.service.api + '/material/as-place/datax', // [PUT]地点档案同步
      detail: Config.service.api + '/material/as-place/material/get/{id}', // [GET]地点档案详情查询
      update: Config.service.api + '/material/as-place/material/update', // [PUT]地点档案修改
      enable: Config.service.api + '/material/as-place/enable', // [POST]地点档案启用
      disable: Config.service.api + '/material/as-place/disable', // [POST]地点档案禁用
      delete: Config.service.api + '/material/as-place/material/delete/{id}' // [DELETE]地点档案删除
    },
    sysBusiType: {
      list: Config.service.api + '/material/sys-busi-type/material/list', // [POST]获取业务类型列表
      create: Config.service.api + '/material/sys-busi-type/material/create', // [POST]业务类型保存
      syn: Config.service.api + '/material/sys-busi-type/datax', // [PUT]业务类型档案同步
      detail: Config.service.api + '/material/sys-busi-type/material/get/{id}', // [GET]业务类型详情查询
      update: Config.service.api + '/material/sys-busi-type/material/update', // [PUT]业务类型修改
      enable: Config.service.api + '/material/sys-busi-type/enable', // [POST]业务类型启用
      disable: Config.service.api + '/material/sys-busi-type/disable', // [POST]业务类型禁用
      delete: Config.service.api + '/material/sys-busi-type/material/delete/{id}' // [DELETE]业务类型删除
    },
    // 供应商档案
    vendor: {
      organizationTrees: Config.service.api + '/sys-organization/trees', // [] 按钮弹窗资源
      trees: Config.service.api + '/material/as-vendor-class/trees', // [get] 供应商档案
      list: Config.service.api + '/material/as-vendor/list', // [post] 供应商(集团)档案数据
      save: Config.service.api + '/material/as-vendor/createEx', // [POST] 供应商(集团)档案保存
      update: Config.service.api + '/material/as-vendor/updateEx', // [POST] 供应商(集团)档案修改
      delete: Config.service.api + '/material/as-vendor/material/delete/{id}', // [DELETE] 供应商(集团)档案保存
      enable: Config.service.api + '/material/as-vendor/enable', // [POST]供应商(集团)启用
      syn: Config.service.api + '/material/as-vendor/datax', // [PUT]供应商档案同步
      disable: Config.service.api + '/material/as-vendor/disable', // [POST]供应商(集团)禁用
      detail: Config.service.api + '/material/as-vendor/get/{id}', // [GET]供应商(集团)详情查询
      allocate: Config.service.api + '/material/as-vendor/allocate', // [POST]供应商(集团)供应商档案分配
      cancelAllocate: Config.service.api + '/material/as-vendor/cancelAllocate', // [POST]取消供应商(集团)供应商档案分配
      cancelAll: Config.service.api + '/material/as-vendor/cancelAll', // [POST]取消全部供应商(集团)供应商档案分配
      findAllocate: Config.service.api + '/material/as-vendor/findAllocate/{id}' // [GET]查看分配供应商(集团)供应商档案分配
    },
    // 供应商(公司)档案
    vendorOrganization: {
      trees: Config.service.api + '/material/as-vendor-class/trees', // [get] 供应商(公司)档案
      list: Config.service.api + '/material/as-vendor-ex-allocate/getlist', // [post] 供应商(公司)档案数据
      save: Config.service.api + '/material/as-vendor-ex-allocate/addCreate', // [POST] 供应商(公司)档案保存
      update: Config.service.api + '/material/as-vendor-ex-allocate/updateEx', // [POST] 供应商(公司)档案修改
      detail: Config.service.api + '/material/as-vendor-ex-allocate/updateFind/{id}' // [GET]供应商(公司)详情查询
    },
    // 客户(集团)档案
    customerGroup: {
      organizationTrees: Config.service.api + '/sys-organization/trees', // [] 按钮弹窗资源
      trees: Config.service.api + '/material/as-customer-class/material/tree', // [get] 客户(集团)档案
      list: Config.service.api + '/material/as-customer/list', // [post] 客户(集团)档案数据
      save: Config.service.api + '/material/as-customer/createEx', // [POST] 客户(集团)档案保存
      update: Config.service.api + '/material/as-customer/updateEx', // [POST] 客户(集团)档案修改
      delete: Config.service.api + '/material/as-customer/material/delete/{id}', // [DELETE] 客户(集团)档案保存
      enable: Config.service.api + '/material/as-customer/enable', // [POST]客户(集团)启用
      disable: Config.service.api + '/material/as-customer/disable', // [POST]客户(集团)禁用
      syn: Config.service.api + '/material/as-customer/datax', // [PUT]客户(集团)档案同步
      detail: Config.service.api + '/material/as-customer/get/{id}', // [GET]客户(集团)详情查询
      allocate: Config.service.api + '/material/as-customer/allocate', // [POST]客户(集团)客户档案分配
      cancelAllocate: Config.service.api + '/material/as-customer/cancelAllocate', // [POST]取消客户(集团)客户档案分配
      cancelAll: Config.service.api + '/material/as-customer/cancelAll', // [POST]取消全部客户(集团)客户档案分配
      findAllocate: Config.service.api + '/material/as-customer/findAllocate/{id}' // [GET]查看分配(集团)客户档案分配
    },
    // 客户(公司)档案
    customerOrganization: {
      trees: Config.service.api + '/material/as-customer-class/material/tree', // [get] 客户(公司)档案
      list: Config.service.api + '/material/as-customer-ex-allocate/getlist', // [post] 客户(公司)档案数据
      save: Config.service.api + '/material/as-customer-ex-allocate/addCreate', // [POST] 客户(公司)档案保存
      update: Config.service.api + '/material/as-customer-ex-allocate/updateEx', // [POST] 客户(公司)档案修改
      detail: Config.service.api + '/material/as-customer-ex-allocate/updateFind/{id}' // [GET]客户(公司)详情查询
    },
    // 物料(集团)档案
    inventoryGroup: {
      organizationTrees: Config.service.api + '/sys-organization/trees', // [] 按钮弹窗资源
      trees: Config.service.api + '/material/as-inventory-class/material/tree', // [get] 物料(集团)档案
      list: Config.service.api + '/material/as-inventory/list', // [post] 物料(集团)档案数据
      save: Config.service.api + '/material/as-inventory/createEx', // [POST] 物料(集团)档案保存
      update: Config.service.api + '/material/as-inventory/updateEx', // [POST] 物料(集团)档案修改
      syn: Config.service.api + '/material/as-inventory/datax', // [PUT]物料(集团)档案同步
      delete: Config.service.api + '/material/as-inventory/material/delete/{id}', // [DELETE] 物料(集团)档案保存
      enable: Config.service.api + '/material/as-inventory/enable', // [POST]物料(集团)启用
      disable: Config.service.api + '/material/as-inventory/disable', // [POST]物料(集团)禁用
      detail: Config.service.api + '/material/as-inventory/get/{id}', // [GET]物料(集团)详情查询
      allocate: Config.service.api + '/material/as-inventory/allocate', // [POST]物料(集团)物料档案分配
      cancelAllocate: Config.service.api + '/material/as-inventory/cancelAllocate', // [POST]取消物料(集团)物料档案分配
      cancelAll: Config.service.api + '/material/as-inventory/cancelAll', // [POST]取消全部物料(集团)物料档案分配
      findAllocate: Config.service.api + '/material/as-inventory/findAllocate/{id}' // [GET]查看分配物料(集团)物料档案分配
    },
    // 物料(公司)档案
    inventoryOrganization: {
      trees: Config.service.api + '/material/as-inventory-class/material/tree', // [get] 物料(公司)档案
      list: Config.service.api + '/material/as-inventory-ex-allocate/getlist', // [post] 物料(公司)档案数据
      save: Config.service.api + '/material/as-inventory-ex-allocate/addCreate', // [POST] 物料(公司)档案保存
      update: Config.service.api + '/material/as-inventory-ex-allocate/updateEx', // [POST] 物料(公司)档案修改
      detail: Config.service.api + '/material/as-inventory-ex-allocate/updateFind/{id}' // [GET]物料(公司)详情查询
    },
    // 批号档案
    batch: {
      list: Config.service.api + '/material/as-batch-num/list', // [post]批号档案列表
      save: Config.service.api + '/material/as-batch-num/create', // [POST] 批号档案保存
      update: Config.service.api + '/material/as-batch-num/update?', // [POST] 批号档案档案修改
      delete: Config.service.api + '/material/as-batch-num/deletes?_method=DELETE', // [DELETE] 批号档案删除
      enable: Config.service.api + '/material/as-batch-num/enable', // [POST]批号档案启用
      disable: Config.service.api + '/material/as-batch-num/disable', // [POST]批号档案禁用
      detail: Config.service.api + '/material/as-batch-num/get/{id}' // [GET]批号档案详情查询
    },
    // 自定义档案
    defdoc: {
      trees: Config.service.api + '/material/as-defdoc-class/material/tree', // [get] 自定义档案
      list: Config.service.api + '/material/as-defdoc/material/list', // [post] 自定义档案数据
      save: Config.service.api + '/material/as-defdoc/material/create', // [POST] 自定义档案保存
      syn: Config.service.api + '/material/as-defdoc/datax', // [PUT]自定义档案同步
      update: Config.service.api + '/material/as-defdoc/material/update', // [POST] 自定义档案修改
      delete: Config.service.api + '/material/as-defdoc/delete/{id}', // [DELETE] 自定义删除
      enable: Config.service.api + '/material/as-defdoc/enable', // [POST]自定义启用
      disable: Config.service.api + '/material/as-defdoc/disable', // [POST]自定义禁用
      detail: Config.service.api + '/material/as-defdoc/material/get/{id}' // [GET]自定义详情查询
    },
    // 动态报表逻辑视图
    dynamicReport: {
      list: Config.service.api + '/report/logic-view/list/report', // [post] xxxxx
      update: Config.service.api + '/material/as-defdoc/material/update' // [POST] xxxxxxx11234
    },
    // 逻辑视图字段解释
    templateFieldsInfo: {
      list: Config.service.api + '/report/template-fields-info/table/{id}', // [post] xxxxx
      update: Config.service.api + '/report/template-fields-info/tableInfo' // [POST] xxxxxxx11234
    },
    // 计量单位档案
    cmputation: {
      trees: Config.service.api + '/material/as-computation-group/material/tree', // [get] 计量单位档案
      list: Config.service.api + '/material/as-computation/material/list', // [post] 计量单位档案数据
      save: Config.service.api + '/material/as-computation/material/create', // [POST] 计量单位档案保存
      update: Config.service.api + '/material/as-computation/material/update', // [POST] 计量单位档案修改
      delete: Config.service.api + '/material/as-computation/material/delete/{id}', // [DELETE] 计量单位删除
      enable: Config.service.api + '/material/as-computation/enable', // [POST]计量单位启用
      disable: Config.service.api + '/material/as-computation/disable', // [POST]计量单位禁用
      detail: Config.service.api + '/material/as-computation/material/get/{id}' // [GET]计量单位详情查询
    },
    // 编号前缀
    numberPrefix: {
      trees: Config.service.api + '/material/as-number-prefix-type/material/tree', // [get] 编号类型树
      list: Config.service.api + '/material/as-number-prefix/material/list', // [post] 编号前缀数据
      syn: Config.service.api + '/material/as-number-prefix/datax', // [PUT]编号档案同步
      save: Config.service.api + '/material/as-number-prefix/material/create', // [POST] 编号前缀保存
      update: Config.service.api + '/material/as-number-prefix/material/update', // [POST] 编号前缀修改
      delete: Config.service.api + '/material/as-number-prefix/material/delete/{id}', // [DELETE] 编号前缀删除
      enable: Config.service.api + '/material/as-number-prefix/enable', // [POST]编号前缀启用
      disable: Config.service.api + '/material/as-number-prefix/disable', // [POST]编号前缀禁用
      detail: Config.service.api + '/material/as-number-prefix/material/get/{id}' // [GET]编号前缀详情查询
    },
    // 登记单异常管理
    registryError: {
      list: Config.service.api + '/registry/tr-registry-error/list', // [post] 登记单异常列表
      completion: Config.service.api + '/registry/tr-registry-error/completion', // [POST] 登记单异常批量处理
      delete: Config.service.api + '/registry/tr-registry-error/deletes/{id}', // [DELETE] 登记单异常删除
      detail: Config.service.api + '/registry/tr-registry-error/{id}' // [GET]登记单异常详情查询
    },
    // 优先叫号
    purlist: {
      list: Config.service.api + '/registry/tr-registry/list/status', // [post] 列表查看已进场未叫号的数据
      update: Config.service.api + '/registry/tr-registry/callByPuRegistryId/{id}', // [post] 判断优先叫号规则
      getOneUpdate: Config.service.api + '/registry/tr-registry/callByPuRegistryIdupdata' // [post]要车：选定规则进行叫号
    },
    // 采购通知单
    puNotice: {
      list: Config.service.api + '/purorder/pu-notice/list', // [post] 采购通知单数据
      save: Config.service.api + '/purorder/pu-notice/create', // [post] 采购通知单数据保存
      detail: Config.service.api + '/purorder/pu-notice/get/{id}', // [GET]采购通知单详情查询
      syn: Config.service.api + '/purorder/pu-notice/datax', // [PUT]采购通知单同步
      delete: Config.service.api + '/purorder/pu-notice/delList', // [DELETE] 采购通知单删除
      update: Config.service.api + '/purorder/pu-notice/update', // [PUT] 采购通知单修改
      audit: Config.service.api + '/purorder/pu-notice/audit', // [post] 采购通知单审核
      enable: Config.service.api + '/purorder/pu-notice/enable', // [POST]采购通知单启用
      disable: Config.service.api + '/purorder/pu-notice/disable', // [POST]采购通知单禁用
      obsolete: Config.service.api + '/purorder/pu-notice/obsolete', // [POST]采购通知单废弃
      copy: Config.service.api + '/purorder/pu-notice/copy/{id}' // [POST]采购通知单复制
    },
    // 采购登记单
    puRegistry: {
      list: Config.service.api + '/purorder/tr-registry/lists', // [post] 采购登记单数据
      save: Config.service.api + '/purorder/tr-registry/create', // [post] 采购登记单数据保存
      detail: Config.service.api + '/purorder/tr-registry/update/{id}', // [GET]采购登记单详情查询
      update: Config.service.api + '/purorder/tr-registry/update', // [POST] 采购登记单修改
      updateWeighsByNotice: Config.service.api + '/measure/mm-pu-weigh-sub/batchChangeNotice', // [POST] 采购登记单批量修改订单
      noSafeUpdate: Config.service.api + '/flow/inf/common/noSafeUpdate', // [POST] 采购登记单高级修改
      delete: Config.service.api + '/registry/tr-registry/updateDel?_method=DELETE', // [POST] 采购登记单删除
      audit: Config.service.api + '/registry/tr-registry/audit', // [post] 采购登记单审核
      enable: Config.service.api + '/registry/tr-registry/enable', // [POST]采购登记单启用
      disable: Config.service.api + '/registry/tr-registry/disable', // [POST]采购登记单禁用
      obsolete: Config.service.api + '/registry/tr-registry/obsolete', // [POST]采购登记单废弃
      recover: Config.service.api + '/registry/tr-registry/recover', // [POST]采购登记单恢复
      copy: Config.service.api + '/purorder/tr-registry/copy/{id}', // [POST]采购登记单复制
      supplementCard: Config.service.api + '/registry/tr-registry/supplement_card', // [POST]采购登记单补卡
      checkCard: Config.service.api + '/registry/tr-registry/check_card', // [POST]采购登记单验卡
      readCard: Config.service.api + '/registry/tr-registry/read_card', // [POST]采购登记单读卡
      letin: Config.service.api + '/registry/tr-registry/entrance', // [POST]采购登记单入场
      letout: Config.service.api + '/registry/tr-registry/hisRelease', // [POST]采购登记单出场
      upControlPoint: Config.service.api + '/registry/tr-registry/getUpOrDowControlPoint', // [POST]采购登记单跳转节点
      againMatch: Config.service.api + '/registry/tr-registry/againMatch/{id}', // [GET]采购登记单重新匹配排队规则
      picture: Config.service.api + '/registry/tr-registry/viewImage/{id}', // [GET]采购登记单查看图片
      getSub: Config.service.api + '/registry/tr-registry-sub/getregistrysub/{id}', // [GET]查找子表数据
      upload: Config.service.api + '/upload/weightSap/uploadSap' // [POST]转库过磅单上传
    },
    // 采购扣罚标准
    puContract: {
      list: Config.service.api + '/purorder/pu-contract/lists', // [post] 扣罚标准数据
      save: Config.service.api + '/purorder/pu-contract/create', // [post] 扣罚标准数据保存
      detail: Config.service.api + '/purorder/pu-contract/get/{id}', // [GET]扣罚标准详情查询
      update: Config.service.api + '/purorder//pu-contract/update', // [put] 扣罚标准修改
      delete: Config.service.api + '/purorder/pu-contract/delList', // [post] 扣罚标准删除
      audit: Config.service.api + '/purorder/pu-contract/audit', // [post] 扣罚标准审核
      obsolete: Config.service.api + '/purorder/pu-contract/obsolete', // [POST]扣罚标准废弃
      copy: Config.service.api + '/purorder/pu-contract/copy/{id}', // [get]扣罚标准复制
      plist: Config.service.api + '/purorder/pu-contract/plist', // [post] 采购扣罚标准列表查看
      pdelList: Config.service.api + '/purorder/pu-contract/pdelList', // [post] 采购扣罚标准列删除
      clist: Config.service.api + '/purorder/pu-contract/clist', // [post] 采购合同调价列表查看
      csave: Config.service.api + '/purorder/pu-contract-pricing/create', // [post] 采购合同调价数据保存
      deletes: Config.service.api + '/purorder/pu-contract-pricing/deletes', // [post] 采购合同调价删除
      insert: Config.service.api + '/purorder/pu-contract/insert', // [post] 采购合同关联通知单
      cdelList: Config.service.api + '/purorder/pu-contract/cdelList' // [post] 采购合同删除关联通知单
    },
    // 采购划价单
    fdPuCalculation: {
      poundList: Config.service.api + '/measure/mm-pu-weigh-sub/planPoundlist', // [post] 磅单列表
      list: Config.service.api + '/purorder/fd_pu_calculation/list', // [post] 采购划价单数据
      save: Config.service.api + '/purorder/fd_pu_calculation/create', // [post] 采购划价单数据保存
      detail: Config.service.api + '/purorder/fd_pu_calculation/{id}', // [GET]采购划价单详情查询
      audit: Config.service.api + '/purorder/fd_pu_calculation/examine', // [post] 采购划价单审核
      delete: Config.service.api + '/purorder/fd_pu_calculation/delList', // [post] 采购划价单删除
      getId: Config.service.api + '/purorder/fd_pu_calculation/getId', // [get] 采购划价单UUid生成
      confirmPounds: Config.service.api + '/measure/mm-pu-weigh-sub/confirmPounds', // [post] 采购划价锁定磅单
      getSubPounds: Config.service.api + '/purorder/fd_pu_calculation/poundListedit' // [Post]采购划价查询磅单子表信息
    },
    // 采购結算单
    fdPuSettlement: {
      poundList: Config.service.api + '/measure/mm-pu-weigh/puSettlementWeightList', // [post] 磅单列表
      list: Config.service.api + '/purorder/fd-pu-settlement/list', // [post] 采购結算单数据
      save: Config.service.api + '/purorder/fd-pu-settlement/create', // [post] 采购結算单数据保存
      detail: Config.service.api + '/purorder/fd-pu-settlement/get/{id}', // [GET]采购結算单详情查询
      audit: Config.service.api + '/purorder/fd-pu-settlement/examine', // [post] 采购結算单审核
      delete: Config.service.api + '/purorder/fd-pu-settlement/delete/{id}', // [delete] 采购結算单删除
      getId: Config.service.api + '/purorder/fd-pu-settlement/getId', // [get] 采购結算UUid生成
      confirmPounds: Config.service.api + '/measure/mm-pu-weigh-sub/saconfirmPounds' // [post] 采购結算锁定磅单

    },
    // 采购现场确认
    confirmPuWeigh: {
      list: Config.service.api + '/measure/confirm-pu-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-pu-weigh/submit' // [post] 提交
    },
    // 销售现场确认
    confirmSaWeigh: {
      list: Config.service.api + '/measure/confirm-sa-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-sa-weigh/submit' // [post] 提交
    },
    // 调拨收货现场确认
    confirmAlShWeigh: {
      list: Config.service.api + '/measure/confirm-al-sh-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-al-sh-weigh/submit' // [post] 提交
    },
    // 调拨发货现场确认
    confirmAlFhWeigh: {
      list: Config.service.api + '/measure/confirm-al-fh-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-al-fh-weigh/submit' // [post] 提交
    },
    // 转库收货现场确认
    confirmTrShWeigh: {
      list: Config.service.api + '/measure/confirm-tr-sh-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-tr-sh-weigh/submit' // [post] 提交
    },
    // 转库发货现场确认
    confirmTrFhWeigh: {
      list: Config.service.api + '/measure/confirm-tr-fh-weigh/list', // [post] 列表
      submit: Config.service.api + '/measure/confirm-tr-fh-weigh/submit' // [post] 提交
    },
    // 采购过磅单
    mmPuWeigh: {
      list: Config.service.api + '/measure/mm-pu-weigh/list', // [post] 采购过磅单数据
      save: Config.service.api + '/measure/mm-pu-weigh/create', // [post] 采购过磅单数据保存
      syn: Config.service.api + '/measure/mm-pu-weigh/datax', // [PUT]采购磅单同步
      detail: Config.service.api + '/measure/mm-pu-weigh/{id}', // [GET]采购过磅单详情查询
      delete: Config.service.api + '/measure/mm-pu-weigh/delList', // [DELETE] 采购过磅单删除
      audit: Config.service.api + '/measure/mm-pu-weigh/audit', // [post] 采购过磅单审核
      enable: Config.service.api + '/measure/mm-pu-weigh/enable', // [POST]采购过磅单启用
      disable: Config.service.api + '/measure/mm-pu-weigh/disable', // [POST]采购过磅单禁用
      obsolete: Config.service.api + '/measure/mm-pu-weigh/obsolete', // [POST]采购过磅单废弃
      copy: Config.service.api + '/measure/mm-pu-weigh/copy/{id}', // [POST]采购过磅单复制
      update: Config.service.api + '/measure/mm-pu-weigh/update', // [put] 采购过磅单修改
      batchChangeNotice: Config.service.api + '/measure/mm-pu-weigh/batchChangeNotice', // [POST] 采购磅单批量修改订单
      down: Config.service.api + '/measure/mm-pu-weigh/down/{id}', // [POST]采购过磅单冲减
      reversedown: Config.service.api + '/measure/mm-pu-weigh/reversedown/{id}', // [POST]采购过磅单反冲减
      outDoorUpdate: Config.service.api + '/measure/mm-pu-weigh/outDoorUpdate', // [put] 采购过磅单出厂修改
      returnGoods: Config.service.api + '/measure/mm-weigh/returnGoods/{id}' // [POST] 采购过磅单退货
    },
    // 销售过磅单
    mmSaWeigh: {
      list: Config.service.api + '/measure/mm-sa-weigh/list', // [post] 销售过磅单数据
      save: Config.service.api + '/measure/mm-sa-weigh/create', // [post] 销售过磅单数据保存
      syn: Config.service.api + '/measure/mm-sa-weigh/datax', // [PUT]销售磅单同步
      detail: Config.service.api + '/measure/mm-sa-weigh/{id}', // [GET]销售过磅单详情查询
      delete: Config.service.api + '/measure/mm-sa-weigh/delList', // [DELETE] 销售过磅单删除
      audit: Config.service.api + '/measure/mm-sa-weigh/audit', // [post] 销售过磅单审核
      enable: Config.service.api + '/measure/mm-sa-weigh/enable', // [POST]销售过磅单启用
      disable: Config.service.api + '/measure/mm-sa-weigh/disable', // [POST]销售过磅单禁用
      obsolete: Config.service.api + '/measure/mm-sa-weigh/obsolete', // [POST]销售过磅单废弃
      copy: Config.service.api + '/measure/mm-sa-weigh/copy/{id}', // [POST]销售过磅单复制
      update: Config.service.api + '/measure/mm-sa-weigh/updatedoor', // [post] 销售过磅单修改
      down: Config.service.api + '/measure/mm-sa-weigh/down/{id}', // [POST]销售过磅单冲减
      reversedown: Config.service.api + '/measure/mm-sa-weigh/reversedown/{id}', // [POST]销售过磅单反冲减
      returnGoods: Config.service.api + '/measure/mm-weigh/returnGoods/{id}', // [POST] 销售过磅单退货
      upload: Config.service.api + '/upload/weightSap/uploadSap' // [POST]销售过磅单上传
    },
    // 调拨过磅单
    mmAlWeigh: {
      list: Config.service.api + '/measure/mm-al-weigh/list', // [post] 调拨过磅单数据
      save: Config.service.api + '/measure/mm-al-weigh/create', // [post] 调拨过磅单数据保存
      syn: Config.service.api + '/measure/mm-al-weigh/datax', // [PUT]调拨磅单同步
      detail: Config.service.api + '/measure/mm-al-weigh/{id}', // [GET]调拨过磅单详情查询
      delete: Config.service.api + '/measure/mm-al-weigh/delList', // [DELETE] 调拨过磅单删除
      audit: Config.service.api + '/measure/mm-al-weigh/audit', // [post] 调拨过磅单审核
      enable: Config.service.api + '/measure/mm-al-weigh/enable', // [POST]调拨过磅单启用
      disable: Config.service.api + '/measure/mm-al-weigh/disable', // [POST]调拨过磅单禁用
      obsolete: Config.service.api + '/measure/mm-al-weigh/obsolete', // [POST]调拨过磅单废弃
      copy: Config.service.api + '/measure/mm-al-weigh/copy/{id}', // [POST]调拨过磅单复制
      update: Config.service.api + '/measure/mm-al-weigh/update', // [put] 调拨过磅单修改
      down: Config.service.api + '/measure/mm-al-weigh/down/{id}', // [POST]采购过磅单冲减
      reversedown: Config.service.api + '/measure/mm-al-weigh/reversedown/{id}' // [POST]采购过磅单反冲减
    },
    // 转库过磅单
    mmTrWeigh: {
      list: Config.service.api + '/measure/mm-tr-weigh/list', // [post] 转库过磅单数据
      save: Config.service.api + '/measure/mm-tr-weigh/create', // [post] 转库过磅单数据保存
      syn: Config.service.api + '/measure/mm-tr-weigh/datax', // [PUT]转库磅单同步
      detail: Config.service.api + '/measure/mm-tr-weigh/{id}', // [GET]转库过磅单详情查询
      delete: Config.service.api + '/measure/mm-tr-weigh/delList', // [DELETE] 转库过磅单删除
      audit: Config.service.api + '/measure/mm-tr-weigh/audit', // [post] 转库过磅单审核
      enable: Config.service.api + '/measure/mm-tr-weigh/enable', // [POST]转库过磅单启用
      disable: Config.service.api + '/measure/mm-tr-weigh/disable', // [POST]转库过磅单禁用
      obsolete: Config.service.api + '/measure/mm-tr-weigh/obsolete', // [POST]转库过磅单废弃
      update: Config.service.api + '/measure/mm-tr-weigh/update', // [put] 转库过磅单修改
      copy: Config.service.api + '/measure/mm-tr-weigh/copy/{id}', // [POST]转库过磅单复制
      down: Config.service.api + '/measure/mm-tr-weigh/down/{id}', // [POST]转库过磅单冲减
      reversedown: Config.service.api + '/measure/mm-tr-weigh/reversedown/{id}' // [POST]转库过磅单反冲减
    },
    // 销售提单
    saNotice: {
      list: Config.service.api + '/sale/sa-notice/list', // [post] 销售提单数据
      save: Config.service.api + '/sale/sa-notice/create', // [post] 销售提单保存
      syn: Config.service.api + '/sale/sa-notice/datax', // [PUT]销售通知单同步
      detail: Config.service.api + '/sale/sa-notice/get/{id}', // [GET]销售提单详情查询
      update: Config.service.api + '/sale/sa-notice/update', // [PUT] 销售提单修改
      delete: Config.service.api + '/sale/sa-notice/delList', // [post] 销售提单删除
      audit: Config.service.api + '/sale/sa-notice/audit', // [post] 销售提单审核
      enable: Config.service.api + '/sale/sa-notice/enable', // [POST]销售提单启用
      disable: Config.service.api + '/sale/sa-notice/disable', // [POST]销售提单禁用
      obsolete: Config.service.api + '/sale/sa-notice/obsolete', // [POST]销售提单废弃
      copy: Config.service.api + '/sale/sa-notice/copy/{id}' // [POST]销售提单复制
    },
    // 销售价格策略
    saPrice: {
      list: Config.service.api + '/sale/sa-price/list', // [post] 销售价格策略数据
      save: Config.service.api + '/sale/sa-price/create', // [post] 销售价格策略保存
      detail: Config.service.api + '/sale/sa-price/{id}', // [GET]销售价格策略详情查询
      update: Config.service.api + '/sale/sa-price/update', // [PUT] 销售价格策略修改
      delete: Config.service.api + '/sale/sa-price/deletes', // [post] 销售价格策略删除
      audit: Config.service.api + '/sale/sa-price/audit' // [post] 销售价格策略审核
    },
    // 调拨通知单
    alNotice: {
      list: Config.service.api + '/allot/al-notice/list', // [post] 调拨通知单数据
      save: Config.service.api + '/allot/al-notice/create', // [post] 调拨通知单保存
      detail: Config.service.api + '/allot/al-notice/get/{id}', // [GET]调拨通知单详情查询
      update: Config.service.api + '/allot/al-notice/update', // [PUT] 调拨通知单修改
      delete: Config.service.api + '/allot/al-notice/delList', // [post] 调拨通知单删除
      audit: Config.service.api + '/allot/al-notice/audit', // [post] 调拨通知单审核
      enable: Config.service.api + '/allot/al-notice/enable', // [POST]调拨通知单启用
      disable: Config.service.api + '/allot/al-notice/disable', // [POST]调拨通知单禁用
      obsolete: Config.service.api + '/allot/al-notice/obsolete', // [POST]调拨通知单废弃
      copy: Config.service.api + '/allot/al-notice/copy/{id}' // [POST]调拨通知单复制
    },
    // 转库通知单
    trNotice: {
      list: Config.service.api + '/transfer/tr-notice/list', // [post] 转库通知单数据
      save: Config.service.api + '/transfer/tr-notice/create', // [post] 转库通知单保存
      syn: Config.service.api + '/transfer/tr-notice/datax', // [PUT]转库通知单同步
      detail: Config.service.api + '/transfer/tr-notice/get/{id}', // [GET]转库通知单详情查询
      update: Config.service.api + '/transfer/tr-notice/update', // [PUT] 转库通知单修改
      delete: Config.service.api + '/transfer/tr-notice/delList', // [post] 转库通知单删除
      audit: Config.service.api + '/transfer/tr-notice/audit', // [post] 转库通知单审核
      enable: Config.service.api + '/transfer/tr-notice/enable', // [POST]转库通知单启用
      disable: Config.service.api + '/transfer/tr-notice/disable', // [POST]转库通知单禁用
      obsolete: Config.service.api + '/transfer/tr-notice/obsolete', // [POST]转库通知单废弃
      copy: Config.service.api + '/transfer/tr-notice/copy/{id}' // [POST]转库通知单复制
    },
    // 销售登记单
    saRegistry: {
      list: Config.service.api + '/sale/tr-registry/lists', // [post] 销售登记单数据
      save: Config.service.api + '/sale/tr-registry/create', // [post] 销售登记单数据保存
      detail: Config.service.api + '/sale/tr-registry/update/{id}', // [GET]销售登记单详情查询
      update: Config.service.api + '/sale/tr-registry/update', // [POST] 销售登记单修改
      updateWeighsByNotice: Config.service.api + '/measure/mm-sa-weigh-sub/batchChangeNotice', // [POST] 销售登记单批量修改订单
      delete: Config.service.api + '/registry/tr-registry/updateDel?_method=DELETE', // [POST] 销售登记单删除
      audit: Config.service.api + '/registry/tr-registry/audit', // [post] 销售登记单审核
      enable: Config.service.api + '/registry/tr-registry/enable', // [POST]销售登记单启用
      disable: Config.service.api + '/registry/tr-registry/disable', // [POST]销售登记单禁用
      obsolete: Config.service.api + '/registry/tr-registry/obsolete', // [POST]销售登记单废弃
      recover: Config.service.api + '/registry/tr-registry/recover', // [POST]销售登记单恢复
      noSafeUpdate: Config.service.api + '/flow/inf/common/noSafeUpdate', // [POST]销售登记高级修改
      copy: Config.service.api + '/purorder/tr-registry/copy/{id}', // [POST]销售登记单复制
      supplementCard: Config.service.api + '/registry/tr-registry/supplement_card', // [POST]销售登记单补卡
      checkCard: Config.service.api + '/registry/tr-registry/check_card', // [POST]销售登记单验卡
      readCard: Config.service.api + '/registry/tr-registry/read_card', // [POST]销售登记单读卡
      letin: Config.service.api + '/registry/tr-registry/entrance', // [POST]销售登记单入场
      letout: Config.service.api + '/registry/tr-registry/hisRelease', // [POST]销售登记单出场
      upControlPoint: Config.service.api + '/registry/tr-registry/getUpOrDowControlPoint', // [POST]销售登记单跳转节点
      picture: Config.service.api + '/registry/tr-registry/viewImage/{id}', // [GET]销售登记单查看图片
      againMatch: Config.service.api + '/registry/tr-registry/againMatch/{id}', // [GET]销售登记单重新匹配排队规则
      getSub: Config.service.api + '/registry/tr-registry-sub/getregistrysub/{id}' // [GET]查找子表数据
    },
    // 调拨登记单
    alRegistry: {
      list: Config.service.api + '/allot/tr-registry/lists', // [post] 调拨登记单数据
      save: Config.service.api + '/allot/tr-registry/create', // [post] 调拨登记单数据保存
      detail: Config.service.api + '/allot/tr-registry/update/{id}', // [GET]调拨登记单详情查询
      update: Config.service.api + '/allot/tr-registry/update', // [POST] 调拨登记单修改
      noSafeUpdate: Config.service.api + '/flow/inf/common/noSafeUpdate', // [POST] 调拨登记单高级修改
      delete: Config.service.api + '/registry/tr-registry/updateDel?_method=DELETE', // [DELETE] 调拨登记单删除
      audit: Config.service.api + '/registry/tr-registry/audit', // [post] 调拨登记单审核
      enable: Config.service.api + '/registry/tr-registry/enable', // [POST]调拨登记单启用
      disable: Config.service.api + '/registry/tr-registry/disable', // [POST]调拨登记单禁用
      obsolete: Config.service.api + '/registry/tr-registry/obsolete', // [POST]调拨登记单废弃
      recover: Config.service.api + '/registry/tr-registry/recover', // [POST]调拨登记单恢复
      copy: Config.service.api + '/purorder/tr-registry/copy/{id}', // [POST]调拨登记单复制
      supplementCard: Config.service.api + '/registry/tr-registry/supplement_card', // [POST]调拨登记单补卡
      checkCard: Config.service.api + '/registry/tr-registry/check_card', // [POST]调拨登记单验卡
      readCard: Config.service.api + '/registry/tr-registry/read_card', // [POST]调拨登记单读卡
      letin: Config.service.api + '/registry/tr-registry/entrance', // [POST]调拨登记单入场
      letout: Config.service.api + '/registry/tr-registry/hisRelease', // [POST]调拨登记单出场
      upControlPoint: Config.service.api + '/registry/tr-registry/getUpOrDowControlPoint', // [POST]调拨登记单跳转节点
      picture: Config.service.api + '/registry/tr-registry/viewImage/{id}', // [GET]调拨登记单查看图片
      againMatch: Config.service.api + '/registry/tr-registry/againMatch/{id}', // [GET]调拨登记单重新匹配排队规则
      getSub: Config.service.api + '/registry/tr-registry-sub/getregistrysub/{id}' // [GET]查找子表数据
    },
    // 转库登记单
    trRegistry: {
      list: Config.service.api + '/transfer/tr-registry/lists', // [post] 转库登记单数据
      save: Config.service.api + '/transfer/tr-registry/create', // [post] 转库登记单数据保存
      detail: Config.service.api + '/transfer/tr-registry/update/{id}', // [GET]转库登记单详情查询
      update: Config.service.api + '/transfer/tr-registry/update', // [POST] 转库登记单修改
      noSafeUpdate: Config.service.api + '/flow/inf/common/noSafeUpdate', // [POST] 转库登记单高级修改
      updateWeighsByNotice: Config.service.api + '/measure/mm-tr-weigh-sub/batchChangeNotice', // [POST] 转库登记单批量修改订单
      delete: Config.service.api + '/registry/tr-registry/updateDel?_method=DELETE', // [POST] 转库登记单删除
      audit: Config.service.api + '/registry/tr-registry/audit', // [post] 转库登记单审核
      enable: Config.service.api + '/registry/tr-registry/enable', // [POST]转库登记单启用
      disable: Config.service.api + '/registry/tr-registry/disable', // [POST]转库登记单禁用
      obsolete: Config.service.api + '/registry/tr-registry/obsolete', // [POST]转库登记单废弃
      recover: Config.service.api + '/registry/tr-registry/recover', // [POST]转库登记单恢复
      copy: Config.service.api + '/purorder/tr-registry/copy/{id}', // [POST]转库登记单复制
      supplementCard: Config.service.api + '/registry/tr-registry/supplement_card', // [POST]转库登记单补卡
      checkCard: Config.service.api + '/registry/tr-registry/check_card', // [POST]转库登记单验卡
      readCard: Config.service.api + '/registry/tr-registry/read_card', // [POST]转库登记单读卡
      letin: Config.service.api + '/registry/tr-registry/entrance', // [POST]转库登记单入场
      letout: Config.service.api + '/registry/tr-registry/hisRelease', // [POST]转库登记单出场
      upControlPoint: Config.service.api + '/registry/tr-registry/getUpOrDowControlPoint', // [POST]转库登记单跳转节点
      picture: Config.service.api + '/registry/tr-registry/viewImage/{id}', // [GET]转库登记单查看图片
      againMatch: Config.service.api + '/registry/tr-registry/againMatch/{id}', // [GET]转库登记单重新匹配排队规则
      getSub: Config.service.api + '/registry/tr-registry-sub/getregistrysub/{id}' // [GET]查找子表数据
    },
    // 销售合同
    saContract: {
      list: Config.service.api + '/sale/sa-contract/list', // [post] 销售合同数据
      save: Config.service.api + '/sale/sa-contract/create', // [post] 销售合同据保存
      detail: Config.service.api + '/sale/sa-contract/get/{id}', // [GET]销售合同详情查询
      update: Config.service.api + '/sale/sa-contract/update', // [put] 销售合同修改
      delete: Config.service.api + '/sale/sa-contract/delList', // [post] 销售合同删除
      audit: Config.service.api + '/sale/sa-contract/audit', // [post] 销售合同审核
      copy: Config.service.api + '/sale/sa-contract/copy/{id}' // [get]销售合同复制
    },
    // 调拨合同
    alContract: {
      list: Config.service.api + '/allot/al-contract/list', // [post] 调拨合同数据
      save: Config.service.api + '/allot/al-contract/create', // [post] 调拨合同据保存
      detail: Config.service.api + '/allot/al-contract/get/{id}', // [GET]调拨合同详情查询
      update: Config.service.api + '/allot/al-contract/update', // [put] 调拨合同修改
      delete: Config.service.api + '/allot/al-contract/delList', // [post] 调拨合同删除
      audit: Config.service.api + '/allot/al-contract/audit', // [post] 调拨合同审核
      copy: Config.service.api + '/allot/al-contract/copy/{id}', // [get]调拨合同复制
      plist: Config.service.api + '/purorder/contract-notice/list', // [post] 调拨扣罚标准列表查看
      pdelList: Config.service.api + '/allot/al-contract/pdelList', // [post] 调拨扣罚标准列删除
      insert: Config.service.api + '/allot/al-contract/insert' // [post] 调拨合同关联通知单
    },
    // 销售划价单
    fdSaCalculation: {
      list: Config.service.api + '/sale/fd-sa-calculation/list', // [post] 销售划价单数据
      save: Config.service.api + '/sale/fd-sa-calculation/create', // [post] 销售划价单数据保存
      detail: Config.service.api + '/sale/fd-sa-calculation/get/{id}', // [GET]销售划价单详情查询
      audit: Config.service.api + '/sale/fd-sa-calculation/examine', // [post] 销售划价单审核
      delete: Config.service.api + '/sale/fd-sa-calculation/delList' // [post] 销售划价单删除
    },
    // 调拨划价单
    fdAlCalculation: {
      list: Config.service.api + '/allot/fd-al-calculation/list', // [post] 调拨划价单数据
      save: Config.service.api + '/allot/fd-al-calculation/create', // [post] 调拨划价单数据保存
      detail: Config.service.api + '/allot/fd-al-calculation/{id}', // [GET]调拨划价单详情查询
      audit: Config.service.api + '/allot/fd-al-calculation/examine', // [post] 调拨划价单审核
      delete: Config.service.api + '/allot/fd-al-calculation/delList' // [post] 调拨划价单删除
    },
    // 销售結算单
    fdSaSettlement: {
      poundList: Config.service.api + '/measure/mm-sa-weigh/saSettlementWeightList', // [post] 磅单列表
      list: Config.service.api + '/sale/fd-sa-settlement/list', // [post]  销售結算单数据
      save: Config.service.api + '/sale/fd-sa-settlement/create', // [post]  销售結算单数据保存
      detail: Config.service.api + '/sale/fd-sa-settlement/get/{id}', // [GET] 销售結算单详情查询
      audit: Config.service.api + '/sale/fd-sa-settlement/examine', // [post]  销售結算单审核
      delete: Config.service.api + '/sale/fd-sa-settlement/delete/{id}', // [delete]  销售結算单删除
      getId: Config.service.api + '/sale/fd-sa-settlement/getId', // [get] 销售結算UUid生成
      confirmPounds: Config.service.api + '/measure/mm-sa-weigh-sub/saconfirmPounds' // [post] 销售結算锁定磅单
    },
    // 调拨結算单
    fdAlSettlement: {
      list: Config.service.api + '/allot/fd-al-settlement/list', // [post]  销售結算单数据
      save: Config.service.api + '/allot/fd-al-settlement/create', // [post]  销售結算单数据保存
      detail: Config.service.api + '/allot/fd-al-settlement/get/{id}', // [GET] 销售結算单详情查询
      audit: Config.service.api + '/allot/fd-al-settlement/examine', // [post]  销售結算单审核
      delete: Config.service.api + '/allot/fd-al-settlement/delete/{id}' // [delete]  销售結算单删除
    },
    // 质检管理-化验单档案
    assayformat: {
      list: Config.service.api + '/quality/qc-assay-format/list', // [post] 化验单档案数据
      save: Config.service.api + '/quality/qc-assay-format/create', // [post] 化验单档案数据保存
      detail: Config.service.api + '/quality/qc-assay-format/{id}', // [GET]化验单档案详情查询
      delete: Config.service.api + '/quality/qc-assay-format/deletes', // [DELETE] 化验单档案删除
      audit: Config.service.api + '/quality/qc-assay-format/audit', // [post] 化验单档案审核
      enable: Config.service.api + '/quality/qc-assay-format/enable', // [POST]化验单档案启用
      disable: Config.service.api + '/quality/qc-assay-format/disable', // [POST]化验单档案禁用
      obsolete: Config.service.api + '/quality/qc-assay-format/obsolete', // [POST]化验单档案废弃
      copy: Config.service.api + '/quality/qc-assay-format/copy/{id}', // [POST]化验单档案复制
      update: Config.service.api + '/quality/qc-assay-format/update', // [put] 化验单档案修改
      getAssayFormatSub: Config.service.api + '/quality/qc-assay-format/type/subs' // [get] 化验单档案的属性配置列表
    },
    // 质检管理-化验单列表
    assay: {
      list: Config.service.api + '/quality/qc-assay/list', // [post] 列表数据
      getListByFormatId: Config.service.api + '/quality/qc-assay/list/{id}', // [get] 列表数据
      save: Config.service.api + '/quality/qc-assay/create', // [post] 化验单档案数据保存
      saveGroupAssay: Config.service.api + '/quality/qc-assay/create/group/assay', // [post] 化验单档案数据保存
      detail: Config.service.api + '/quality/qc-assay/{id}', // [GET]化验单档案详情查询
      delete: Config.service.api + '/quality/qc-assay/deletes', // [DELETE] 化验单档案删除
      audit: Config.service.api + '/quality/qc-assay/audit', // [post] 化验单档案审核
      enable: Config.service.api + '/quality/qc-assay/enable', // [POST]化验单档案启用
      disable: Config.service.api + '/quality/qc-assay/disable', // [POST]化验单档案禁用
      obsolete: Config.service.api + '/quality/qc-assay/obsolete', // [POST]化验单档案废弃
      copy: Config.service.api + '/quality/qc-assay/copy/{id}', // [POST]化验单档案复制
      update: Config.service.api + '/quality/qc-assay/update', // [put] 化验单档案修改
      getAssayFormatSub: Config.service.api + '/quality/qc-assay/type/subs' // [get] 化验单档案的属性配置列表
    },
    // 质检管理-化验单档案项目定义
    assayformatSub: {
      getFormSubsByFormatAndTable: Config.service.api + '/quality/qc-assay-format-sub/list/format/table',
      saveListData: Config.service.api + '/quality/qc-assay-format-sub/create/list'
    }
  },
  /** 自定义配置 ************************************************************************/
  source: {
    // 业务类型
    customType: {
      list: Config.service.api + '/optimus_prime/cg-custom-type/list', // [post]  分页参数  {"limit":{"pn":1,"ps":50},"sort":[{"key":"createDate","dir":"desc"}]}
      view: Config.service.api + '/optimus_prime/cg-custom-type/{id}', // [get] 详情查看
      create: Config.service.api + '/optimus_prime/cg-custom-type/create', // [post]  新增
      update: Config.service.api + '/optimus_prime/cg-custom-type/update', // [post]  修改
      delete: Config.service.api + '/optimus_prime/cg-custom-type/deletes', // [delete]   批量删除数据  ids传参
      select: Config.service.api + '/optimus_prime/cg-custom-type/select'// [get] 返回全部业务类型列表(不分页)
    },
    // 业务表
    customTable: {
      list: Config.service.api + '/optimus_prime/cg-custom-table/list', // [post]  分页参数  {"limit":{"pn":1,"ps":50},"sort":[{"key":"createDate","dir":"desc"}]}
      view: Config.service.api + '/optimus_prime/cg-custom-table/info/{id}', // [get] 详情查看
      init: Config.service.api + '/optimus_prime/cg-custom-table/init', // [post] 初始化数据
      create: Config.service.api + '/optimus_prime/cg-custom-table/createvo', // [post]  新增
      update: Config.service.api + '/optimus_prime/cg-custom-table/updatevo', // [post]  修改
      delete: Config.service.api + '/optimus_prime/cg-custom-table/deletes', // [delete]   批量删除数据  ids传参
      select: Config.service.api + '/optimus_prime/cg-custom-table/select'// [get] 返回全部业务类型列表(不分页)
    },
    // 业务属性表
    customTableSub: {
      list: Config.service.api + '/optimus_prime/cg-custom-table-sub/list', // [post]  分页参数  {"limit":{"pn":1,"ps":50},"sort":[{"key":"createDate","dir":"desc"}]}
      view: Config.service.api + '/optimus_prime/cg-custom-table-sub/{id}', // [get] 详情查看
      create: Config.service.api + '/optimus_prime/cg-custom-table-sub/create', // [post]  新增
      update: Config.service.api + '/optimus_prime/cg-custom-table-sub/update', // [post]  修改
      delete: Config.service.api + '/optimus_prime/cg-custom-table-sub/deletes'// [delete]   批量删除数据  ids传参
    },
    // 业务类型关联表
    typeTable: {
      list: Config.service.api + '/optimus_prime/cg-custom-table-type/list',
      view: Config.service.api + '/optimus_prime/cg-custom-table-type/{id}',
      create: Config.service.api + '/optimus_prime/cg-custom-table-type/create',
      update: Config.service.api + '/optimus_prime/cg-custom-table-type/update',
      delete: Config.service.api + '/optimus_prime/cg-custom-table-type/deletes'
      // select: Config.service.api + '/optimus_prime/cg-custom-table-type/select'
    },
    // 业务类型枚举
    customEnum: {
      list: Config.service.api + '/optimus_prime/cg-custom-enum/list',
      view: Config.service.api + '/optimus_prime/cg-custom-enum/info/{id}',
      create: Config.service.api + '/optimus_prime/cg-custom-enum/createvo',
      update: Config.service.api + '/optimus_prime/cg-custom-enum/updatevo',
      delete: Config.service.api + '/optimus_prime/cg-custom-enum/deletes',
      select: Config.service.api + '/optimus_prime/cg-custom-enum/select'// [get] 返回全部业务类型列表(不分页)
    },
    // 业务子表关联映射
    tableSubMap: {
      list: Config.service.api + '/optimus_prime/cg-custom-table-sub-map/list',
      view: Config.service.api + '/optimus_prime/cg-custom-table-sub-map/{id}',
      create: Config.service.api + '/optimus_prime/cg-custom-table-sub-map/create',
      update: Config.service.api + '/optimus_prime/cg-custom-table-sub-map/update',
      delete: Config.service.api + '/optimus_prime/cg-custom-table-sub-map/deletes'
      // select: Config.service.api + '/optimus_prime/cg-custom-table-type/select'
    },
    // 业务模板
    format: {
      listResourceList: Config.service.api + '/optimus_prime/cg-format/formAndResource',
      resourceList: Config.service.api + '/optimus_prime/cg-format/resourceList',
      list: Config.service.api + '/optimus_prime/cg-format/list',
      view: Config.service.api + '/optimus_prime/cg-format/{id}',
      create: Config.service.api + '/optimus_prime/cg-format/create',
      copy: Config.service.api + '/optimus_prime/cg-format/copy',
      update: Config.service.api + '/optimus_prime/cg-format/update',
      delete: Config.service.api + '/optimus_prime/cg-format/deletes',
      getCustomTables: Config.service.api + '/optimus_prime/cg-format/custom/table', // [get] 需要传  参数id(菜单的id)
      getCustomTablesByCode: Config.service.api + '/optimus_prime/cg-format/custom/table/code', // [get] 需要传  参数code
      getFormatByCode: Config.service.api + '/optimus_prime/cg-format/code', // [get] 需要传  参数code
      getSubsByCode: Config.service.api + '/optimus_prime/cg-format/type/subs/code/{id}' // [get] 通过模板code得到模板属性配置
    },
    // 验证
    cgValidate: {
      list: Config.service.api + '/optimusprime/cg-validate/list', // [post]  分页参数  {"limit":{"pn":1,"ps":50},"sort":[{"key":"createDate","dir":"desc"}]}
      view: Config.service.api + '/optimusprime/cg-validate/{id}', // [get] 详情查看
      create: Config.service.api + '/optimusprime/cg-validate/create', // [post]  新增
      update: Config.service.api + '/optimusprime/cg-validate/update', // [post]  修改
      delete: Config.service.api + '/optimusprime/cg-validate/deletes', // [delete]   批量删除数据  ids传参
      select: Config.service.api + '/optimusprime/cg-validate/select'// [get] 返回全部业务类型列表(不分页)
    },
    // 表单业务模板
    formFormat: {
      list: Config.service.api + '/optimus_prime/cg-format-form-sub/list',
      // [get] 通过配置模板id和业务主表id获取列表 需要传  参数cgFormatId(模板的id)  参数 cgCustomTableId(业务主表的ID)
      getFormSubsByFormatAndTable: Config.service.api + '/optimus_prime/cg-format-form-sub/list/format/table',
      view: Config.service.api + '/optimus_prime/cg-format-form-sub/{id}',
      create: Config.service.api + '/optimus_prime/cg-format-form-sub/create',
      update: Config.service.api + '/optimus_prime/cg-format-form-sub/update',
      delete: Config.service.api + '/optimus_prime/cg-format-form-sub/deletes',
      // [get] 通过菜单id和模板类型获取列表 需要传 参数menuId(菜单的id)  参数 formatType(模板类型)FORM(1, "表单"),LIST(2, "列表"),EARCH(3, "查询")
      getCustomTables: Config.service.api + '/optimus_prime/cg-format/custom/table',
      saveListData: Config.service.api + '/optimus_prime/cg-format-form-sub/create/list'// [post] 更新或者保存表达模板的属性配置
    },
    // 业务列表模板
    cgListFormatSub: {
      list: Config.service.api + '/optimus_prime/cg-format-list-sub/list',
      configList: Config.service.api + '/optimus_prime/cg-format-list-sub/config_list',
      getFormSubsByFormatAndTable: Config.service.api + '/optimus_prime/cg-format-list-sub/list/format/table',
      view: Config.service.api + '/optimus_prime/cg-format-list-sub/{id}',
      create: Config.service.api + '/optimus_prime/cg-format-list-sub/create',
      update: Config.service.api + '/optimus_prime/cg-format-list-sub/update',
      delete: Config.service.api + '/optimus_prime/cg-format-list-sub/deletes',
      // delete: Config.service.api + '/optimus_prime/cg-format',
      getCustomTables: Config.service.api + '/optimus_prime/cg-format/custom/table',
      saveListData: Config.service.api + '/optimus_prime/cg-format-list-sub/create/list'
    },
    // 业务弹框模板
    cgDialogFormatSub: {
      factor: Config.service.api + '/optimus_prime/cg-format-param/list/format/iallowQuery',
      addFactor: Config.service.api + '/optimus_prime/cg-format-param/create/list',
      list: Config.service.api + '/optimus_prime/cg-format-resource-sub/list',
      getFormSubsByFormatAndTable: Config.service.api + '/optimus_prime/cg-format-resource-sub/list/format/table',
      configList: Config.service.api + '/optimus_prime/cg-format-resource-sub/config_list',
      view: Config.service.api + '/optimus_prime/cg-format-resource-sub/{id}',
      create: Config.service.api + '/optimus_prime/cg-format-resource-sub/create',
      update: Config.service.api + '/optimus_prime/cg-format-resource-sub/update',
      delete: Config.service.api + '/optimus_prime/cg-format-resource-sub/deletes',
      // delete: Config.service.api + '/optimus_prime/cg-format',
      getCustomTables: Config.service.api + '/optimus_prime/cg-format/custom/table',
      saveListData: Config.service.api + '/optimus_prime/cg-format-resource-sub/create/list'
    }
  },
  // 系统设置
  sys: {
    // 字典管理
    dict: {
      list: Config.service.api + '/sys-dict-info/list',
      create: Config.service.api + '/sys-dict-info/create',
      delete: Config.service.api + '/sys-dict-info/delList',
      update: Config.service.api + '/sys-dict-info/update'
    },
    // 用户管理
    sysUser: {
      create: Config.service.api + '/sys-user/create',
      update: Config.service.api + '/sys-user/update',
      delete: Config.service.api + '/sys-user/deletes',
      list: Config.service.api + '/sys-user/list',
      org: {
        orgList: Config.service.api + '/sys-user-org/orgList/{id}',
        orgListC: Config.service.api + '/sys-user-org/list/{id}',
        addOrgs: Config.service.api + '/sys-user-org/addOrgs',
        deleteOrgs: Config.service.api + '/sys-user-org/deleteOrgs'
      },
      ass: {
        orgList: Config.service.api + '/sys-user-assay/assayList/{id}',
        orgListC: Config.service.api + '/sys-user-assay/list/{id}',
        addOrgs: Config.service.api + '/sys-user-assay/addAssays',
        deleteOrgs: Config.service.api + '/sys-user-assay/deleteAssays'
      }
    },
    // 角色管理
    roles: {
      create: Config.service.api + '/sys-role/create',
      update: Config.service.api + '/sys-role/update',
      delete: Config.service.api + '/sys-role/deletes',
      userList: Config.service.api + '/sys-role-user/userList/{id}',
      addUsers: Config.service.api + '/sys-role-user/addUsers',
      deleteUsers: Config.service.api + '/sys-role-user/deleteUsers',
      orgList: Config.service.api + '/sys-role-org/orgList/{id}',
      orgListC: Config.service.api + '/sys-role-org/list/{id}',
      addOrgs: Config.service.api + '/sys-role-org/addOrgs',
      deleteOrgs: Config.service.api + '/sys-role-org/deleteOrgs',
      list: Config.service.api + '/sys-role/list',
      addRoles: Config.service.api + '/sys-role-user/addRoles', // 添加用户角色
      chooseRoleList: Config.service.api + '/sys-role-user/RoleList/{id}', // 用户待选角色列表
      deleteRoles: Config.service.api + '/sys-role-user/deleteRoles', // 删除用户角色
      userRoleList: Config.service.api + '/sys-role-user/hasRolesList/{id}', // 用户拥有角色列表
      org: {
        orgList: Config.service.api + '/sys-role-org/orgList/{id}',
        orgListC: Config.service.api + '/sys-role-org/list/{id}',
        addOrgs: Config.service.api + '/sys-role-org/addOrgs',
        deleteOrgs: Config.service.api + '/sys-role-org/deleteOrgs'
      },
      ass: {
        orgList: Config.service.api + '/sys-role-assay/assayList/{id}',
        orgListC: Config.service.api + '/sys-role-assay/list/{id}',
        addOrgs: Config.service.api + '/sys-role-assay/addAssays',
        deleteOrgs: Config.service.api + '/sys-role-assay/deleteAssays'
      }
    },
    menu: {
      resource: Config.service.api + '/sys-menu/resource/list?type=tree',
      manageList: Config.service.api + '/sys-menu-permission/manage_list/{id}?type=tree',
      roleUser: Config.service.api + '/sys-role-user/list/{id}',
      addMenu: Config.service.api + '/sys-role-menu/addMenu'
    },
    // 系统任务
    task: {
      list: Config.service.api + '/quartz/scheduler-job-info/list',
      create: Config.service.api + '/quartz/scheduler-job-info/create',
      delete: Config.service.api + '/quartz/scheduler-job-info/remove/{id}',
      update: Config.service.api + '/quartz/scheduler-job-info/update',
      start: Config.service.api + '/quartz/scheduler-job-info/start',
      stop: Config.service.api + '/quartz/scheduler-job-info/stop/{id}',
      detail: Config.service.api + '/quartz/scheduler-job-info/{id}'
    },
    // 编码规则
    codeRule: {
      list: Config.service.api + '/core/sys-code-rule/list',
      create: Config.service.api + '/core/sys-code-rule/create',
      delete: Config.service.api + '/core/sys-code-rule/remove/{id}',
      update: Config.service.api + '/core/sys-code-rule/update'
    },
    // 层级编码规则
    levelCodeRule: {
      list: Config.service.api + '/sys-hierarchy-code-rule/list',
      create: Config.service.api + '/sys-hierarchy-code-rule/create',
      delete: Config.service.api + '/sys-hierarchy-code-rule/delete/{id}',
      update: Config.service.api + '/sys-hierarchy-code-rule/update'
    },
    // 系统参数配置
    sysParams: {
      define: Config.service.api + '/settings/sys-common-define-setting/org',
      set: Config.service.api + '/settings/sys-common-define-setting/org'
    }
  }
}
export default jsonurl
