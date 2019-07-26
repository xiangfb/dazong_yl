let $json = {
  methods: [
    {
      label: 'GET',
      value: '1'
    },
    {
      label: 'POST',
      value: '2'
    },
    {
      label: 'PUT',
      value: '3'
    },
    {
      label: 'DELETE',
      value: '4'
    }
  ],
  basicNumberOption: [
    {
      label: '整数',
      value: 'INTEGER'
    },
    {
      label: '一位小数',
      value: 'A_DECIMAL'
    },
    {
      label: '二位小数',
      value: 'TWO_DECIMAL'
    },
    {
      label: '三位小数',
      value: 'THREE_DECIMAL'
    },
    {
      label: '四位小数',
      value: 'FOUR_DECIMAL'
    },
    {
      label: '五位小数',
      value: 'FIVE_DECIMAL'
    }
  ],
  // TODO: 字段类型, 请使用temporary.js中的fieldType
  // TODO: 表单提交类型枚举, 请使用temporary.js中的formSubmitType
  // 表头格式
  tableHeader: [
    {
      fieldName: 'code',
      fieldExplain: '登记单号',
      sortable: true,
      sortOrders: ['ascending']
    },
    {
      fieldName: 'carId',
      fieldExplain: '车牌号'
    },
    {
      fieldName: 'idCard',
      fieldExplain: '卡号'
    },
    {
      fieldName: 'busitype',
      fieldExplain: '业务类型',
      formatType: 'ENUM',
      mapper: [
        {
          label: '销售',
          value: 'sell',
          color: '#67c23a'
        },
        {
          label: '采购',
          value: 'buy',
          color: '#f56c6c'
        }
      ]
    },
    {
      fieldName: 'codestatus',
      fieldExplain: '登记单状态',
      type: 'tag',
      sortable: true,
      formatType: 'BOOLEAN',
      mapper: [
        {
          label: '已审核',
          value: true,
          color: '#67c23a'
        },
        {
          label: '未审核',
          value: false,
          color: '#f56c6c'
        }
      ]

    },
    {
      fieldExplain: '去验证信息',
      formatType: 'BUTTON',
      btnType: 'primary',
      eventType: 'on-click'
    }
  ],
  icons: [
    {
      'title': '设置',
      'icon': 'icon-settings'
    },
    {
      'title': '设置1',
      'icon': 'icon-settings1'
    },
    {
      'title': '档案管理',
      'icon': 'icon-danganguanli'
    },
    {
      'title': '档案信息',
      'icon': 'icon-dangan'
    },
    {
      'title': '档案信息(1)',
      'icon': 'icon-dangan1'
    },
    {
      'title': '档案信息(2)',
      'icon': 'icon-dangan2'
    },
    {
      'title': '车辆档案',
      'icon': 'icon-cheliangjiance'
    },
    {
      'title': '车辆档案(1)',
      'icon': 'icon-cheliangxinxi'
    },
    {
      'title': '车辆类型',
      'icon': 'icon-cheliangpaiban'
    },
    {
      'title': '集团档案',
      'icon': 'icon-jituankehuxinxi'
    },
    {
      'title': '公司信息',
      'icon': 'icon-gongsi'
    },
    {
      'title': '公司信息(1)',
      'icon': 'icon-gongsixinxi'
    },
    {
      'title': '工厂档案',
      'icon': 'icon-gongchangdanyuan'
    },
    {
      'title': '工厂档案(1)',
      'icon': 'icon-gongchangguanli'
    },
    {
      'title': '客户档案',
      'icon': 'icon-kehuguanli'
    },
    {
      'title': '客户档案',
      'icon': 'icon-kehufuwu'
    },
    {
      'title': '部门档案',
      'icon': 'icon-bumendangan'
    },
    {
      'title': '部门档案(1)',
      'icon': 'icon-dangan1'
    },
    {
      'title': '部门档案(2)',
      'icon': 'icon-dangan2'
    },
    {
      'title': '部门档案(3)',
      'icon': 'icon-dangan'
    },
    {
      'title': '司机档案',
      'icon': 'icon-siji-'
    },
    {
      'title': '司机档案(1)',
      'icon': 'icon-siji'
    },
    {
      'title': '供应商',
      'icon': 'icon-gongyingguanli'
    },
    {
      'title': '供应商(1)',
      'icon': 'icon-gongyingshangjiandangyudanganguanli'
    },
    {
      'title': '供应商(2)',
      'icon': 'icon-gongyingshang'
    },
    {
      'title': '供应商(3)',
      'icon': 'icon-gongyingshangzu'
    },
    {
      'title': '供应商(4)',
      'icon': 'icon-gongyinglian'
    },
    {
      'title': '布局',
      'icon': 'icon-buju'
    },
    {
      'title': '布局(1)',
      'icon': 'icon-zidingyibuju1'
    },
    {
      'title': '计量单位',
      'icon': 'icon-jiliangfangfa'
    },
    {
      'title': '计量单位(1)',
      'icon': 'icon-jiliangdanweishezhi'
    },
    {
      'title': '计量单位(2)',
      'icon': 'icon-jiliangdanwei1'
    },
    {
      'title': '计量单位(3)',
      'icon': 'icon-jiliangdanwei'
    },
    {
      'title': '计量单位组',
      'icon': 'icon-jiliangdanweizu'
    },
    {
      'title': '规则',
      'icon': 'icon-guize'
    },
    {
      'title': '规则(1)',
      'icon': 'icon-guize1'
    },
    {
      'title': '规则(2)',
      'icon': 'icon-guize2'
    },
    {
      'title': '规则(3)',
      'icon': 'icon-guize3'
    },
    {
      'title': '规则(4)',
      'icon': 'icon-guizeguanli'
    },
    {
      'title': '规范',
      'icon': 'icon-guifan'
    },
    {
      'title': '规范(1)',
      'icon': 'icon-guifan1'
    },
    {
      'title': '管理',
      'icon': 'icon-guanli'
    },
    {
      'title': '分类',
      'icon': 'icon-fenlei'
    },
    {
      'title': '分类(1)',
      'icon': 'icon-fenlei1'
    },
    {
      'title': '分类(2)',
      'icon': 'icon-fenlei2'
    },
    {
      'title': '编号',
      'icon': 'icon-bianhao'
    },
    {
      'title': '编号(1)',
      'icon': 'icon-bianhao1'
    },
    {
      'title': '编号(2)',
      'icon': 'icon-bianhao2'
    },
    {
      'title': '线路',
      'icon': 'icon-xianlu'
    },
    {
      'title': '线路(1)',
      'icon': 'icon-xianlu1'
    },
    {
      'title': '线路(2)',
      'icon': 'icon-xianlu2'
    },
    {
      'title': '线路(3)',
      'icon': 'icon-xianlu3'
    },
    {
      'title': '线路(4)',
      'icon': 'icon-line'
    },
    {
      'title': '路线',
      'icon': 'icon-route'
    },
    {
      'title': '组件',
      'icon': 'icon-zujian'
    },
    {
      'title': '组件(1)',
      'icon': 'icon-guanlizujian'
    },
    {
      'title': '配置',
      'icon': 'icon-peizhi'
    },
    {
      'title': '配置(1)',
      'icon': 'icon-peizhi1'
    },
    {
      'title': '配置(2)',
      'icon': 'icon-peizhi2'
    },
    {
      'title': '业务',
      'icon': 'icon-yewuyingyong'
    },
    {
      'title': '业务(1)',
      'icon': 'icon-zongheyewutongji'
    },
    {
      'title': '业务(2))',
      'icon': 'icon-yewuliucheng'
    },
    {
      'title': '业务(3)',
      'icon': 'icon-yewutuijian'
    },
    {
      'title': '前缀',
      'icon': 'icon-daohangqianzhui'
    },
    {
      'title': '过磅单查询',
      'icon': 'icon-jiaobancheguobangchaxun'
    },
    {
      'title': '登记单',
      'icon': 'icon-rusuodengji'
    },
    {
      'title': '合同',
      'icon': 'icon-hetongchaxun'
    },
    {
      'title': '日统计',
      'icon': 'icon-ribaotongji'
    },
    {
      'title': '计划单',
      'icon': 'icon-meirijihua'
    },
    {
      'title': '结算单',
      'icon': 'icon-jiesuandan'
    },
    {
      'title': '采购单',
      'icon': 'icon-caigoudan'
    },
    {
      'title': '角色',
      'icon': 'icon-jiaose'
    },
    {
      'title': 'IC卡',
      'icon': 'icon-ICka'
    },
    {
      'title': '报表管理(1)',
      'icon': 'icon-baobiaoguanli'
    },
    {
      'title': '报表管理(2)',
      'icon': 'icon-baobiao'
    },
    {
      'title': '报表管理(3)',
      'icon': 'icon-baobiao1'
    },
    {
      'title': '表格',
      'icon': 'icon-biaoge'
    },
    {
      'title': '表格(1)',
      'icon': 'icon-xinjianbiaoge'
    },
    {
      'title': '表格(2)',
      'icon': 'icon-xinjianbiaoge'
    },
    {
      'title': '表格(3)',
      'icon': 'icon-biaogeshezhi'
    },
    {
      'title': '物料',
      'icon': 'icon-huowu'
    },
    {
      'title': '物料(1)',
      'icon': 'icon-wuliaodanwei'
    },
    {
      'title': '物料(2)',
      'icon': 'icon-pre_icon_xuanchuanwuliao'
    },
    {
      'title': '类型',
      'icon': 'icon-leixing-fenzhijiedian'
    },
    {
      'title': '地点',
      'icon': 'icon-didian1'
    },
    {
      'title': '轴数',
      'icon': 'icon-shijianzhou'
    },
    {
      'title': '库位',
      'icon': 'icon-kuweiguanli'
    },
    {
      'title': '字典管理',
      'icon': 'icon-pingtai_zidian'
    },
    {
      'title': '字典管理(1)',
      'icon': 'icon-zidian'
    },
    {
      'title': '字典管理(2)',
      'icon': 'icon-zidianxinxipingtai'
    },
    {
      'title': '字典管理(3)',
      'icon': 'icon-navicon-zdgl'
    },
    {
      'title': '任务',
      'icon': 'icon-renwu2'
    },
    {
      'title': 'IC卡',
      'icon': 'icon-ICka'
    },
    {
      'title': '采购单',
      'icon': 'icon-caigoudan'
    },
    {
      'title': '异常情况',
      'icon': 'icon-zhanghaoyichang'
    },
    {
      'title': '异常情况(1)',
      'icon': 'icon-yichangqingkuang'
    },
    {
      'title': '错误提示图标',
      'icon': 'icon-cuowutishitubiao'
    },
    {
      'title': '欢迎页',
      'icon': 'icon-huanyingye'
    },
    {
      'title': '物流',
      'icon': 'icon-logistics'
    },
    {
      'title': '数据展示2',
      'icon': 'icon-shujuzhanshi2'
    },
    {
      'title': '人',
      'icon': 'icon-people'
    },
    {
      'title': 'info',
      'icon': 'icon-info'
    },
    {
      'title': 'sort',
      'icon': 'icon-sort3'
    },
    {
      'title': 'lock',
      'icon': 'icon-lock'
    },
    {
      'title': 'navicon',
      'icon': 'icon-navicon'
    },
    {
      'title': '提交-01',
      'icon': 'icon-submit'
    },
    {
      'title': 'QQ',
      'icon': 'icon-qq'
    },
    {
      'title': 'iframe',
      'icon': 'icon-iframe'
    },
    {
      'title': 'wxb工具',
      'icon': 'icon-wxbgongju'
    },
    {
      'title': '退出全屏',
      'icon': 'icon-tuichuquanping'
    },
    {
      'title': '表单 页面',
      'icon': 'icon-biaodan'
    },
    {
      'title': '下载',
      'icon': 'icon-download'
    },
    {
      'title': '我的车辆',
      'icon': 'icon-mycar'
    },
    {
      'title': 'refresh',
      'icon': 'icon-refresh'
    },
    {
      'title': '360',
      'icon': 'icon-msnui-360'
    },
    {
      'title': '邮箱',
      'icon': 'icon-email'
    },
    {
      'title': '微博',
      'icon': 'icon-vb'
    },
    {
      'title': '微信',
      'icon': 'icon-vx'
    },
    {
      'title': '微信(1)',
      'icon': 'icon-weixin1'
    },
    {
      'title': 'debug',
      'icon': 'icon-debug'
    },
    {
      'title': 'sort',
      'icon': 'icon-sort2'
    },
    {
      'title': 'bug',
      'icon': 'icon-bug'
    },
    {
      'title': '管理员',
      'icon': 'icon-admin'
    },
    {
      'title': '全屏',
      'icon': 'icon-quanping'
    },
    {
      'title': '动态',
      'icon': 'icon-dongtai'
    },
    {
      'title': 'yanzhengma',
      'icon': 'icon-yanzhengma'
    },
    {
      'title': '权限',
      'icon': 'icon-quanxian'
    },
    {
      'title': '清单',
      'icon': 'icon-list'
    },
    {
      'title': '公司信息',
      'icon': 'icon-org'
    },
    {
      'title': '新增',
      'icon': 'icon-add'
    },
    {
      'title': '闪电',
      'icon': 'icon-iconset0216'
    },
    {
      'title': '配送',
      'icon': 'icon-express'
    },
    {
      'title': '头像',
      'icon': 'icon-avatar'
    },
    {
      'title': '常用分类',
      'icon': 'icon-changyongfenlei'
    },
    {
      'title': '消息',
      'icon': 'icon-msg'
    },
    {
      'title': '部门管理',
      'icon': 'icon-department'
    },
    {
      'title': '权限管理',
      'icon': 'icon-permissions'
    },
    {
      'title': '删除',
      'icon': 'icon-delete'
    },
    {
      'title': '司机',
      'icon': 'icon-drivers'
    },
    {
      'title': '自定义',
      'icon': 'icon-custom'
    },
    {
      'title': '个人中心-货源单',
      'icon': 'icon-sourcelist'
    },
    {
      'title': '19承运商',
      'icon': 'icon-carriers'
    },
    {
      'title': '身份证',
      'icon': 'icon-idcard'
    },
    {
      'title': '预警',
      'icon': 'icon-forewarn'
    },
    {
      'title': '右',
      'icon': 'icon-right'
    },
    {
      'title': '日志管理',
      'icon': 'icon-log'
    },
    {
      'title': '角色',
      'icon': 'icon-role'
    },
    {
      'title': '位置',
      'icon': 'icon-location'
    },
    {
      'title': '地址',
      'icon': 'icon-address'
    },
    {
      'title': '地图',
      'icon': 'icon-map'
    },
    {
      'title': '地图',
      'icon': 'icon-map2'
    },
    {
      'title': '地球 (1)',
      'icon': 'icon-earth'
    },
    {
      'title': '可视化',
      'icon': 'icon-visual'
    },
    {
      'title': '司机',
      'icon': 'icon-driver'
    },
    {
      'title': '资质信息',
      'icon': 'icon-qualification2'
    },
    {
      'title': '拼团',
      'icon': 'icon-groupbooking'
    },
    {
      'title': '手机',
      'icon': 'icon-mobile'
    },
    {
      'title': '搜索',
      'icon': 'icon-search'
    },
    {
      'title': '搜索(1)',
      'icon': 'icon-search2'
    },
    {
      'title': '搜索(2)',
      'icon': 'icon-search3'
    },
    {
      'title': '资质信息',
      'icon': 'icon-qualification'
    },
    {
      'title': '时间 历史记录 计时 钟表 面性',
      'icon': 'icon-time'
    },
    {
      'title': '电脑',
      'icon': 'icon-computer'
    },
    {
      'title': '车主',
      'icon': 'icon-carowner'
    },
    {
      'title': '维修',
      'icon': 'icon-fix'
    },
    {
      'title': '返回顶部',
      'icon': 'icon-backtop'
    },
    {
      'title': '流程',
      'icon': 'icon-process'
    },
    {
      'title': '计算',
      'icon': 'icon-computed'
    },
    {
      'title': '退出',
      'icon': 'icon-tuichu'
    },
    {
      'title': '系统管理',
      'icon': 'icon-systemmanager'
    },
    {
      'title': '支付',
      'icon': 'icon-pay'
    },
    {
      'title': '15-日历',
      'icon': 'icon-calendar'
    },
    {
      'title': '排序',
      'icon': 'icon-sort'
    },
    {
      'title': '车队管理',
      'icon': 'icon-fleet'
    },
    {
      'title': '交换',
      'icon': 'icon-exchange'
    },
    {
      'title': '加油',
      'icon': 'icon-petrol'
    },
    {
      'title': '下拉',
      'icon': 'icon-pull'
    },
    {
      'title': '客商列表',
      'icon': 'icon-merchants'
    },
    {
      'title': '运单',
      'icon': 'icon-order'
    },
    {
      'title': '厂界',
      'icon': 'icon-factory'
    },
    {
      'title': '搅拌车过磅',
      'icon': 'icon-car'
    },
    {
      'title': '实时',
      'icon': 'icon-live'
    },
    {
      'title': '评价',
      'icon': 'icon-evaluate'
    },
    {
      'title': '联通信息-用户个人信息',
      'icon': 'icon-userinfo'
    },
    {
      'title': '用户管理',
      'icon': 'icon-usermanager'
    },
    {
      'title': '图表',
      'icon': 'icon-tubiao'
    },
    {
      'title': '指派司机',
      'icon': 'icon-assign'
    },
    {
      'title': '飞机',
      'icon': 'icon-airplane'
    },
    {
      'title': '物料',
      'icon': 'icon-material'
    },
    {
      'title': '菜单管理',
      'icon': 'icon-caidanguanli'
    },
    {
      'title': '电话',
      'icon': 'icon-phone'
    },
    {
      'title': '贷款',
      'icon': 'icon-loans'
    },
    {
      'title': '过磅单',
      'icon': 'icon-ERP_guobang'
    },
    {
      'title': '采购管理',
      'icon': 'icon-procurement2'
    },
    {
      'title': '销售管理',
      'icon': 'icon-sales'
    },
    {
      'title': '调拨管理',
      'icon': 'icon-transfers'
    },
    {
      'title': '转库管理',
      'icon': 'icon-turnlibrary'
    },
    {
      'title': '质检管理',
      'icon': 'icon-quality2'
    },
    {
      'title': '报表管理',
      'icon': 'icon-report'
    },
    {
      'title': '客服中心',
      'icon': 'icon-Customer'
    }
  ]
}
export default $json
