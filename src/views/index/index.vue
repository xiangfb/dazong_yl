<template>
  <div>
    <div class="data-box">
      <el-row>
        <el-col :md="6" :xs="24" :sm="12" v-for="(item, index) in counts" :key="index">
          <div class="item">
            <a href="javascript:void(0);">
              <div class="item-icon" :style="{backgroundColor:item.color}">
                <i :class="item.icon"></i>
              </div>
              <div class="item-info">
                <div :style="{color:item.color}" class="title">
                  <avue-count-up :end="item.count"></avue-count-up>
                </div>
                <div class="info">{{item.title}}</div>
              </div>
            </a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="container_index"></div>
  </div>
</template>

<script>
import CompanyService from 'service/company-service'
import HighCharts from 'highcharts'
require('highcharts/modules/exporting')(HighCharts)
var dafaultMenuItem = HighCharts.getOptions().exporting.buttons.contextButton.menuItems.slice(1)
HighCharts.setOptions({
  lang: {
    printChart: '打印图表',
    downloadJPEG: '下载 JPEG 文件',
    downloadPDF: '下载 PDF  文件',
    downloadPNG: '下载 PNG  文件',
    downloadSVG: '下载 SVG  文件',
    downloadCSV: '下载 CSV  文件',
    downloadXLS: '下载 XLS  文件'
  }
})
export default {
  data () {
    return {
      counts: [
        {
          title: '计划车数',
          field: 'planCount',
          count: 0,
          icon: 'icon-jihua',
          color: 'rgb(49, 180, 141)'
        },
        {
          title: '在场车数',
          field: 'presenceCount',
          count: 0,
          icon: 'icon-zaixiancheliang',
          color: 'rgb(56, 161, 242)'
        },
        {
          title: '排队车数',
          field: 'lineCount',
          count: 0,
          icon: 'icon-dengdai',
          color: 'rgb(117, 56, 199)'
        },
        {
          title: '异常车数',
          field: 'errorCount',
          count: 0,
          icon: 'icon-jinggao',
          color: '#F56C6C'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getCount()
  },
  methods: {
    getCount () {
      CompanyService.getCount().then(res => {
        if (res.success) {
          this.counts = this.counts.map(item => {
            item.count = res.data[item.field]
            return item
          })
        }
      })
      CompanyService.getVehicleTable().then(res => {
        if (res.success) {
          HighCharts.chart('container_index', {
            chart: {
              type: 'column'
            },
            title: {
              text: res.data.title
            },
            subtitle: {
              text: ''
            },
            xAxis: {
              categories: res.data.xAxis,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: `${res.data.yTitle}（${res.data.unit}）`
              }
            },
            tooltip: {
            // head + 每个 point + footer 拼接成完整的 table
              headerFormat: `<span style="font-size:10px">{point.key}</span><table>`,
              pointFormat: `<tr>
                              <td style="color:{series.color};padding:0">{series.name}: </td>
                              <td style="padding:0"><b>{point.y:.1f} ${res.data.unit}</b></td>
                            </tr>`,
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                borderWidth: 0
              }
            },
            series: res.data.series,
            exporting: {
              enabled: true,
              buttons: {
                contextButton: {
                  menuItems: [...dafaultMenuItem]
                }
              }
            },
            credits: {
              enabled: false
            }
          })
        }
      })
    }
  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style lang="scss">
</style>
