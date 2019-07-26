<template>
  <div class="option_form">
     <basic-container>
        <el-form label-position="right" ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col  v-for="(item, index) in list" :key="index" :span="6">
              <template v-if="item.isShow">
                <el-form-item  :label="item.fieldExplain  ">
                  <template v-if="item.formSubmitType === 'ONE_TXT'">
                      <el-input v-model="form[item.cgCustomTableSub.fieldName]"></el-input>
                  </template>
                  <template v-else-if="item.formSubmitType === 'SELECT'">
                      <el-select v-model="form[item.cgCustomTableSub.fieldName]" placeholder="请选择">
                        <el-option
                          v-for="item1 in item.formOption"
                          :key="item1.value"
                          :label="item1.label"
                          :value="item1.value">
                        </el-option>
                      </el-select>
                  </template>
                  <template v-else-if="item.formSubmitType === 'MORE_TXT'">
                     <el-input type="textarea" v-model="form[item.cgCustomTableSub.fieldName]"></el-input>
                  </template>
                  <template v-else-if="item.formSubmitType === 'DATE'">
                      <el-date-picker
                        v-model="form[item.cgCustomTableSub.fieldName]"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期">
                      </el-date-picker>
                  </template>
                  <template v-else-if="item.formSubmitType === 'SINGLE_ELECTION'">
                    <el-radio v-for="(v, i) in item.formOption" :key="i" v-model="form[item.cgCustomTableSub.fieldName]" :label="v.value">{{v.label}}</el-radio>
                  </template>
                  <template v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION'">
                    <el-checkbox-group @change="getValue(form[item.cgCustomTableSub.fieldName])" v-model="form[item.cgCustomTableSub.fieldName]">
                      <el-checkbox v-for="(v, i) in item.formOption" :key="i" v-model="form[item.cgCustomTableSub.fieldName]" :label="v.value">{{v.label}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-form-item>
              </template>
            </el-col>
          </el-row>
        </el-form>
     </basic-container>
  </div>
</template>

<script>
// import dataJson from 'service/main1.js'
// import dataJson1 from 'service/main2.js'
export default {
  name: 'form-options',
  data () {
    return {
      list: [],
      form: {},
      type: 1
    }
  },
  methods: {
    change () {
      if (this.type) {
        // this.list = dataJson1.body.list
      } else {
        // this.list = dataJson.body.list
      }
      this.type = !this.type
      this.$emit('on-change', this.type)
      this.list.map(v => {
        if (v.formSubmitType !== 'MULTIPLE_SELECTION') {
          v.defaultValue = 0
        } else {
          v.defaultValue = []
        }
        this.$set(this.form, v.cgCustomTableSub.fieldName, v.defaultValue)
      })
      this.list.sort((a, b) => {
        return b.seq - a.seq
      })
    },
    getValue (e) {
      console.log(e)
    }
  },
  created () {
    this.list.map(v => {
      if (v.formSubmitType !== 'MULTIPLE_SELECTION') {
        v.defaultValue = 0
      } else {
        v.defaultValue = []
      }

      this.$set(this.form, v.cgCustomTableSub.fieldName, v.defaultValue)
    })
    this.list.sort((a, b) => {
      return b.seq - a.seq
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
