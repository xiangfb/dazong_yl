<template>
  <div id="search">
    <el-input v-model="goodsSearch" class="search-input" placeholder="请输入关键词"></el-input>
    <div @click="handleSearch" class="iconfont icon-search search-btn cursor"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsSearch: ''
    }
  },
  watch: {
    defaultValue (n) {
      this.goodsSearch = n
    }
  },
  props: {
    defaultValue: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleSearch () {
      this.$emit('change', this.goodsSearch)
    }
  }
}
</script>

<style lang="scss">
 #search{
  flex: none;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-input{
    width: 350px;
    &>input{
      border-radius: 32px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0%;
    }
  }
  .search-btn{
    width: 50px;
    height: 32px;
    border-radius: 32px;
    line-height: 32px;
    color: #fff;
    text-align: center;
    background: #3C5FBD;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
