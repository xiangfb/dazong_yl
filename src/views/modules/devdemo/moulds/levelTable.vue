<template>
<div class="bg-white p-20" style="text-align:center!important">
  1112
</div>
</template>

<script>
export default {
  data () {
    return {
      headData: ['城市', '美食', '好玩的地方'],
      bodyData: [
        { city: '北京', food: '北京烤鸭', fun: ['故宫', '颐和园', '长城'] },
        {
          city: '深圳', food: ['肠粉', '牛肉火锅'], fun: ['西冲', '华侨城', '世界之窗']
        },
        {
          city: ['重庆', '成都', '武汉'],
          food: ['重庆老火锅', '重庆烤鱼', '重庆小面', '成都小吃', '武汉热干面'],
          fun: ['洪崖洞', '峨眉山', '黄鹤楼']
        }
      ],
      obj: {
        'code': 'R0000',
        'msg': 'success',
        'data': {
          'total': 2,
          'limit': {
            'pn': 1,
            'ps': 10
          },
          'list': [
            {
              'confirmWeighSubVoList': [
                {
                  'confirmSubButs': [
                    'CONFIRM_NOT',
                    'CONFIRM_AGAIN'
                  ],
                  'regId': 1,
                  'pkInventory': null,
                  'invCode': 'XSDJF-WS',
                  'invName': '尾砂',
                  'model': '尾砂',
                  'material': '',
                  'pkNoticeId': null,
                  'pkNoticeSubId': null,
                  'notoCode': 'TZD1201904119000001',
                  'deCompanyId': null,
                  'deCompanyName': '翼城县浍翔商贸有限公司',
                  'deAddrId': null,
                  'deDeptId': null,
                  'deWareId': null,
                  'dePoseId': null,
                  'deWeigh01': null,
                  'deConfirm': null,
                  'deConfirmer': '',
                  'deWeigh02': '2019-05-14 09:18:17',
                  'deNums': 0,
                  'deTareReal': null,
                  'deGrossReal': null,
                  'deSuttleReal': 56,
                  'deWeighCode': '',
                  'reCompanyId': null,
                  'reCompanyName': '山西寰达实业有限责任公司',
                  'reAddrId': null,
                  'reDeptId': null,
                  'reWareId': null,
                  'rePoseId': null,
                  'reWeigh01': null,
                  'reConfirm': null,
                  'reConfirmer': '',
                  'reWeigh02': null,
                  'reNums': null,
                  'reSuttleReal': null,
                  'reTareReal': null,
                  'reGrossReal': null,
                  'reWeighCode': '',
                  'preNums': null,
                  'theoryWeight': null,
                  'preQuantity': null,
                  'sampleCode': '测试编码',
                  'isample': false,
                  'samplePos': '',
                  'billDate': null,
                  'status': 'SH_SCENE_CONFIRM',
                  'define01': '',
                  'define02': '',
                  'define03': '',
                  'define04': '',
                  'define05': '',
                  'define06': '',
                  'define07': '',
                  'define08': '',
                  'define09': '',
                  'define10': '',
                  'define11': '',
                  'define12': '',
                  'define13': '',
                  'define14': '',
                  'define15': '',
                  'define16': null,
                  'define17': null,
                  'define18': null,
                  'define19': null,
                  'define20': null
                },
                {
                  'confirmSubButs': [
                    'CONFIRM_NOT',
                    'CONFIRM_AGAIN'
                  ],
                  'regId': 1,
                  'pkInventory': null,
                  'invCode': 'XSDJF-WS',
                  'invName': '尾砂',
                  'model': '尾砂',
                  'material': '',
                  'pkNoticeId': null,
                  'pkNoticeSubId': null,
                  'notoCode': 'TZD1201904119000001',
                  'deCompanyId': null,
                  'deCompanyName': '翼城县浍翔商贸有限公司',
                  'deAddrId': null,
                  'deDeptId': null,
                  'deWareId': null,
                  'dePoseId': null,
                  'deWeigh01': null,
                  'deConfirm': null,
                  'deConfirmer': '',
                  'deWeigh02': '2019-05-14 09:18:17',
                  'deNums': 0,
                  'deTareReal': null,
                  'deGrossReal': null,
                  'deSuttleReal': 56,
                  'deWeighCode': '',
                  'reCompanyId': null,
                  'reCompanyName': '山西寰达实业有限责任公司',
                  'reAddrId': null,
                  'reDeptId': null,
                  'reWareId': null,
                  'rePoseId': null,
                  'reWeigh01': null,
                  'reConfirm': null,
                  'reConfirmer': '',
                  'reWeigh02': null,
                  'reNums': null,
                  'reSuttleReal': null,
                  'reTareReal': null,
                  'reGrossReal': null,
                  'reWeighCode': '',
                  'preNums': null,
                  'theoryWeight': null,
                  'preQuantity': null,
                  'sampleCode': '测试编码',
                  'isample': false,
                  'samplePos': '',
                  'billDate': null,
                  'status': 'SH_SCENE_CONFIRM',
                  'define01': '',
                  'define02': '',
                  'define03': '',
                  'define04': '',
                  'define05': '',
                  'define06': '',
                  'define07': '',
                  'define08': '',
                  'define09': '',
                  'define10': '',
                  'define11': '',
                  'define12': '',
                  'define13': '',
                  'define14': '',
                  'define15': '',
                  'define16': null,
                  'define17': null,
                  'define18': null,
                  'define19': null,
                  'define20': null
                }],
              'ihandle': true,
              'status': 'SH_SCENE_CONFIRM',
              'regCode': 'DJDP1190514000022',
              'plateNumber': '晋A00001',
              'alexsName': '8轴',
              'driverName': '张三',
              'idNumber': '140634199901011234',
              'mobile': '18903403941',
              'cardCode': '',
              'shipmentsMode': null,
              'carrName': '供应商哒哒哒哒',
              'doorInTime': null,
              'doorOutTime': null,
              'doorInTime2': null,
              'lineCode': 'defineprocurement',
              'billDate': '2019-05-14 01:17:13',
              'startDate': '2019-05-13 08:00:00',
              'endDate': '2019-05-16 08:00:00',
              'icheck': true,
              'busiType': 'PU',
              'iback': false,
              'iobsolete': false,
              'ienabled': true,
              'billFrom': 'local',
              'billFromCode': '',
              'define01': '',
              'define02': '',
              'define03': '',
              'define04': '',
              'define05': '',
              'define06': '',
              'define07': '',
              'define08': '',
              'define09': '',
              'define10': '',
              'define11': '',
              'define12': '',
              'define13': '',
              'define14': '',
              'define15': '',
              'define16': null,
              'define17': null,
              'define18': null,
              'define19': null,
              'define20': null
            },
            {
              'confirmWeighSubVoList': [
                {
                  'confirmSubButs': [
                    'CONFIRM'
                  ],
                  'regId': 2,
                  'pkInventory': null,
                  'invCode': 'XSDJF-WS',
                  'invName': '尾砂',
                  'model': '尾砂',
                  'material': '',
                  'pkNoticeId': null,
                  'pkNoticeSubId': null,
                  'notoCode': 'TZD1201904119000001',
                  'deCompanyId': null,
                  'deCompanyName': '翼城县浍翔商贸有限公司',
                  'deAddrId': null,
                  'deDeptId': null,
                  'deWareId': null,
                  'dePoseId': null,
                  'deWeigh01': null,
                  'deConfirm': null,
                  'deConfirmer': '',
                  'deWeigh02': '2019-05-14 09:25:01',
                  'deNums': 0,
                  'deTareReal': null,
                  'deGrossReal': null,
                  'deSuttleReal': 56,
                  'deWeighCode': '',
                  'reCompanyId': null,
                  'reCompanyName': '山西寰达实业有限责任公司',
                  'reAddrId': null,
                  'reDeptId': null,
                  'reWareId': null,
                  'rePoseId': null,
                  'reWeigh01': null,
                  'reConfirm': null,
                  'reConfirmer': '',
                  'reWeigh02': null,
                  'reNums': null,
                  'reSuttleReal': null,
                  'reTareReal': null,
                  'reGrossReal': null,
                  'reWeighCode': '',
                  'preNums': null,
                  'theoryWeight': null,
                  'preQuantity': null,
                  'sampleCode': '测试编码',
                  'isample': false,
                  'samplePos': '',
                  'billDate': null,
                  'status': 'SH_SUTTLE_CALCULATE',
                  'define01': '',
                  'define02': '',
                  'define03': '',
                  'define04': '',
                  'define05': '',
                  'define06': '',
                  'define07': '',
                  'define08': '',
                  'define09': '',
                  'define10': '',
                  'define11': '',
                  'define12': '',
                  'define13': '',
                  'define14': '',
                  'define15': '',
                  'define16': null,
                  'define17': null,
                  'define18': null,
                  'define19': null,
                  'define20': null
                }
              ],
              'ihandle': true,
              'status': 'SH_SUTTLE_CALCULATE',
              'regCode': 'DJDP1190514000023',
              'plateNumber': '晋A00002',
              'alexsName': '8轴',
              'driverName': '李国',
              'idNumber': '140621201901011234',
              'mobile': '18903403491',
              'cardCode': '',
              'shipmentsMode': null,
              'carrName': '供应商哒哒哒哒',
              'doorInTime': null,
              'doorOutTime': null,
              'doorInTime2': null,
              'lineCode': 'defineprocurement',
              'billDate': '2019-05-14 09:23:48',
              'startDate': '2019-05-13 16:00:00',
              'endDate': '2019-05-16 16:00:00',
              'icheck': true,
              'busiType': 'PU',
              'iback': false,
              'iobsolete': false,
              'ienabled': true,
              'billFrom': 'local',
              'billFromCode': '',
              'define01': '',
              'define02': '',
              'define03': '',
              'define04': '',
              'define05': '',
              'define06': '',
              'define07': '',
              'define08': '',
              'define09': '',
              'define10': '',
              'define11': '',
              'define12': '',
              'define13': '',
              'define14': '',
              'define15': '',
              'define16': null,
              'define17': null,
              'define18': null,
              'define19': null,
              'define20': null
            }
          ]
        },
        'success': true
      }
    }
  },
  created () {
    console.log(this.obj.data.list)
    // this.bodyData =
  },
  methods: {
    splitEdit (rowData) {
      console.log('rowData值为', rowData)
    },

    editData (data) {
      console.log('编辑所在行的值为', data)
    },

    splitAdd (data) {
      console.log('新增所在行的值为', data)
    },

    splitDel (data) {
      console.log('删除所在行的值为', data)
    },

    multipleData (data) {
      console.log('复选框选择的值为', data)
    }
  }
}
</script>
<style lang="scss">
table,td,th{
  text-align: center!important;
}
</style>
