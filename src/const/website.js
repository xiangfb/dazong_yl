export default {
  title: '数字化纯中医病房管理系统',
  logo: '广汗法',
  key: 'pig',
  indexTitle: '数字化纯中医病房管理系统',
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: [ '/login', '/404', '/401', '/lock', '/' ], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  lockPage: '/lock',
  tokenTime: 6000,
  info: {
    title: '数字化纯中医病房管理系统',
    list: [
      '数字化纯中医病房管理系统'
    ]
  },
  statusWhiteList: [428],
  // http的status默认放行不才用统一处理的,
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: '首页',
    value: '/wel/index',
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}
