<template>
   <el-cascader
   :disabled="disabled"
    :options="regionData"
    v-model="address"
    @change="handleChange"/>
</template>

<script>
import {
  regionData,
  CodeToText,
  TextToCode
} from 'util/region-data.js'
export default {
  name: 'region-cascader',
  data () {
    return {
      CodeToText,
      TextToCode,
      regionData,
      address: []
    }
  },
  props: {
    placeCode: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    placeCode (placeCode) {
      console.log(placeCode)
      this.address = this.placeCode
    }
  },
  methods: {
    handleChange (arr) {
      let textArr = this.convertCodeToText(arr[0], arr[1], arr[2], true)

      this.$emit('change', arr, textArr)
    },
    convertTextToCode (provinceText, cityText, regionText) {
      let code = ''
      if (provinceText && this.TextToCode[provinceText]) {
        const province = this.TextToCode[provinceText]
        code += province.code + ', '
        if (cityText && province[cityText]) {
          const city = province[cityText]
          code += city.code + ', '
          if (regionText && city[regionText]) {
            code += city[regionText].code
          }
        }
      }
      return code
    },
    convertCodeToText (provinceCode, cityCode, regionCode, type) {
      let code = ''
      let provinceText
      let cityText
      let regionText
      if (provinceCode) {
        const province = this.CodeToText[provinceCode]
        code += province
        provinceText = province
        if (cityCode) {
          const city = this.CodeToText[cityCode]
          code += city
          cityText = city
          if (regionCode) {
            const region = this.CodeToText[regionCode]
            code += region
            regionText = region
          }
        }
      }
      if (type) {
        let arr = []
        arr.push(provinceText, cityText, regionText)
        return arr
      } else {
        return code
      }
    }
  }
}
</script>
