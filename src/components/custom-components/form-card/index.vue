<template>
  <div class="form p-t-20 p-b-20">
    <div class="titles">
      <div class="tag"></div>
      <div class="tt m-r-15">{{title}}</div>
      <div class="formbox">
        <div class="model m-b-25">{{tips}}</div>
      </div>
    </div>
    <div class="p-l-20 p-r-20">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-card',
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: '您的证件信息不会被其他网站看到，我们将严格保密，请放心填写'
    }
  }
}
</script>

<style lang="scss" scoped>
.form{

}
.titles{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .tag{
    width: 10px;
    height: 28px;
    background: #3c5fbd;
    margin-right: 35px;
  }
  .tt{
    font-size: 28px;
    line-height: 28px;
    font-weight: 400;
  }
  .model{
    height: 28px;
    line-height: 28px;
  }
}
</style>
