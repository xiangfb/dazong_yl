<template>
  <el-dialog
    class="custom-dialog"
    :title="title"
    :visible.sync="visible"
    :width="width"
    :top="top"
    :modal="modal"
    :custom-class="customClass"
    :lock-scroll="lockScroll"
    :show-close="false"
    :modal-append-to-body="modalAppendToBody"
    :close-on-press-escape="closeOnPressEscape"
    :append-to-body="appendToBody"
    :fullscreen="fullscreen"
    :close-on-click-modal="closeOnClickModal"
    :before-close="handleClose"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    >
    <div slot="title" class="titleBox">
      <div class="title">{{title}}</div>
      <div @click="cancel" class="close el-icon-close" v-if="showClose"></div>
    </div>
    <el-container :height="height" >
      <el-aside width="200px" padding="10px" background="#fff" marginRight="10px">
        <el-tree :style="{width: treewidth}" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-container :height="height">
        <!-- <el-header  marginBottom="10px" class="bg-white p-10 fs14" >
          {{rtitle}}
        </el-header > -->
        <el-main height="100%" padding="10px">
          <Basic marginBottom="10px">
          </Basic>
          <Basic >
            <CustomTable @data-change="getDataChange" @sort-change="sortChange" :height="'480px'"  :Showselection="true" :data="tableData" id="dialog-table" rowKey="id" :tableHeader="tableHeader"></CustomTable>
          </Basic>
        </el-main>
        <el-footer>
          <div class="float-right">
            <span class="span">第 {{currentPage}}/{{total}} 页，</span>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next"
              :total="total">
              </el-pagination>
          </div>
        </el-footer>
      </el-container>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" v-html="cancelText"></el-button>
      <el-button type="primary" @click="submit" v-html="submitText"></el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'custom-modal',
  data () {
    return {
      total: 4, // 总条数
      pageSizes: [1, 2, 3, 4], // 每页显示条数
      pageSize: 1, // 默认每页显示条数
      currentPage: 1, // 当前显示第几页
      data: [],
      tableHeader: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  watch: {
    treeUrl: function () {
      this.getData()
    },
    tableHeaderUrl: function () {
      this.getTableHeader()
    },
    tableDataUrl: function () {
      this.getTableData()
    }
  },
  props: {
    treeUrl: {
      type: String,
      default: ''
    },
    tableDataUrl: {
      type: String,
      default: ''
    },
    tableHeaderUrl: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '600px'
    },
    hheight: {
      type: String,
      default: '44px'
    },
    rtitle: {
      type: String,
      default: '右侧标题'
    },
    awidth: {
      type: String,
      default: '150px'
    },
    treewidth: {
      type: String,
      default: '200px'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取 消'
    },
    top: {
      type: String
    },
    width: {
      type: String,
      default: '900px'
    },
    title: {
      type: String,
      default: '标 题'
    },
    submitText: {
      type: String,
      default: '确 定'
    }
  },
  methods: {
    getDataChange (data) {
      this.tableData = data
    },
    sortChange (sort) {
      console.log(sort)
    },
    getData () {
      this.data = [
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQ2',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQ3',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒炼铁',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQ2',
              'state': {
                'disabled': false
              },
              'text': '立恒炼铁',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQ4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQ5',
                  'state': {
                    'disabled': false
                  },
                  'text': '东区炼钢',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQ4',
              'state': {
                'disabled': false
              },
              'text': '东区炼钢',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQ6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQ7',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒炼钢',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQ6',
              'state': {
                'disabled': false
              },
              'text': '立恒炼钢',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQ8',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQ9',
                  'state': {
                    'disabled': false
                  },
                  'text': '东区炼铁',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQ8',
              'state': {
                'disabled': false
              },
              'text': '东区炼铁',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQA',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQB',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒制氧',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQA',
              'state': {
                'disabled': false
              },
              'text': '立恒制氧',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQD',
                  'state': {
                    'disabled': false
                  },
                  'text': '东区制氧',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQC',
              'state': {
                'disabled': false
              },
              'text': '东区制氧',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQF',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒高线',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQE',
              'state': {
                'disabled': false
              },
              'text': '立恒高线',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQG',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQH',
                  'state': {
                    'disabled': false
                  },
                  'text': '东区一高线',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQG',
              'state': {
                'disabled': false
              },
              'text': '东区一高线',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQI',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '东区二高线',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQI',
              'state': {
                'disabled': false
              },
              'text': '东区二高线',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQL',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒带钢',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQK',
              'state': {
                'disabled': false
              },
              'text': '立恒带钢',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQN',
                  'state': {
                    'disabled': false
                  },
                  'text': '立恒焊管',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQM',
              'state': {
                'disabled': false
              },
              'text': '立恒焊管',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQO',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQP',
                  'state': {
                    'disabled': false
                  },
                  'text': '微粉',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQO',
              'state': {
                'disabled': false
              },
              'text': '微粉',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001YQQ',
              'state': {
                'disabled': false
              },
              'text': '东区TRT',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQR',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQS',
                  'state': {
                    'disabled': false
                  },
                  'text': '焦化炼焦',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQR',
              'state': {
                'disabled': false
              },
              'text': '焦化炼焦',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQU',
                  'state': {
                    'disabled': false
                  },
                  'text': '焦化化工',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQT',
              'state': {
                'disabled': false
              },
              'text': '焦化化工',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001YQV',
              'state': {
                'disabled': false
              },
              'text': '焦化电厂',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000006SQV',
              'state': {
                'disabled': false
              },
              'text': '测试',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQ0',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B1100000000EMO40',
              'state': {
                'disabled': false
              },
              'text': '方管',
              'leaf': true,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YQ0',
          'state': {
            'disabled': false
          },
          'text': '机加件',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQY',
                  'state': {
                    'disabled': false
                  },
                  'text': '管钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YQZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '断线钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR0',
                  'state': {
                    'disabled': false
                  },
                  'text': '卡簧钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR1',
                  'state': {
                    'disabled': false
                  },
                  'text': '钢丝钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR2',
                  'state': {
                    'disabled': false
                  },
                  'text': '网钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR3',
                  'state': {
                    'disabled': false
                  },
                  'text': '胡桃钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR4',
                  'state': {
                    'disabled': false
                  },
                  'text': '尖嘴钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR5',
                  'state': {
                    'disabled': false
                  },
                  'text': '剥线钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR6',
                  'state': {
                    'disabled': false
                  },
                  'text': '斜嘴钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR7',
                  'state': {
                    'disabled': false
                  },
                  'text': '液压钳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YQX',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YR8',
                  'state': {
                    'disabled': false
                  },
                  'text': '台虎钳',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YQX',
              'state': {
                'disabled': false
              },
              'text': '钳类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YR9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRA',
                  'state': {
                    'disabled': false
                  },
                  'text': '一字螺丝刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YR9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRB',
                  'state': {
                    'disabled': false
                  },
                  'text': '十字螺丝刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YR9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRC',
                  'state': {
                    'disabled': false
                  },
                  'text': '冲击改锥',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YR9',
              'state': {
                'disabled': false
              },
              'text': '旋具',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRE',
                  'state': {
                    'disabled': false
                  },
                  'text': '锉',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YRD',
              'state': {
                'disabled': false
              },
              'text': '锉',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRG',
                  'state': {
                    'disabled': false
                  },
                  'text': '开口扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRH',
                  'state': {
                    'disabled': false
                  },
                  'text': '梅花扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRI',
                  'state': {
                    'disabled': false
                  },
                  'text': '活动扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '内六角扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRK',
                  'state': {
                    'disabled': false
                  },
                  'text': '电动扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRL',
                  'state': {
                    'disabled': false
                  },
                  'text': '套筒扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRM',
                  'state': {
                    'disabled': false
                  },
                  'text': '套筒',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRN',
                  'state': {
                    'disabled': false
                  },
                  'text': '敲击扳手',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRO',
                  'state': {
                    'disabled': false
                  },
                  'text': '公斤扳手',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YRF',
              'state': {
                'disabled': false
              },
              'text': '扳手',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '尺类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRR',
                  'state': {
                    'disabled': false
                  },
                  'text': '表类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRS',
                  'state': {
                    'disabled': false
                  },
                  'text': '磅类',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YRP',
              'state': {
                'disabled': false
              },
              'text': '量具类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRU',
                  'state': {
                    'disabled': false
                  },
                  'text': '锯',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRV',
                  'state': {
                    'disabled': false
                  },
                  'text': '电工刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRW',
                  'state': {
                    'disabled': false
                  },
                  'text': '玻璃刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRX',
                  'state': {
                    'disabled': false
                  },
                  'text': '切割机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRY',
                  'state': {
                    'disabled': false
                  },
                  'text': '美工刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YRT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YRZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '切管器',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YRT',
              'state': {
                'disabled': false
              },
              'text': '切割类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS1',
                  'state': {
                    'disabled': false
                  },
                  'text': '钻头',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS2',
                  'state': {
                    'disabled': false
                  },
                  'text': '螺纹加工工具',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS3',
                  'state': {
                    'disabled': false
                  },
                  'text': '丝锥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS4',
                  'state': {
                    'disabled': false
                  },
                  'text': '板牙',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS5',
                  'state': {
                    'disabled': false
                  },
                  'text': '车床刀具',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS6',
                  'state': {
                    'disabled': false
                  },
                  'text': '钢筋切断机刀片',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS7',
                  'state': {
                    'disabled': false
                  },
                  'text': '毛刺刀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YS8',
                  'state': {
                    'disabled': false
                  },
                  'text': '刨刃',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YS0',
              'state': {
                'disabled': false
              },
              'text': '刃具',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSA',
                  'state': {
                    'disabled': false
                  },
                  'text': '千斤顶',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSB',
                  'state': {
                    'disabled': false
                  },
                  'text': '拔轮器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSC',
                  'state': {
                    'disabled': false
                  },
                  'text': '倒链',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YS9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSD',
                  'state': {
                    'disabled': false
                  },
                  'text': '吊具',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YS9',
              'state': {
                'disabled': false
              },
              'text': '起重工具',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSF',
                  'state': {
                    'disabled': false
                  },
                  'text': '电焊机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSG',
                  'state': {
                    'disabled': false
                  },
                  'text': '减压器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSH',
                  'state': {
                    'disabled': false
                  },
                  'text': '割枪',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSI',
                  'state': {
                    'disabled': false
                  },
                  'text': '焊把',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '割嘴',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSK',
                  'state': {
                    'disabled': false
                  },
                  'text': '回火防止器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSL',
                  'state': {
                    'disabled': false
                  },
                  'text': '电烙铁',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YSE',
              'state': {
                'disabled': false
              },
              'text': '焊接类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSN',
                  'state': {
                    'disabled': false
                  },
                  'text': '电锤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSO',
                  'state': {
                    'disabled': false
                  },
                  'text': '手电钻',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSP',
                  'state': {
                    'disabled': false
                  },
                  'text': '角磨机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '砂轮机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSR',
                  'state': {
                    'disabled': false
                  },
                  'text': '喷枪',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YSM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSS',
                  'state': {
                    'disabled': false
                  },
                  'text': '磁力钻',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YSM',
              'state': {
                'disabled': false
              },
              'text': '电动工具',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSU',
                  'state': {
                    'disabled': false
                  },
                  'text': '万用表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSV',
                  'state': {
                    'disabled': false
                  },
                  'text': '绝缘表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSW',
                  'state': {
                    'disabled': false
                  },
                  'text': '电阻表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSX',
                  'state': {
                    'disabled': false
                  },
                  'text': '钳形表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSY',
                  'state': {
                    'disabled': false
                  },
                  'text': '测振仪',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YST',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YSZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '分析仪',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YST',
              'state': {
                'disabled': false
              },
              'text': '仪表类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT0',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT1',
                  'state': {
                    'disabled': false
                  },
                  'text': '锤子',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YT0',
              'state': {
                'disabled': false
              },
              'text': '钢锤',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT2',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT3',
                  'state': {
                    'disabled': false
                  },
                  'text': '手电',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT2',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT4',
                  'state': {
                    'disabled': false
                  },
                  'text': '矿灯',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT2',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT5',
                  'state': {
                    'disabled': false
                  },
                  'text': '手持灯',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YT2',
              'state': {
                'disabled': false
              },
              'text': '行灯',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT7',
                  'state': {
                    'disabled': false
                  },
                  'text': '安全带',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT8',
                  'state': {
                    'disabled': false
                  },
                  'text': '镜片',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YT9',
                  'state': {
                    'disabled': false
                  },
                  'text': '电焊帽',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTA',
                  'state': {
                    'disabled': false
                  },
                  'text': '电工皮带',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YT6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTB',
                  'state': {
                    'disabled': false
                  },
                  'text': '工具包',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YT6',
              'state': {
                'disabled': false
              },
              'text': '护具',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTD',
                  'state': {
                    'disabled': false
                  },
                  'text': '吹风机',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YTC',
              'state': {
                'disabled': false
              },
              'text': '吹风机',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTE',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTF',
                  'state': {
                    'disabled': false
                  },
                  'text': '黄油枪',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YTE',
              'state': {
                'disabled': false
              },
              'text': '黄油枪',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YQW',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTG',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTH',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YTG',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YQW',
          'state': {
            'disabled': false
          },
          'text': '工具',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTK',
                  'state': {
                    'disabled': false
                  },
                  'text': '离心泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTL',
                  'state': {
                    'disabled': false
                  },
                  'text': '管道泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTM',
                  'state': {
                    'disabled': false
                  },
                  'text': '潜水泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTN',
                  'state': {
                    'disabled': false
                  },
                  'text': '泥浆泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTO',
                  'state': {
                    'disabled': false
                  },
                  'text': '特种泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTJ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTP',
                  'state': {
                    'disabled': false
                  },
                  'text': '泵类备件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YTJ',
              'state': {
                'disabled': false
              },
              'text': '泵类及其备件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTR',
                  'state': {
                    'disabled': false
                  },
                  'text': '蝶阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTS',
                  'state': {
                    'disabled': false
                  },
                  'text': '球阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTT',
                  'state': {
                    'disabled': false
                  },
                  'text': '闸阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTU',
                  'state': {
                    'disabled': false
                  },
                  'text': '截止阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTV',
                  'state': {
                    'disabled': false
                  },
                  'text': '止回阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTW',
                  'state': {
                    'disabled': false
                  },
                  'text': '盲板阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTX',
                  'state': {
                    'disabled': false
                  },
                  'text': '安全阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTY',
                  'state': {
                    'disabled': false
                  },
                  'text': '排污阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YTZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '减压阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU0',
                  'state': {
                    'disabled': false
                  },
                  'text': '疏水阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU1',
                  'state': {
                    'disabled': false
                  },
                  'text': '脉冲阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU2',
                  'state': {
                    'disabled': false
                  },
                  'text': '水龙头',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YTQ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU3',
                  'state': {
                    'disabled': false
                  },
                  'text': '进排气阀',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YTQ',
              'state': {
                'disabled': false
              },
              'text': '阀类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU5',
                  'state': {
                    'disabled': false
                  },
                  'text': '齿轮减速机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU6',
                  'state': {
                    'disabled': false
                  },
                  'text': '摆线针轮',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU7',
                  'state': {
                    'disabled': false
                  },
                  'text': '硬齿面齿轮',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU8',
                  'state': {
                    'disabled': false
                  },
                  'text': '行星齿轮减速机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YU9',
                  'state': {
                    'disabled': false
                  },
                  'text': '三环减速机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUA',
                  'state': {
                    'disabled': false
                  },
                  'text': '蜗轮蜗杆减速机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YU4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUB',
                  'state': {
                    'disabled': false
                  },
                  'text': '特种减速机',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YU4',
              'state': {
                'disabled': false
              },
              'text': '减速机及其备件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUD',
                  'state': {
                    'disabled': false
                  },
                  'text': '齿式联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUE',
                  'state': {
                    'disabled': false
                  },
                  'text': '滑块联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUF',
                  'state': {
                    'disabled': false
                  },
                  'text': '弹性联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUG',
                  'state': {
                    'disabled': false
                  },
                  'text': '摩擦联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUH',
                  'state': {
                    'disabled': false
                  },
                  'text': '凸缘联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUI',
                  'state': {
                    'disabled': false
                  },
                  'text': '膜片联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '柱销联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUK',
                  'state': {
                    'disabled': false
                  },
                  'text': '气动盘式联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUL',
                  'state': {
                    'disabled': false
                  },
                  'text': '挠性爪联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUM',
                  'state': {
                    'disabled': false
                  },
                  'text': '钢性联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUN',
                  'state': {
                    'disabled': false
                  },
                  'text': '万向节联轴器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUO',
                  'state': {
                    'disabled': false
                  },
                  'text': '耦合器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUP',
                  'state': {
                    'disabled': false
                  },
                  'text': '梅花垫',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '尼龙棒',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YUC',
              'state': {
                'disabled': false
              },
              'text': '联轴器',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUR',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUS',
                  'state': {
                    'disabled': false
                  },
                  'text': '液压制动器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUR',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUT',
                  'state': {
                    'disabled': false
                  },
                  'text': '电磁制动器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUR',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUU',
                  'state': {
                    'disabled': false
                  },
                  'text': '盘式制动器',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YUR',
              'state': {
                'disabled': false
              },
              'text': '制动器',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUW',
                  'state': {
                    'disabled': false
                  },
                  'text': '离心式',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUX',
                  'state': {
                    'disabled': false
                  },
                  'text': '轴流式',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YUY',
                  'state': {
                    'disabled': false
                  },
                  'text': '附件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YUV',
              'state': {
                'disabled': false
              },
              'text': '风机',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUZ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV0',
                  'state': {
                    'disabled': false
                  },
                  'text': '门式起重机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUZ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV1',
                  'state': {
                    'disabled': false
                  },
                  'text': '天车起重机及其附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUZ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV2',
                  'state': {
                    'disabled': false
                  },
                  'text': '卷扬机类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YUZ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV3',
                  'state': {
                    'disabled': false
                  },
                  'text': '电动葫芦',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YUZ',
              'state': {
                'disabled': false
              },
              'text': '起重机',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YV4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV5',
                  'state': {
                    'disabled': false
                  },
                  'text': '皮带机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YV4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV6',
                  'state': {
                    'disabled': false
                  },
                  'text': '斗式提升机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YV4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV7',
                  'state': {
                    'disabled': false
                  },
                  'text': '刮板输送机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YV4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV8',
                  'state': {
                    'disabled': false
                  },
                  'text': '螺旋输送机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YV4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YV9',
                  'state': {
                    'disabled': false
                  },
                  'text': '叶轮给料机',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YV4',
              'state': {
                'disabled': false
              },
              'text': '输送类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YTI',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVA',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVB',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVA',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000J5SAJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '1860项目设备',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YVA',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YTI',
          'state': {
            'disabled': false
          },
          'text': '机械设备',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVE',
                  'state': {
                    'disabled': false
                  },
                  'text': '轴承',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YVD',
              'state': {
                'disabled': false
              },
              'text': '轴承',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVG',
                  'state': {
                    'disabled': false
                  },
                  'text': '螺栓',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVH',
                  'state': {
                    'disabled': false
                  },
                  'text': '挡圈',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVI',
                  'state': {
                    'disabled': false
                  },
                  'text': '钉子类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '卡类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVF',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVK',
                  'state': {
                    'disabled': false
                  },
                  'text': '皮带扣',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YVF',
              'state': {
                'disabled': false
              },
              'text': '紧固件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVM',
                  'state': {
                    'disabled': false
                  },
                  'text': '弯头',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVN',
                  'state': {
                    'disabled': false
                  },
                  'text': '对丝',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVO',
                  'state': {
                    'disabled': false
                  },
                  'text': '接头',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVP',
                  'state': {
                    'disabled': false
                  },
                  'text': '三通',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '四通',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVR',
                  'state': {
                    'disabled': false
                  },
                  'text': '变径',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVS',
                  'state': {
                    'disabled': false
                  },
                  'text': '丝堵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVT',
                  'state': {
                    'disabled': false
                  },
                  'text': '法兰',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVU',
                  'state': {
                    'disabled': false
                  },
                  'text': '盲板',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YVL',
              'state': {
                'disabled': false
              },
              'text': '管件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVW',
                  'state': {
                    'disabled': false
                  },
                  'text': '金属垫',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVX',
                  'state': {
                    'disabled': false
                  },
                  'text': '盘根',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVY',
                  'state': {
                    'disabled': false
                  },
                  'text': '石棉件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YVZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '四氟件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YVV',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YW0',
                  'state': {
                    'disabled': false
                  },
                  'text': '密封材料',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YVV',
              'state': {
                'disabled': false
              },
              'text': '密封件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YW1',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YW2',
                  'state': {
                    'disabled': false
                  },
                  'text': '键',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YW1',
              'state': {
                'disabled': false
              },
              'text': '键',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YW3',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YW4',
                  'state': {
                    'disabled': false
                  },
                  'text': '链类',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YW3',
              'state': {
                'disabled': false
              },
              'text': '链类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YW5',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YW6',
                  'state': {
                    'disabled': false
                  },
                  'text': '销',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YW5',
              'state': {
                'disabled': false
              },
              'text': '销',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YW7',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YW8',
                  'state': {
                    'disabled': false
                  },
                  'text': '弹簧类',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YW7',
              'state': {
                'disabled': false
              },
              'text': '弹簧类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YVC',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YW9',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWA',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YW9',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YVC',
          'state': {
            'disabled': false
          },
          'text': '标准件',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWD',
                  'state': {
                    'disabled': false
                  },
                  'text': '叶片泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWE',
                  'state': {
                    'disabled': false
                  },
                  'text': '齿轮泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWF',
                  'state': {
                    'disabled': false
                  },
                  'text': '柱塞泵及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWG',
                  'state': {
                    'disabled': false
                  },
                  'text': '螺杆泵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWC',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWH',
                  'state': {
                    'disabled': false
                  },
                  'text': '先导泵',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWC',
              'state': {
                'disabled': false
              },
              'text': '油泵类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWI',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '马达',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWI',
              'state': {
                'disabled': false
              },
              'text': '马达',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWL',
                  'state': {
                    'disabled': false
                  },
                  'text': '换向类阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWM',
                  'state': {
                    'disabled': false
                  },
                  'text': '单向节流类阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWN',
                  'state': {
                    'disabled': false
                  },
                  'text': '调压类阀',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWO',
                  'state': {
                    'disabled': false
                  },
                  'text': '液压气动阀类配件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWK',
              'state': {
                'disabled': false
              },
              'text': '阀类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '油缸及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWR',
                  'state': {
                    'disabled': false
                  },
                  'text': '气缸及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWP',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWS',
                  'state': {
                    'disabled': false
                  },
                  'text': '电液推杆',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWP',
              'state': {
                'disabled': false
              },
              'text': '缸 类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWU',
                  'state': {
                    'disabled': false
                  },
                  'text': '金属软管',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWV',
                  'state': {
                    'disabled': false
                  },
                  'text': '液压软管',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWT',
              'state': {
                'disabled': false
              },
              'text': '各种软管',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWX',
                  'state': {
                    'disabled': false
                  },
                  'text': '过滤器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWY',
                  'state': {
                    'disabled': false
                  },
                  'text': '分配器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YWZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '油冷却器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YWW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX0',
                  'state': {
                    'disabled': false
                  },
                  'text': '油雾器',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YWW',
              'state': {
                'disabled': false
              },
              'text': '气动元件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YWB',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX1',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX2',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YX1',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YWB',
          'state': {
            'disabled': false
          },
          'text': '液压气动',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YX3',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX5',
                  'state': {
                    'disabled': false
                  },
                  'text': '板材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX6',
                  'state': {
                    'disabled': false
                  },
                  'text': '型材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX7',
                  'state': {
                    'disabled': false
                  },
                  'text': '管材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX8',
                  'state': {
                    'disabled': false
                  },
                  'text': '棒材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YX9',
                  'state': {
                    'disabled': false
                  },
                  'text': '线材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YX4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXA',
                  'state': {
                    'disabled': false
                  },
                  'text': '金属制品',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YX4',
              'state': {
                'disabled': false
              },
              'text': '钢材',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YX3',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXC',
                  'state': {
                    'disabled': false
                  },
                  'text': '沙子',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXD',
                  'state': {
                    'disabled': false
                  },
                  'text': '水泥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXE',
                  'state': {
                    'disabled': false
                  },
                  'text': '石子',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXF',
                  'state': {
                    'disabled': false
                  },
                  'text': '砖瓦',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXG',
                  'state': {
                    'disabled': false
                  },
                  'text': '木材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXH',
                  'state': {
                    'disabled': false
                  },
                  'text': '混凝土',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXI',
                  'state': {
                    'disabled': false
                  },
                  'text': '白灰',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '玻璃',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YXB',
              'state': {
                'disabled': false
              },
              'text': '建材',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YX3',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXL',
                  'state': {
                    'disabled': false
                  },
                  'text': '耐火砖',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXM',
                  'state': {
                    'disabled': false
                  },
                  'text': '耐火水泥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXN',
                  'state': {
                    'disabled': false
                  },
                  'text': '浇注料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXO',
                  'state': {
                    'disabled': false
                  },
                  'text': '灌浆料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXP',
                  'state': {
                    'disabled': false
                  },
                  'text': '岩棉类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '陶瓷类',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXR',
                  'state': {
                    'disabled': false
                  },
                  'text': '耐火球',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXS',
                  'state': {
                    'disabled': false
                  },
                  'text': '防火泥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXK',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXT',
                  'state': {
                    'disabled': false
                  },
                  'text': '蜂窝体',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YXK',
              'state': {
                'disabled': false
              },
              'text': '耐材',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YX3',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXU',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXV',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXU',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXW',
                  'state': {
                    'disabled': false
                  },
                  'text': '铁口框',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YXU',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YX3',
          'state': {
            'disabled': false
          },
          'text': '材料',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXY',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YXZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '压力表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YXY',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY0',
                  'state': {
                    'disabled': false
                  },
                  'text': '压力变送器',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YXY',
              'state': {
                'disabled': false
              },
              'text': '压力',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY1',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY2',
                  'state': {
                    'disabled': false
                  },
                  'text': '数显仪',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YY1',
              'state': {
                'disabled': false
              },
              'text': '数显仪',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY3',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY4',
                  'state': {
                    'disabled': false
                  },
                  'text': '流量计',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YY3',
              'state': {
                'disabled': false
              },
              'text': '流量',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY5',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY6',
                  'state': {
                    'disabled': false
                  },
                  'text': '温度变送器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY5',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY7',
                  'state': {
                    'disabled': false
                  },
                  'text': '热电偶',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY5',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY8',
                  'state': {
                    'disabled': false
                  },
                  'text': '热电阻',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YY5',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YY9',
                  'state': {
                    'disabled': false
                  },
                  'text': '测温仪',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YY5',
              'state': {
                'disabled': false
              },
              'text': '温度',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYA',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYB',
                  'state': {
                    'disabled': false
                  },
                  'text': '称重传感器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYA',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYC',
                  'state': {
                    'disabled': false
                  },
                  'text': '称重显示仪',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYA',
              'state': {
                'disabled': false
              },
              'text': '质量',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYE',
                  'state': {
                    'disabled': false
                  },
                  'text': '模块(PLC)',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYF',
                  'state': {
                    'disabled': false
                  },
                  'text': '工控机及配件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYG',
                  'state': {
                    'disabled': false
                  },
                  'text': '办公计算机及配件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYH',
                  'state': {
                    'disabled': false
                  },
                  'text': '显示设备',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYI',
                  'state': {
                    'disabled': false
                  },
                  'text': '网络设备',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '监控设备',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYK',
                  'state': {
                    'disabled': false
                  },
                  'text': '隔离器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYD',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYL',
                  'state': {
                    'disabled': false
                  },
                  'text': '其它',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYD',
              'state': {
                'disabled': false
              },
              'text': '自动化',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYN',
                  'state': {
                    'disabled': false
                  },
                  'text': '电流表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYO',
                  'state': {
                    'disabled': false
                  },
                  'text': '电压表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYP',
                  'state': {
                    'disabled': false
                  },
                  'text': '电度表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '开度表',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYR',
                  'state': {
                    'disabled': false
                  },
                  'text': '定位器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYM',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYS',
                  'state': {
                    'disabled': false
                  },
                  'text': '多功能表',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYM',
              'state': {
                'disabled': false
              },
              'text': '电力仪表',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YXX',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYT',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYU',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYT',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YXX',
          'state': {
            'disabled': false
          },
          'text': '仪器仪表自动化',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYX',
                  'state': {
                    'disabled': false
                  },
                  'text': '润滑油',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYW',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YYY',
                  'state': {
                    'disabled': false
                  },
                  'text': '润滑脂',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYW',
              'state': {
                'disabled': false
              },
              'text': '油脂',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YYZ',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ0',
                  'state': {
                    'disabled': false
                  },
                  'text': '燃油',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YYZ',
              'state': {
                'disabled': false
              },
              'text': '燃油',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZ1',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ2',
                  'state': {
                    'disabled': false
                  },
                  'text': '油漆',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZ1',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ3',
                  'state': {
                    'disabled': false
                  },
                  'text': '油漆添加剂',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZ1',
              'state': {
                'disabled': false
              },
              'text': '油 漆',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZ4',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ5',
                  'state': {
                    'disabled': false
                  },
                  'text': '气体',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZ4',
              'state': {
                'disabled': false
              },
              'text': '气体',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZ6',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ7',
                  'state': {
                    'disabled': false
                  },
                  'text': '化学试剂',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZ6',
              'state': {
                'disabled': false
              },
              'text': '化学试剂',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YYV',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZ8',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZ9',
                  'state': {
                    'disabled': false
                  },
                  'text': '化验器具',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZ8',
              'state': {
                'disabled': false
              },
              'text': '化验器具',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YYV',
          'state': {
            'disabled': false
          },
          'text': '化工',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YZA',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZC',
                  'state': {
                    'disabled': false
                  },
                  'text': '直流电机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZD',
                  'state': {
                    'disabled': false
                  },
                  'text': '交流电机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZE',
                  'state': {
                    'disabled': false
                  },
                  'text': '防爆电机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZF',
                  'state': {
                    'disabled': false
                  },
                  'text': '特种电机',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZB',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZG',
                  'state': {
                    'disabled': false
                  },
                  'text': '电机附件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZB',
              'state': {
                'disabled': false
              },
              'text': '电机',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YZA',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZH',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZI',
                  'state': {
                    'disabled': false
                  },
                  'text': '电线',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZH',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '电缆',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZH',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZK',
                  'state': {
                    'disabled': false
                  },
                  'text': '电缆、电线附件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZH',
              'state': {
                'disabled': false
              },
              'text': '线 缆',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YZA',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZM',
                  'state': {
                    'disabled': false
                  },
                  'text': '按钮开关控制器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZN',
                  'state': {
                    'disabled': false
                  },
                  'text': '接触器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZO',
                  'state': {
                    'disabled': false
                  },
                  'text': '继电器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZP',
                  'state': {
                    'disabled': false
                  },
                  'text': '照明',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZQ',
                  'state': {
                    'disabled': false
                  },
                  'text': '断路器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZR',
                  'state': {
                    'disabled': false
                  },
                  'text': '熔断器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZS',
                  'state': {
                    'disabled': false
                  },
                  'text': '互感器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZT',
                  'state': {
                    'disabled': false
                  },
                  'text': '电抗器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZU',
                  'state': {
                    'disabled': false
                  },
                  'text': '变压器',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZV',
                  'state': {
                    'disabled': false
                  },
                  'text': '控制器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZW',
                  'state': {
                    'disabled': false
                  },
                  'text': '变频器及其附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZX',
                  'state': {
                    'disabled': false
                  },
                  'text': '电磁铁及其附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZY',
                  'state': {
                    'disabled': false
                  },
                  'text': '电子元件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001YZL',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001YZZ',
                  'state': {
                    'disabled': false
                  },
                  'text': '电源设备',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001YZL',
              'state': {
                'disabled': false
              },
              'text': '电器件',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YZA',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z00',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z01',
                  'state': {
                    'disabled': false
                  },
                  'text': '电动装置',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z00',
              'state': {
                'disabled': false
              },
              'text': '电动装置',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001YZA',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z02',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z03',
                  'state': {
                    'disabled': false
                  },
                  'text': '线管',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z02',
              'state': {
                'disabled': false
              },
              'text': '线管',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001YZA',
          'state': {
            'disabled': false
          },
          'text': '电气',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z05',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z06',
                  'state': {
                    'disabled': false
                  },
                  'text': '输送带',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z05',
              'state': {
                'disabled': false
              },
              'text': '输送带',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z07',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z08',
                  'state': {
                    'disabled': false
                  },
                  'text': '三角带',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z07',
              'state': {
                'disabled': false
              },
              'text': '传送带',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z09',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0A',
                  'state': {
                    'disabled': false
                  },
                  'text': '胎类',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z09',
              'state': {
                'disabled': false
              },
              'text': '胎类',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0C',
                  'state': {
                    'disabled': false
                  },
                  'text': '胶管',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0B',
              'state': {
                'disabled': false
              },
              'text': '胶管',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0D',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0E',
                  'state': {
                    'disabled': false
                  },
                  'text': '密封件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0D',
              'state': {
                'disabled': false
              },
              'text': '密封材料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z04',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0F',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0G',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0F',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z04',
          'state': {
            'disabled': false
          },
          'text': '橡胶',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0H',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0J',
                  'state': {
                    'disabled': false
                  },
                  'text': '工作服',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0K',
                  'state': {
                    'disabled': false
                  },
                  'text': '帽子',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0L',
                  'state': {
                    'disabled': false
                  },
                  'text': '口罩',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0M',
                  'state': {
                    'disabled': false
                  },
                  'text': '手套',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0N',
                  'state': {
                    'disabled': false
                  },
                  'text': '鞋',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0O',
                  'state': {
                    'disabled': false
                  },
                  'text': '防护用品',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0P',
                  'state': {
                    'disabled': false
                  },
                  'text': '日用品',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0I',
              'state': {
                'disabled': false
              },
              'text': '劳保',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0H',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0R',
                  'state': {
                    'disabled': false
                  },
                  'text': '安全用品',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0Q',
              'state': {
                'disabled': false
              },
              'text': '安全',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0H',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0S',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0T',
                  'state': {
                    'disabled': false
                  },
                  'text': '消防器材',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0S',
              'state': {
                'disabled': false
              },
              'text': '消防',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z0H',
          'state': {
            'disabled': false
          },
          'text': '劳保安防',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0U',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0W',
                  'state': {
                    'disabled': false
                  },
                  'text': '办公文具',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0V',
              'state': {
                'disabled': false
              },
              'text': '办公用品',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0U',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0X',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z0Y',
                  'state': {
                    'disabled': false
                  },
                  'text': '日杂消耗',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0X',
              'state': {
                'disabled': false
              },
              'text': '日杂消耗',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z0U',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z0Z',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z10',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z0Z',
              'state': {
                'disabled': false
              },
              'text': '其他',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z0U',
          'state': {
            'disabled': false
          },
          'text': '低值易耗器',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z11',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z13',
                  'state': {
                    'disabled': false
                  },
                  'text': '电机及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z14',
                  'state': {
                    'disabled': false
                  },
                  'text': '减速机及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z15',
                  'state': {
                    'disabled': false
                  },
                  'text': '水泵及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z16',
                  'state': {
                    'disabled': false
                  },
                  'text': '设备及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z17',
                  'state': {
                    'disabled': false
                  },
                  'text': '电器及附件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z12',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z18',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他返修备件',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z12',
              'state': {
                'disabled': false
              },
              'text': '返修',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z11',
          'state': {
            'disabled': false
          },
          'text': '维修备件',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B110000000001Z19',
          'state': {
            'disabled': false
          },
          'text': '宇丰原材料',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1C',
                  'state': {
                    'disabled': false
                  },
                  'text': '主焦煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1D',
                  'state': {
                    'disabled': false
                  },
                  'text': '气煤1',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1E',
                  'state': {
                    'disabled': false
                  },
                  'text': '气煤2',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1F',
                  'state': {
                    'disabled': false
                  },
                  'text': '气煤3',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1G',
                  'state': {
                    'disabled': false
                  },
                  'text': '肥煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1H',
                  'state': {
                    'disabled': false
                  },
                  'text': '中粘煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1I',
                  'state': {
                    'disabled': false
                  },
                  'text': '贫瘦煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1B',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1J',
                  'state': {
                    'disabled': false
                  },
                  'text': '其它焦煤',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z1B',
              'state': {
                'disabled': false
              },
              'text': '炼焦原料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1L',
                  'state': {
                    'disabled': false
                  },
                  'text': '洗油',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1M',
                  'state': {
                    'disabled': false
                  },
                  'text': '液碱',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1N',
                  'state': {
                    'disabled': false
                  },
                  'text': '硫酸',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1O',
                  'state': {
                    'disabled': false
                  },
                  'text': '催化剂',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1P',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他化工料',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z1K',
              'state': {
                'disabled': false
              },
              'text': '化工原料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z69',
                      'state': {
                        'disabled': false
                      },
                      'text': '澳大利亚粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6A',
                      'state': {
                        'disabled': false
                      },
                      'text': '塞拉利昂粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6B',
                      'state': {
                        'disabled': false
                      },
                      'text': '伊朗粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6C',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴西粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6D',
                      'state': {
                        'disabled': false
                      },
                      'text': '印度粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6E',
                      'state': {
                        'disabled': false
                      },
                      'text': '外蒙粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6F',
                      'state': {
                        'disabled': false
                      },
                      'text': '其它进口粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6G',
                      'state': {
                        'disabled': false
                      },
                      'text': '玛蒂尔德超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6H',
                      'state': {
                        'disabled': false
                      },
                      'text': '海澜之韵红粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6I',
                      'state': {
                        'disabled': false
                      },
                      'text': '勇气西部粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6J',
                      'state': {
                        'disabled': false
                      },
                      'text': '新旺海超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6K',
                      'state': {
                        'disabled': false
                      },
                      'text': '卫丰伊朗粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6L',
                      'state': {
                        'disabled': false
                      },
                      'text': '繁荣超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6M',
                      'state': {
                        'disabled': false
                      },
                      'text': '迪维斯超特粉（作废）',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6N',
                      'state': {
                        'disabled': false
                      },
                      'text': '阿波火海超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6O',
                      'state': {
                        'disabled': false
                      },
                      'text': '秘鲁精粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6P',
                      'state': {
                        'disabled': false
                      },
                      'text': '新西兰海砂',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6Q',
                      'state': {
                        'disabled': false
                      },
                      'text': '矿石丸pb块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6R',
                      'state': {
                        'disabled': false
                      },
                      'text': '伟大王朝铁矿粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6S',
                      'state': {
                        'disabled': false
                      },
                      'text': '哈马丹精粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6T',
                      'state': {
                        'disabled': false
                      },
                      'text': '二连红粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6U',
                      'state': {
                        'disabled': false
                      },
                      'text': '长航润海铁矿粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6V',
                      'state': {
                        'disabled': false
                      },
                      'text': '雨果超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6W',
                      'state': {
                        'disabled': false
                      },
                      'text': '德纳湖巴西沫',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6X',
                      'state': {
                        'disabled': false
                      },
                      'text': '超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6Y',
                      'state': {
                        'disabled': false
                      },
                      'text': 'FMG西部粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z6Z',
                      'state': {
                        'disabled': false
                      },
                      'text': 'PB粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z70',
                      'state': {
                        'disabled': false
                      },
                      'text': '杨迪粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z71',
                      'state': {
                        'disabled': false
                      },
                      'text': '混合粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z72',
                      'state': {
                        'disabled': false
                      },
                      'text': '伊朗粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z73',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴粗粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z74',
                      'state': {
                        'disabled': false
                      },
                      'text': '印度粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z75',
                      'state': {
                        'disabled': false
                      },
                      'text': '马来西亚块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z76',
                      'state': {
                        'disabled': false
                      },
                      'text': '宝福津布巴粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z77',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴西粗粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z78',
                      'state': {
                        'disabled': false
                      },
                      'text': '优雅塞拉利昂粉矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z79',
                      'state': {
                        'disabled': false
                      },
                      'text': '恒星宇宙巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7A',
                      'state': {
                        'disabled': false
                      },
                      'text': '荣耀巴粗',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7B',
                      'state': {
                        'disabled': false
                      },
                      'text': '好运新西兰海砂',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7C',
                      'state': {
                        'disabled': false
                      },
                      'text': '金利塞拉利昂混矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7D',
                      'state': {
                        'disabled': false
                      },
                      'text': '金利塞拉利昂混矿（宇丰）',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7E',
                      'state': {
                        'disabled': false
                      },
                      'text': '委内瑞拉矿粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7F',
                      'state': {
                        'disabled': false
                      },
                      'text': '毛里塔尼亚粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7G',
                      'state': {
                        'disabled': false
                      },
                      'text': '萨斯汀pb粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z1R',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000EA5AT',
                      'state': {
                        'disabled': false
                      },
                      'text': '澳大利亚粉矿',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z1R',
                  'state': {
                    'disabled': false
                  },
                  'text': '进口矿粉',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1V',
                  'state': {
                    'disabled': false
                  },
                  'text': '进口精粉',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1W',
                  'state': {
                    'disabled': false
                  },
                  'text': '二连精粉',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1X',
                  'state': {
                    'disabled': false
                  },
                  'text': '国内精粉',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1Y',
                  'state': {
                    'disabled': false
                  },
                  'text': '污泥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z1Z',
                  'state': {
                    'disabled': false
                  },
                  'text': '氧化皮',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000GHCIY',
                  'state': {
                    'disabled': false
                  },
                  'text': '镍矿粉',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z1Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z20',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他矿粉',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z1Q',
              'state': {
                'disabled': false
              },
              'text': '烧结含铁料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z21',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z22',
                  'state': {
                    'disabled': false
                  },
                  'text': '外购焦沫',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z21',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z23',
                  'state': {
                    'disabled': false
                  },
                  'text': '烧结煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z21',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000F2RK9',
                  'state': {
                    'disabled': false
                  },
                  'text': '兰炭沫',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z21',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000FKVK2',
                  'state': {
                    'disabled': false
                  },
                  'text': '焦面',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z21',
              'state': {
                'disabled': false
              },
              'text': '烧结燃料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z24',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z25',
                  'state': {
                    'disabled': false
                  },
                  'text': '烧结矿',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z24',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z26',
                  'state': {
                    'disabled': false
                  },
                  'text': '球团',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z24',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7H',
                      'state': {
                        'disabled': false
                      },
                      'text': '塞拉利昂块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7I',
                      'state': {
                        'disabled': false
                      },
                      'text': '伊朗块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7J',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴西块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7K',
                      'state': {
                        'disabled': false
                      },
                      'text': '印度块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7L',
                      'state': {
                        'disabled': false
                      },
                      'text': '外蒙块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7M',
                      'state': {
                        'disabled': false
                      },
                      'text': '其它进口矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7N',
                      'state': {
                        'disabled': false
                      },
                      'text': '马克思1（巴西块）',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7O',
                      'state': {
                        'disabled': false
                      },
                      'text': '马克思（巴西块）',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7P',
                      'state': {
                        'disabled': false
                      },
                      'text': '猎户座pb块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7Q',
                      'state': {
                        'disabled': false
                      },
                      'text': '德纳湖巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7R',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7S',
                      'state': {
                        'disabled': false
                      },
                      'text': '澳块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7T',
                      'state': {
                        'disabled': false
                      },
                      'text': '南非块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7U',
                      'state': {
                        'disabled': false
                      },
                      'text': '印度块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7V',
                      'state': {
                        'disabled': false
                      },
                      'text': '恒星宇宙-巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7W',
                      'state': {
                        'disabled': false
                      },
                      'text': '武钢创新超特粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7X',
                      'state': {
                        'disabled': false
                      },
                      'text': '阿特米斯巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7Y',
                      'state': {
                        'disabled': false
                      },
                      'text': '海豚巴西块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z7Z',
                      'state': {
                        'disabled': false
                      },
                      'text': '女王马来西亚块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z80',
                      'state': {
                        'disabled': false
                      },
                      'text': '秘鲁粗粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z81',
                      'state': {
                        'disabled': false
                      },
                      'text': '好运海砂',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z82',
                      'state': {
                        'disabled': false
                      },
                      'text': '利比里亚粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z83',
                      'state': {
                        'disabled': false
                      },
                      'text': '利塔粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z84',
                      'state': {
                        'disabled': false
                      },
                      'text': '委内瑞拉粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z85',
                      'state': {
                        'disabled': false
                      },
                      'text': '裕诚混合粉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z86',
                      'state': {
                        'disabled': false
                      },
                      'text': '澳大利亚块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000EA5NA',
                      'state': {
                        'disabled': false
                      },
                      'text': '澳大利亚筛后块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000EA5OE',
                      'state': {
                        'disabled': false
                      },
                      'text': '巴西筛后块',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000F6T4Z',
                      'state': {
                        'disabled': false
                      },
                      'text': '墨西哥块矿',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z27',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000H4BRH',
                      'state': {
                        'disabled': false
                      },
                      'text': '安哥拉筛后块',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z27',
                  'state': {
                    'disabled': false
                  },
                  'text': '进口块矿',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z24',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z28',
                  'state': {
                    'disabled': false
                  },
                  'text': '其它块矿',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z24',
              'state': {
                'disabled': false
              },
              'text': '高炉含铁料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z29',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2A',
                  'state': {
                    'disabled': false
                  },
                  'text': '外购焦炭',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z29',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2B',
                  'state': {
                    'disabled': false
                  },
                  'text': '高炉喷煤',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z29',
              'state': {
                'disabled': false
              },
              'text': '高炉燃料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2D',
                  'state': {
                    'disabled': false
                  },
                  'text': '铁块',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2E',
                  'state': {
                    'disabled': false
                  },
                  'text': '废钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2F',
                  'state': {
                    'disabled': false
                  },
                  'text': '轧废',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2G',
                  'state': {
                    'disabled': false
                  },
                  'text': '水渣（微粉）铁粒',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2H',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他铁料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2I',
                  'state': {
                    'disabled': false
                  },
                  'text': '冲子料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2J',
                  'state': {
                    'disabled': false
                  },
                  'text': '氧化皮球',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z2C',
              'state': {
                'disabled': false
              },
              'text': '炼钢钢铁料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2L',
                  'state': {
                    'disabled': false
                  },
                  'text': '硅锰合金',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2M',
                  'state': {
                    'disabled': false
                  },
                  'text': '硅铁合金',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2N',
                  'state': {
                    'disabled': false
                  },
                  'text': '铝包铁',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2O',
                  'state': {
                    'disabled': false
                  },
                  'text': '硅钡钙',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2P',
                  'state': {
                    'disabled': false
                  },
                  'text': '钒氮合金',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2Q',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他合金',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z2K',
              'state': {
                'disabled': false
              },
              'text': '炼钢合金',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2R',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2S',
                  'state': {
                    'disabled': false
                  },
                  'text': '增碳剂',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2R',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2T',
                  'state': {
                    'disabled': false
                  },
                  'text': '钢碳粒',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2R',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2U',
                  'state': {
                    'disabled': false
                  },
                  'text': '轻烧白云石',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z2R',
              'state': {
                'disabled': false
              },
              'text': '炼钢辅料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B1100000000FKTCY',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000FKTDJ',
                  'state': {
                    'disabled': false
                  },
                  'text': '硫酸渣',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B1100000000FKTCY',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000FOYNC',
                  'state': {
                    'disabled': false
                  },
                  'text': '铁粉',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B1100000000FKTCY',
              'state': {
                'disabled': false
              },
              'text': '球团原料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B1100000000IDQFU',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000IDQG4',
                  'state': {
                    'disabled': false
                  },
                  'text': '锌锭',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B1100000000IDQFU',
              'state': {
                'disabled': false
              },
              'text': '镀锌厂原料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2W',
                  'state': {
                    'disabled': false
                  },
                  'text': '白灰',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2X',
                  'state': {
                    'disabled': false
                  },
                  'text': '白云石',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2Y',
                  'state': {
                    'disabled': false
                  },
                  'text': '高钙石',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z2Z',
                  'state': {
                    'disabled': false
                  },
                  'text': '萤石',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z30',
                  'state': {
                    'disabled': false
                  },
                  'text': '硅石',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z31',
                  'state': {
                    'disabled': false
                  },
                  'text': '碳化稻壳',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z32',
                  'state': {
                    'disabled': false
                  },
                  'text': '锰矿',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z33',
                  'state': {
                    'disabled': false
                  },
                  'text': '蛇纹石',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z34',
                  'state': {
                    'disabled': false
                  },
                  'text': '烧结渣',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z35',
                  'state': {
                    'disabled': false
                  },
                  'text': '转炉渣',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z2V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000FGTP5',
                  'state': {
                    'disabled': false
                  },
                  'text': '膨润土',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z2V',
              'state': {
                'disabled': false
              },
              'text': '其它原料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B1100000000K3DKM',
              'state': {
                'disabled': false
              },
              'text': '1860项目',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z1A',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z36',
              'state': {
                'disabled': false
              },
              'text': '非成本核算用料',
              'leaf': true,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z1A',
          'state': {
            'disabled': false
          },
          'text': '原料',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z38',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z39',
                  'state': {
                    'disabled': false
                  },
                  'text': '普碳钢坯',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z38',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3A',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HPB300钢坯',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z38',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3B',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HRB400钢坯',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z38',
              'state': {
                'disabled': false
              },
              'text': '外购钢坯',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3D',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q195钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3E',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q235钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3F',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q275钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3G',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q215钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3H',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q345钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3I',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HPB300钢',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3C',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3J',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HRB400钢',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z3C',
              'state': {
                'disabled': false
              },
              'text': '自产钢坯',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z3K',
              'state': {
                'disabled': false
              },
              'text': '外购钢材',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3M',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q195线材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3N',
                  'state': {
                    'disabled': false
                  },
                  'text': 'Q235线材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3O',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HPB300线材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3P',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HRB400盘螺',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3Q',
                  'state': {
                    'disabled': false
                  },
                  'text': '盘圆校直',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3L',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3R',
                  'state': {
                    'disabled': false
                  },
                  'text': '螺纹钢',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z3L',
              'state': {
                'disabled': false
              },
              'text': '线材',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z3S',
              'state': {
                'disabled': false
              },
              'text': '带钢',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3T',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z3U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z87',
                      'state': {
                        'disabled': false
                      },
                      'text': '圆管',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z3U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z88',
                      'state': {
                        'disabled': false
                      },
                      'text': '圆管红漆',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z3U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z89',
                      'state': {
                        'disabled': false
                      },
                      'text': '圆管黄漆',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z3U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8A',
                      'state': {
                        'disabled': false
                      },
                      'text': '圆管其他',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z3U',
                  'state': {
                    'disabled': false
                  },
                  'text': '圆管',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3T',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3V',
                  'state': {
                    'disabled': false
                  },
                  'text': '短尺管',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3T',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3W',
                  'state': {
                    'disabled': false
                  },
                  'text': '方管',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3T',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B1100000000IZNFK',
                  'state': {
                    'disabled': false
                  },
                  'text': '热镀锌方矩管',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z3T',
              'state': {
                'disabled': false
              },
              'text': '钢管',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z3X',
              'state': {
                'disabled': false
              },
              'text': '纵剪带钢',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3Y',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z3Z',
                  'state': {
                    'disabled': false
                  },
                  'text': '自产焦炭',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3Y',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z40',
                  'state': {
                    'disabled': false
                  },
                  'text': '自产焦沫',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3Y',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z41',
                  'state': {
                    'disabled': false
                  },
                  'text': '粗苯',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z3Y',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z42',
                  'state': {
                    'disabled': false
                  },
                  'text': '焦油',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z3Y',
              'state': {
                'disabled': false
              },
              'text': '焦化厂',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z43',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z44',
                  'state': {
                    'disabled': false
                  },
                  'text': '炼焦混煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z43',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z45',
                  'state': {
                    'disabled': false
                  },
                  'text': '高炉喷煤',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z43',
              'state': {
                'disabled': false
              },
              'text': '混煤',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z46',
              'state': {
                'disabled': false
              },
              'text': '烧结矿',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z47',
              'state': {
                'disabled': false
              },
              'text': '铁水',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z48',
              'state': {
                'disabled': false
              },
              'text': '自发电',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z49',
              'state': {
                'disabled': false
              },
              'text': '自产白灰',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z37',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4B',
                  'state': {
                    'disabled': false
                  },
                  'text': '成品水渣',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4C',
                  'state': {
                    'disabled': false
                  },
                  'text': '脱硫膏',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4D',
                  'state': {
                    'disabled': false
                  },
                  'text': '微粉',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4E',
                  'state': {
                    'disabled': false
                  },
                  'text': '焊丝材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4F',
                  'state': {
                    'disabled': false
                  },
                  'text': '硫铵',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4G',
                  'state': {
                    'disabled': false
                  },
                  'text': '硫膏',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4H',
                  'state': {
                    'disabled': false
                  },
                  'text': '线材',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4A',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4I',
                  'state': {
                    'disabled': false
                  },
                  'text': '其他',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z4A',
              'state': {
                'disabled': false
              },
              'text': '其它产成品',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z37',
          'state': {
            'disabled': false
          },
          'text': '库存商品',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z4J',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4L',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD焦煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4M',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD无烟煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4N',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD动力煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4O',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD其它焦煤',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4K',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4P',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD合金原料',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z4K',
              'state': {
                'disabled': false
              },
              'text': '寰达原燃料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z4J',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4R',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD铸造焦炭',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4S',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD冶金焦炭',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4Q',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4T',
                  'state': {
                    'disabled': false
                  },
                  'text': 'HD焦炭炉灰',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z4Q',
              'state': {
                'disabled': false
              },
              'text': '寰达产成品',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z4J',
          'state': {
            'disabled': false
          },
          'text': '寰达存货',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z4U',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4W',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF烧结含铁料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4X',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF烧结燃料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4Y',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF烧结辅料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z4Z',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF高炉含铁料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z50',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF高炉燃料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z4V',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z51',
                  'state': {
                    'disabled': false
                  },
                  'text': 'YF高炉辅料',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z4V',
              'state': {
                'disabled': false
              },
              'text': '宇丰原燃料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z4U',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z52',
              'state': {
                'disabled': false
              },
              'text': '宇丰产成品',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z4U',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z53',
              'state': {
                'disabled': false
              },
              'text': '宇丰备件',
              'leaf': true,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z4U',
          'state': {
            'disabled': false
          },
          'text': '宇丰存货',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B110000000001Z54',
          'state': {
            'disabled': false
          },
          'text': '大宗成品分类',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z57',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:农用材料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z58',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:农用工具',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z59',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:包装物',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5A',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:种子',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5B',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:化肥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5C',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:农家肥',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5D',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:饲料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5E',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:农药',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5F',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:兽药',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5G',
                  'state': {
                    'disabled': false
                  },
                  'text': '生物质原料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z56',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5H',
                  'state': {
                    'disabled': false
                  },
                  'text': '生物质工具',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z56',
              'state': {
                'disabled': false
              },
              'text': '三产:原材料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5J',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:备品备件',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5K',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:劳保用品',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5I',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5L',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:办公用品',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z5I',
              'state': {
                'disabled': false
              },
              'text': '三产:辅助材料',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5M',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5N',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:建筑材料',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5M',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5O',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:电气材料',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z5M',
              'state': {
                'disabled': false
              },
              'text': '三产:工程物资',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5P',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5Q',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:生产性生物资产',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5P',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5R',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:消耗性生物资产',
                  'leaf': true,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z5P',
              'state': {
                'disabled': false
              },
              'text': '三产:生物资产',
              'leaf': false,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z5S',
              'state': {
                'disabled': false
              },
              'text': '三产:旅游项目',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z55',
              'children': [
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5T',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8B',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:蔬菜',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8C',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:粮食',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8D',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:育苗',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5U',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8E',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:花卉',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z5U',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:种植农产品',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5T',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5V',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8F',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:羊肉',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5V',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8G',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:鹿茸',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z5V',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:养殖农产品',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5T',
                  'children': [],
                  'hasChildren': false,
                  'root': false,
                  'id': '1001B110000000001Z5W',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:林业农产品',
                  'leaf': true,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5T',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5X',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8H',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:鱼',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5X',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8I',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:大闸蟹',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z5X',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:水产业农产品',
                  'leaf': false,
                  'enabled': true
                },
                {
                  'a_attr': {
                    'source': 'LOCAL'
                  },
                  'parent': '1001B110000000001Z5T',
                  'children': [
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5Y',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8J',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:香草茶',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5Y',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8K',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:香菇',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5Y',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8L',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:菜籽油',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5Y',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B110000000001Z8M',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:生物质颗粒燃料',
                      'leaf': true,
                      'enabled': true
                    },
                    {
                      'a_attr': {
                        'source': 'LOCAL'
                      },
                      'parent': '1001B110000000001Z5Y',
                      'children': [],
                      'hasChildren': false,
                      'root': false,
                      'id': '1001B1100000000I38TK',
                      'state': {
                        'disabled': false
                      },
                      'text': 'SC:香菇酱',
                      'leaf': true,
                      'enabled': true
                    }
                  ],
                  'hasChildren': true,
                  'root': false,
                  'id': '1001B110000000001Z5Y',
                  'state': {
                    'disabled': false
                  },
                  'text': 'SC:加工业农产品',
                  'leaf': false,
                  'enabled': true
                }
              ],
              'hasChildren': true,
              'root': false,
              'id': '1001B110000000001Z5T',
              'state': {
                'disabled': false
              },
              'text': '三产:农产品',
              'leaf': false,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z55',
          'state': {
            'disabled': false
          },
          'text': '第三产业存货',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B110000000001Z5Z',
          'state': {
            'disabled': false
          },
          'text': '福轩',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B1100000000H57NI',
          'state': {
            'disabled': false
          },
          'text': '恒科',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B1100000000DW7SZ',
          'state': {
            'disabled': false
          },
          'text': '东方恒略存货',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B110000000001Z60',
          'state': {
            'disabled': false
          },
          'text': '调拨物资',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B1100000000IMRPA',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B1100000000IMRPS',
              'state': {
                'disabled': false
              },
              'text': '工程材料',
              'leaf': true,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B1100000000IMRPA',
          'state': {
            'disabled': false
          },
          'text': '沃能',
          'leaf': false,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [],
          'hasChildren': false,
          'root': true,
          'id': '1001B110000000001Z61',
          'state': {
            'disabled': false
          },
          'text': '其他',
          'leaf': true,
          'enabled': true
        },
        {
          'a_attr': {
            'source': 'LOCAL'
          },
          'children': [
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z62',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z63',
              'state': {
                'disabled': false
              },
              'text': '机器设备',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z62',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z64',
              'state': {
                'disabled': false
              },
              'text': '办公设备',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z62',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z65',
              'state': {
                'disabled': false
              },
              'text': '电子设备',
              'leaf': true,
              'enabled': true
            },
            {
              'a_attr': {
                'source': 'LOCAL'
              },
              'parent': '1001B110000000001Z62',
              'children': [],
              'hasChildren': false,
              'root': false,
              'id': '1001B110000000001Z66',
              'state': {
                'disabled': false
              },
              'text': '车辆',
              'leaf': true,
              'enabled': true
            }
          ],
          'hasChildren': true,
          'root': true,
          'id': '1001B110000000001Z62',
          'state': {
            'disabled': false
          },
          'text': '固定资产',
          'leaf': false,
          'enabled': true
        }
      ]
    },
    getTableData () {
      this.tableData = [
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICTNM',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XK',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICTNM',
          'innerCode': '1001B1100000000ICTNM',
          'invCode': 'CB2018000206',
          'invName': '隔热砖',
          'invcId': '1001B110000000001YXL',
          'invcName': '耐火砖',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'JPZ-0.6异型砖',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICWMP',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPR',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICWMP',
          'innerCode': '1001B1100000000ICWMP',
          'invCode': '120201000520',
          'invName': '安全警示牌及标识牌',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICX82',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICX82',
          'innerCode': '1001B1100000000ICX82',
          'invCode': '120201000521',
          'invName': '吸顶灯',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '100W',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXA1',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXA1',
          'innerCode': '1001B1100000000ICXA1',
          'invCode': '120201000522',
          'invName': '吸顶灯',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '6W',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXC2',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXC2',
          'innerCode': '1001B1100000000ICXC2',
          'invCode': '120201000523',
          'invName': '飞碟灯',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXN9',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP2',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXN9',
          'innerCode': '1001B1100000000ICXN9',
          'invCode': '030301000045',
          'invName': '3#机传动轴',
          'invcId': '1001B110000000001YU5',
          'invcName': '齿轮减速机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '6-S 287*865*8孔',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXOG',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP2',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXOG',
          'innerCode': '1001B1100000000ICXOG',
          'invCode': '030301000046',
          'invName': '1#机传动轴',
          'invcId': '1001B110000000001YU5',
          'invcName': '齿轮减速机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '6-S  287*1115*8孔',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXPC',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXPC',
          'innerCode': '1001B1100000000ICXPC',
          'invCode': '120201000524',
          'invName': '纯棉半袖',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICXSJ',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP2',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICXSJ',
          'innerCode': '1001B1100000000ICXSJ',
          'invCode': '030301000047',
          'invName': '2#机传动轴',
          'invcId': '1001B110000000001YU5',
          'invcName': '齿轮减速机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '6-S  287*865*6孔',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000ICY7V',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000ICY7V',
          'innerCode': '1001B1100000000ICY7V',
          'invCode': '120101000144',
          'invName': '打印机',
          'invcId': '1001B110000000001Z0W',
          'invcName': '办公文具',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'HP427DW',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I2P2I',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPC',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I2P2I',
          'innerCode': '1001B1100000000I2P2I',
          'invCode': '120201000407',
          'invName': '2号布加彩钢租吊安装',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '15600*3000*350',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': true,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I36PF',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YOT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I36PF',
          'innerCode': '1001B1100000000I36PF',
          'invCode': '080101000051',
          'invName': '汽轮机油',
          'invcId': '1001B110000000001YYX',
          'invcName': '润滑油',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '170kg/桶极压',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3BPK',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3BPK',
          'innerCode': '1001B1100000000I3BPK',
          'invCode': '120101000112',
          'invName': 'DP转VGA',
          'invcId': '1001B110000000001Z0W',
          'invcName': '办公文具',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3BQ2',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3BQ2',
          'innerCode': '1001B1100000000I3BQ2',
          'invCode': '021106000008',
          'invName': '氧化锆分析仪',
          'invcId': '1001B110000000001YSZ',
          'invcName': '分析仪',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'TFZO-5',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3BQN',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3BQN',
          'innerCode': '1001B1100000000I3BQN',
          'invCode': '050601000068',
          'invName': '滤芯',
          'invcId': '1001B110000000001YWX',
          'invcName': '过滤器',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'E0060D003KIVG',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3BRB',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3BRB',
          'innerCode': '1001B1100000000I3BRB',
          'invCode': '050601000069',
          'invName': '滤芯',
          'invcId': '1001B110000000001YWX',
          'invcName': '过滤器',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'MFJE-20-S-103W-V',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3BSX',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YOW',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3BSX',
          'innerCode': '1001B1100000000I3BSX',
          'invCode': '120101000113',
          'invName': '兰皮纹纸',
          'invcId': '1001B110000000001Z0W',
          'invcName': '办公文具',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'A4',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3C64',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3C64',
          'innerCode': '1001B1100000000I3C64',
          'invCode': '039901000249',
          'invName': '骨架上帽',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '130*6000',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CB8',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CB8',
          'innerCode': '1001B1100000000I3CB8',
          'invCode': '030801000078',
          'invName': '改向滚筒',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '125*750',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CBU',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CBU',
          'innerCode': '1001B1100000000I3CBU',
          'invCode': '030801000079',
          'invName': '改向滚筒',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '219*1400',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CJM',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CJM',
          'innerCode': '1001B1100000000I3CJM',
          'invCode': '040405000113',
          'invName': '金属密封垫',
          'invcId': '1001B110000000001YW0',
          'invcName': '密封材料',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'DN100  PN10',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CKL',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CKL',
          'innerCode': '1001B1100000000I3CKL',
          'invCode': '030801000080',
          'invName': 'DT2型托辊',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '108*1360  4mm',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CL7',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CL7',
          'innerCode': '1001B1100000000I3CL7',
          'invCode': '030801000081',
          'invName': 'DT2型托辊',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '159*530   30轴  4mm',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3COA',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3COA',
          'innerCode': '1001B1100000000I3COA',
          'invCode': '030801000082',
          'invName': 'DT2型托辊',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '159*1600   30轴  4mm',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CPA',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CPA',
          'innerCode': '1001B1100000000I3CPA',
          'invCode': '030801000083',
          'invName': '外置包胶电动滚筒',
          'invcId': '1001B110000000001YV5',
          'invcName': '皮带机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'WD1111-10-500*1000',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CQD',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CQD',
          'innerCode': '1001B1100000000I3CQD',
          'invCode': '070301000043',
          'invName': '威力巴流量计',
          'invcId': '1001B110000000001YY4',
          'invcName': '流量计',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'LKWBV-3RM2-400  426*8',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3CRC',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3CRC',
          'innerCode': '1001B1100000000I3CRC',
          'invCode': '070606000049',
          'invName': '9路摄像机',
          'invcId': '1001B110000000001YYJ',
          'invcName': '监控设备',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'DS-7800',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3E7V',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3E7V',
          'innerCode': '1001B1100000000I3E7V',
          'invCode': '030203000041',
          'invName': '球墨铸铁闸阀',
          'invcId': '1001B110000000001YTT',
          'invcName': '闸阀',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'Z41T-16Q DN400',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3EGL',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3EGL',
          'innerCode': '1001B1100000000I3EGL',
          'invCode': '040301000045',
          'invName': '冲压弯头',
          'invcId': '1001B110000000001YVM',
          'invcName': '弯头',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '350*8  1.5D',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3EJ2',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPX',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3EJ2',
          'innerCode': '1001B1100000000I3EJ2',
          'invCode': '070605000037',
          'invName': '485光猫',
          'invcId': '1001B110000000001YYI',
          'invcName': '网络设备',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'MD-00DS485',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3EUE',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3EUE',
          'innerCode': '1001B1100000000I3EUE',
          'invCode': '040301000046',
          'invName': '弯头',
          'invcId': '1001B110000000001YVM',
          'invcName': '弯头',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '820*9',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3FNN',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3FNN',
          'innerCode': '1001B1100000000I3FNN',
          'invCode': '040201000166',
          'invName': '地脚螺栓',
          'invcId': '1001B110000000001YVG',
          'invcName': '螺栓',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '45*1300（一杆两母）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3FUR',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3FUR',
          'innerCode': '1001B1100000000I3FUR',
          'invCode': '030201000057',
          'invName': '电动通风蝶阀',
          'invcId': '1001B110000000001YTR',
          'invcName': '蝶阀',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'D941W-2.5C  DN800(配法兰，螺栓，操作箱）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3FWK',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3FWK',
          'innerCode': '1001B1100000000I3FWK',
          'invCode': '030704000023',
          'invName': '坐式电动葫芦',
          'invcId': '1001B110000000001YV3',
          'invcName': '电动葫芦',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '3T',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3G8B',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3G8B',
          'innerCode': '1001B1100000000I3G8B',
          'invCode': '039901000250',
          'invName': '销轴',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '1#开口机',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3G9L',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3G9L',
          'innerCode': '1001B1100000000I3G9L',
          'invCode': '039901000251',
          'invName': '销轴',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'T型连杆',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GBZ',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GBZ',
          'innerCode': '1001B1100000000I3GBZ',
          'invCode': '039901000252',
          'invName': '销轴',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '泥炮调整拉杆',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GFX',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPN',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GFX',
          'innerCode': '1001B1100000000I3GFX',
          'invCode': '039901000253',
          'invName': '开口机吊挂套',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GNV',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GNV',
          'innerCode': '1001B1100000000I3GNV',
          'invCode': '090311000033',
          'invName': '变频器',
          'invcId': '1001B110000000001YZW',
          'invcName': '变频器及其附件',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'GD200A-022G/030P-4(带远程控制箱）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GPA',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GPA',
          'innerCode': '1001B1100000000I3GPA',
          'invCode': '090311000034',
          'invName': '变频器',
          'invcId': '1001B110000000001YZW',
          'invcName': '变频器及其附件',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'GD220A-045G/055P-4(带远程控制箱）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GQ6',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GQ6',
          'innerCode': '1001B1100000000I3GQ6',
          'invCode': '090311000035',
          'invName': '变频器',
          'invcId': '1001B110000000001YZW',
          'invcName': '变频器及其附件',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'GD200A-110G/132P-4(带远程控制箱）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GRN',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GRN',
          'innerCode': '1001B1100000000I3GRN',
          'invCode': '090311000036',
          'invName': '变频器',
          'invcId': '1001B110000000001YZW',
          'invcName': '变频器及其附件',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'GD200A-220G/250P-4（带远程控制箱）',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GT3',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GT3',
          'innerCode': '1001B1100000000I3GT3',
          'invCode': '079901000053',
          'invName': '雷达料位计',
          'invcId': '1001B110000000001YYU',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'VEGAPULS64-TIANJINNGA',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GTY',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XP',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GTY',
          'innerCode': '1001B1100000000I3GTY',
          'invCode': '120201000454',
          'invName': '篷布',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '25米*10米',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3GV4',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YP6',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3GV4',
          'innerCode': '1001B1100000000I3GV4',
          'invCode': '020901000003',
          'invName': '焊机',
          'invcId': '1001B110000000001YSF',
          'invcName': '电焊机',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'ZX7-400E',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3H6C',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3H6C',
          'innerCode': '1001B1100000000I3H6C',
          'invCode': '010401000076',
          'invName': '阀板装配',
          'invcId': '1001B110000000001YQ9',
          'invcName': '东区炼铁',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'W51-27-00   带阀座',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3KEA',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3KEA',
          'innerCode': '1001B1100000000I3KEA',
          'invCode': '100301000017',
          'invName': '重型尼龙转向轮',
          'invcId': '1001B110000000001Z0A',
          'invcName': '胎类',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '5寸',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3KF3',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XL',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3KF3',
          'innerCode': '1001B1100000000I3KF3',
          'invCode': '120201000455',
          'invName': '绷带绳',
          'invcId': '1001B110000000001Z0Y',
          'invcName': '日杂消耗',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3KRJ',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '0001Z0100000000000XT',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3KRJ',
          'innerCode': '1001B1100000000I3KRJ',
          'invCode': '039901000254',
          'invName': '重型圆盘给料主体',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': 'PZ2500MM',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        },
        {
          'allocate': false,
          'asInventoryExWeigh': {
            'hiddenDeduct': 0,
            'id': '1001B1100000000I3KS1',
            'isDangerous': false,
            'isPack': false,
            'isSample': false,
            'new': false,
            'overload': false,
            'pnmary': false,
            'sceneConfirm': false,
            'weighType': 'TRUCK_SCALE'
          },
          'comId': '1001B110000000001YPH',
          'createDate': 1539776848000,
          'deleted': false,
          'enabled': true,
          'groupId': '0001B11000000000072V',
          'groupName': '山西立恒钢铁集团',
          'id': '1001B1100000000I3KS1',
          'innerCode': '1001B1100000000I3KS1',
          'invCode': '039901000255',
          'invName': '造球盘刮刀',
          'invcId': '1001B110000000001YVB',
          'invcName': '其他',
          'isPu': false,
          'isSa': false,
          'lossPercentage': 0,
          'lossWeight': 0,
          'model': '6米造球机配',
          'new': false,
          'orgId': '0001B11000000000072V',
          'packWeight': 0,
          'referencePrice': 0,
          'resourceType': 'NC',
          'theoryWeight': 0,
          'topBuyingPrice': 0
        }
      ]
    },
    getTableHeader () {
      this.tableHeader = [
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '第三方系统内码',
          'fieldName': 'innerCode2',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 3,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '参考售价',
          'fieldName': 'referencePrice',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 4,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '更新时间',
          'fieldName': 'updateDate',
          'formatType': 'DATE',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 5,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '更新人员',
          'fieldName': 'updateUser',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 7,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '规格型号',
          'fieldName': 'model',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 14,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '打印格式编码',
          'fieldName': 'printCode',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 16,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '是否启用',
          'fieldName': 'enabled',
          'formatType': 'BOOLEAN',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 20,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '材质',
          'fieldName': 'material',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 22,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '公司id',
          'fieldName': 'orgId',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 30,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '集团id',
          'fieldName': 'groupId',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 43,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '来源 0-本地 1-NC',
          'fieldName': 'resourceType',
          'formatType': 'ENUM',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'options': [
            {
              'label': '公司',
              'value': 'ORGANIZATION'
            },
            {
              'label': '其他',
              'value': 'OTHER'
            },
            {
              'label': '地磅称重',
              'value': 'LOCAL'
            },
            {
              'label': 'NC',
              'value': 'NC'
            }
          ],
          'seq': 45,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '集团id',
          'fieldName': 'groupId',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 45,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '理论单重',
          'fieldName': 'theoryWeight',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 51,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '计量单位ID',
          'fieldName': 'comId',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 56,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': 'ID',
          'fieldName': 'id',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 64,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '包装物单重',
          'fieldName': 'packWeight',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 71,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '更新人员ID',
          'fieldName': 'updateUser',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 81,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '物料编码',
          'fieldName': 'invCode',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 83,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '是否删除(0-未删除 1-已删除)',
          'fieldName': 'deleted',
          'formatType': 'BOOLEAN',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 84,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '是否销售',
          'fieldName': 'isSa',
          'formatType': 'BOOLEAN',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': true,
          'isShow': true,
          'seq': 85,
          'sortField': true
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '创建人员',
          'fieldName': 'createUser',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': true,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 86,
          'sortField': false
        },
        {
          'columnWidth': '20',
          'definedSort': true,
          'fieldExplain': '格式id',
          'fieldName': 'printId',
          'formatType': 'TEXT',
          'isAllowAdvanceQuery': false,
          'isAllowQuery': false,
          'isShow': true,
          'seq': 93,
          'sortField': false
        }
      ]
    },
    handleSizeChange (val) {
      this.$message.success(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.$message.success(`当前页: ${val}`)
    },
    handleNodeClick (item, node, el) {
      console.log(item, node, el)
    },
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit')
    },
    handleClose (done) {
      this.$emit('before-close', done)
    },
    open () {
      this.$emit('open')
    },
    opened () {
      this.$emit('opened')
    },
    close () {
      this.$emit('close')
    },
    closed () {
      this.$emit('closed')
    }
  },
  mounted () {
    this.getTableData()
    this.getData()
    this.getTableHeader()
  }
}
</script>

<style lang="scss" scoped>
.titleBox{
  width: 100%;
  height: 44px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  color: #333333;
  .title{
    font-size: 16px;
  }
  .close{
    cursor: pointer;
    font-weight: 600;
  }
}
</style>
<style lang="scss">
.custom-dialog{
  .el-dialog__header{
    padding: 0;
    border-bottom: 1px solid #e4eaec;
  }
  .el-dialog__body{
    padding: 0;
    background: #f1f4f5;
    border-bottom: 1px solid #e4eaec;
  }
}
</style>
