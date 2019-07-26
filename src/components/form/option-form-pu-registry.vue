<template>
  <div class="option_form">
    <basic-container>
      <el-form label-position="right" ref="form" :model="form" label-width="110px">
        <el-row>
          <el-col v-for="(item, index) in list" :key="index" :span="6">
            <el-form-item :label="item.fieldExplain && item.fieldExplain.substr(0, 5)">
              <template v-if="item.formSubmitType === 'ONE_TXT'">
                <el-input :disabled="!item.isUpdate" @change="getChange" v-model="form[item.fieldName]"></el-input>
              </template>
              <template v-else-if="item.formSubmitType === 'SINGLE_ELECTION'">
                <el-select :disabled="!item.isUpdate" @change="getChange" v-model="form[item.fieldName]" placeholder="请选择">
                  <el-option
                    v-for="item1 in item.options || []"
                    :key="item1.value"
                    :label="item1.label"
                    :value="item1.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.formSubmitType === 'MORE_TXT'">
                <el-input :disabled="!item.isUpdate" @change="getChange" type="textarea" v-model="form[item.fieldName]"></el-input>
              </template>
              <template v-else-if="item.formSubmitType === 'DATE'">
                <el-date-picker :disabled="!item.isUpdate" @change="getChange" value-format="yyyy-MM-dd HH:mm:ss" v-model="form[item.fieldName]" type="date" placeholder="选择日期"></el-date-picker>
              </template>
              <template v-else-if="item.formSubmitType === 'BOOLEAN'">
                <!-- <el-radio @change="getChange" v-for="(v, i) in item.options" :key="i" v-model="form[item.fieldName]" :label="v.label">{{v.value}}</el-radio> -->
                <!-- <el-radio @change="getChange" v-model="form[item.fieldName]" :label="0">否</el-radio>
                <el-radio @change="getChange" v-model="form[item.fieldName]" :label="1">是</el-radio>-->
                <el-switch :disabled="!item.isUpdate" @change="getChange" v-model="form[item.fieldName]"></el-switch>
              </template>
              <template v-else-if="item.formSubmitType === 'MULTIPLE_SELECTION'">
                <el-checkbox-group :disabled="!item.isUpdate" @change="getChange" v-model="form[item.fieldName]">
                  <el-checkbox
                    v-for="(v, i) in item.options || []"
                    :key="i"
                    v-model="form[item.fieldName]"
                    :label="v.value"
                  >{{v.label}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </basic-container>
  </div>
</template>

<script>
// import dataJson from 'service/main1.js'
export default {
  name: 'form-options',
  data () {
    return {
      form: {},
      type: 1
    }
  },
  methods: {
    getChange () {
      this.$emit('change', this.form)
    },
    change () {
      // if (this.type) {
      //   this.list = dataJson1.body.list
      // } else {
      //   this.list = dataJson.body.list
      // }
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
  watch: {
    list: function (n) {
      console.log(this.list)
      this.list.map(v => {
        // if (v.formSubmitType !== 'MULTIPLE_SELECTION') {
        //   v.defaultValue = 0
        // } else {
        //   v.defaultValue = []
        // }

        this.$set(this.form, v.fieldName, v.defaultValue)
      })
    }
  },
  created () {
    // this.list.map(v => {
    //   if (v.formSubmitType !== 'MULTIPLE_SELECTION') {
    //     v.defaultValue = 0
    //   } else {
    //     v.defaultValue = []
    //   }
    //   this.$set(this.form, v.cgCustomTableSub.fieldName, v.defaultValue)
    // })
    // this.list.sort((a, b) => {
    //   return b.seq - a.seq
    // })
  },
  props: {
    list: {
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
