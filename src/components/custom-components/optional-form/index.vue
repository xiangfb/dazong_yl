<template>
  <div :id="id" class="optional">
    <el-table
      class="optionalBaseTable"
      :ref="'optionalBaseTable' + id"
      :data="list"
      :border="true"
      @sort-change="getSort"
      :row-key="rowKey"
    >
      <el-table-column width="50" align='center' type="index" label="序号" v-if="showIndex">

      </el-table-column>
      <el-table-column
        :width="item.width || ''"
        v-for="(item, index) in tableHeader"
        :key="index"
        :label="item.label"
        :prop="item.name"
        :sortable="item.sort"
        :sort-by="item.sortBy"
        >
        <template slot-scope="scope">
          <template v-if="item.type === 'plain'" >
            {{formatName(scope.row, item.name)}}
          </template>
          <template v-else-if="item.type === 'text'" >
            <el-input :disabled="item.disabled"  v-model="scope.row[item.name]" :placeholder="scope.row[item.name]"></el-input>
          </template>
          <template v-else-if="item.type === 'checkbox'" >
            <el-checkbox :disabled="item.disabled" v-model="scope.row[item.name]">{{item.label}}</el-checkbox>
          </template>
          <template v-else-if="item.type === 'sort'" >
            <el-input :disabled="item.disabled" @change="sort(item.name)"  v-model="scope.row[item.name]" :placeholder="scope.row[item.name]"></el-input>
          </template>
          <template v-else-if="item.type === 'select'" >
            <el-select :disabled="item.disabled" v-model="scope.row[item.name]" clearable placeholder="请选择">
              <el-option
                v-for="(v, i) in item.option || []"
                :key="i"
                :label="v.label"
                :value="v.value">
              </el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import $ from 'jquery'
// import $json from '@/const/basic/index'
import Sortable from 'sortablejs'
// import _ from 'lodash'
export default {
  name: 'optional-form',
  data () {
    return {
      list: [],
      sortable: null
      // basicNumberOption: $json.basicNumberOption
    }
  },
  watch: {
    data: function () {
      this.list = this.data
    }
  },
  mounted () {
    this.list = this.data
    if (this.dragSort) {
      this.setSort()
    }
  },
  methods: {
    formatName (row, name) {
      if (name) {
        let arr = name.split('.')
        if (arr.length === 1) {
          return row[name]
        } else {
          let prop = row
          for (let i = 0; i < arr.length; i++) {
            prop = prop[arr[i]]
          }
          return prop
        }
      }
    },
    getSort (sort) {
      if (sort.prop === this.defaultSort) {
        if (sort.order === 'ascending') {
          this.list.sort((a, b) => {
            if (a[this.defaultSort] < b[this.defaultSort]) { // 按某种排序标准进行比较, a 小于 b
              return -1
            } else if (a[this.defaultSort] > b[this.defaultSort]) {
              return 1
            } else {
              return 0
            }
          })
        } else if (sort.order === 'descending') {
          console.log('倒叙')
          this.list.sort((a, b) => {
            if (a[this.defaultSort] > b[this.defaultSort]) { // 按某种排序标准进行比较, a 小于 b
              return -1
            } else if (a[this.defaultSort] < b[this.defaultSort]) {
              return 1
            } else {
              return 0
            }
          })
        }
        this.list.map((v, i) => {
          this.$set(v, 'seq', i + 1)
        })
        console.log(this.list)
        // console.log(this.list)
        this.$emit('on-change', this.list)
      }
    },
    sort (name) {
      this.$refs['optionalBaseTable' + this.id].sort(name, 'ascending')
      this.list.sort((a, b) => {
        if (a.seq < b.seq) { // 按某种排序标准进行比较, a 小于 b
          return -1
        } else if (a.seq > b.seq) {
          return 1
        } else {
          return 0
        }
        // a must be equal to b
      })
      this.list.map((v, i) => {
        this.$set(v, name, i + 1)
      })
      console.log(this.list)
      // console.log(this.list)
      this.$emit('on-change', this.list)
    },
    setSort () {
      // let el = this.$refs.optionalBaseTable.children
      console.log(this.$refs['optionalBaseTable' + this.id])
      const el = $(this.$refs['optionalBaseTable' + this.id].$el).find('tbody')
      console.log(el)
      for (let iv = 0; iv < el.length; iv++) {
        this.sortable = Sortable.create(el[iv], {
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '')
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            const targetRow = this.list.splice(evt.oldIndex, 1)[0]
            this.list.splice(evt.newIndex, 0, targetRow)
            // console.log(this.list)
            this.list.map((v, i) => {
              this.$set(v, 'seq', i + 1)
            })
            this.$emit('on-change', this.list)
          }
        })
      }
    }
  },
  model: {
    prop: 'data',
    event: 'on-change'
  },
  props: {
    id: {
      type: [String, Number],
      default: 'optional',
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    dragSort: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: String,
      default: ''
    },
    rowKey: {
      type: [String, Number],
      default: 'id',
      required: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    tableHeader: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
