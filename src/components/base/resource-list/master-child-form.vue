<template>
  <div style="overflow-y: auto;">
    <form-column
      v-if="opations && opations.main"
      :columnNum="8"
      :fieldData="fieldDatas[opations.main]"
      :modelData="modelData[opations.main]"></form-column>
    <div class="p-b-10" v-if="census">
      <p>统计信息：</p>
      <div>
        <span class="p-r-20 m-r-20" v-for="(item, index) in census" :key="index">{{item.label}}：{{item.value}}</span>
      </div>
    </div>
    <form-edit
      v-if="opations && opations.son"
      :tableHeader="fieldDatas[opations.son]"
      :data="modelData[opations.son]"></form-edit>
  </div>
</template>

<script>
import FormColumn from './column.vue'
import FormEdit from './edit.vue'
import XEUtils from 'xe-utils'
export default {
  data () {
    return {

    }
  },
  props: {
    census: null,
    fieldData: null,
    modelData: null
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {
    opations () {
      let opations = {
        main: '',
        son: ''
      }
      for (let item in this.modelData) {
        if (XEUtils.isArray(this.modelData[item])) { // 是否为数组
          opations.son = item
        } else if (XEUtils.isPlainObject(this.modelData[item])) { // 是否为对象
          opations.main = item
        }
      }
      return opations
    },
    fieldDatas () {
      let fieldData = {}
      this.fieldData.forEach(item => {
        if (fieldData[item.customTable]) {
          fieldData[item.customTable].push(item)
        } else {
          fieldData[item.customTable] = [item]
        }
      })
      return fieldData
    }
  },
  components: {
    FormColumn,
    FormEdit
  }
}
</script>

<style scoped>

</style>
