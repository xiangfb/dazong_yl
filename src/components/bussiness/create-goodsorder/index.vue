<template>
  <div class="create-goodsorder m-t-10">
    <CustomBtnGroup class="m-b-10" :limit="6" @on-click="compile" :btnGroup="btnGroup"></CustomBtnGroup>
    <el-form :model="goodsForm" :rules="goodsRules" ref="ruleForm" label-width="100px" class="goods-ruleForm">
      <div class="goods-info">
        <div class="title m-b-10 align-left">货源单信息</div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动名称" prop="name">
              <el-input :disabled="testDisable('name')" v-model="goodsForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <div class="title m-b-10 align-left">发货方信息</div>
        <div class="title m-b-10 align-left">收货方信息</div>
        <div class="title m-b-10 align-left">承运方信息</div>
        <div class="title m-b-10 align-left">物流信息</div>
        <div class="title m-b-10 align-left">物料详情</div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'create-goodsorder',
  data () {
    return {
      goodsForm: {},
      goodsRules: {},
      btnGroup: [
        {
          btnType: '',
          permision: '',
          name: 'save',
          label: '保存',
          type: 'btn'
        },
        {
          btnType: '',
          permision: '',
          name: 'cancel',
          label: '取消',
          type: 'btn'
        }
      ]
    }
  },
  methods: {
    compile (e) {
      switch (e) {
        case 'cancel':
          this.cancel()
          break
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    testDisable (e) {
      if (!this.editable) return true
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-goodsorder{
  width: 100%;
}
</style>
