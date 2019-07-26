<template>
  <div class="top_company_box">
    <el-tooltip effect="dark" :content="userInfo.currentOrgName" placement="bottom">
      <div class="top-bar__item">
        <el-button class="nowrap" @click="dialogVisible = true">{{userInfo.currentOrgName}}</el-button>
      </div>
    </el-tooltip>
    <popup-list width="70%" :visibleSync="dialogVisible" title="选择组织机构">
      <el-form :inline="true" :model="search" class="p-10 p-b-n popup_list_box">
        <el-form-item label="公司编号：">
          <el-input size="mini" v-model="search.orgCode" clearable placeholder="公司编号"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input size="mini" v-model="search.orgName" clearable placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="getCurrentOrgs">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="p-10">
        <custom-edit-table
          class="m-b-10"
          ref="custom"
          :loading="loading"
          :table-header="header"
          :data="list"
          border
          select
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
          :max-height="280"></custom-edit-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pn"
          :page-sizes="pageSizes"
          :page-size="ps"
          class="align-right p-n top_company_pagination"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer float-hidden">
        <el-button :loading="butLoading" class="f-r" @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="butLoading" class="f-r" @click="swithOrg" type="primary">确 定</el-button>
      </div>
    </popup-list>
  </div>
</template>

<script>
import { PopupList } from 'components/base/index'
import { mapGetters, mapActions } from 'vuex'
import CompanyService from 'service/company-service'
export default {
  data () {
    return {
      butLoading: false,
      dialogVisible: false,
      search: {
        orgCode: null,
        orgName: null
      },
      sort: [],
      selectionList: [],
      loading: false,
      pn: 1,
      ps: 10,
      pageSizes: [10, 20, 40, 80, 100],
      total: 0,
      header: [
        {
          fieldExplain: '公司编号',
          fieldName: 'orgCode',
          isortField: true,
          ishow: true,
          iupdate: false
        },
        {
          fieldExplain: '公司名称',
          fieldName: 'orgName',
          ishow: true,
          iupdate: false
        }
      ],
      list: []
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
    dialogVisible: {
      handler (e) {
        if (e) {
          this.getCurrentOrgs()
        }
      },
      deep: true, // 深度监听
      immediate: true // 首次进入也监听
    }
  },
  methods: {
    ...mapActions(['RefreshToken', 'GetUserInfo']),
    swithOrg () {
      if (this.selectionList < 1) {
        this.$message.error('最少选择一条数据！')
      } else if (this.selectionList > 1) {
        this.$message.error('最多选择一条数据！')
      } else {
        if (this.userInfo.currentOrg === this.selectionList[0].id) {
          this.$message.error('现在所使用的就是当前公司！')
        } else {
          this.butLoading = true
          CompanyService.switchOrg(this.selectionList[0].id).then(res => {
            if (res.success) {
              this.RefreshToken().then(r => {
                if (r && r.refresh_token) {
                  this.GetUserInfo().then(() => {
                    this.dialogVisible = false
                    this.butLoading = false
                  })
                }
              })
            }
          })
        }
      }
    },
    handleSelectionChange (data) {
      this.selectionList = data
    },
    handleSizeChange (ps) {
      this.ps = ps
      this.getCurrentOrgs()
    },
    handleCurrentChange (pn) {
      this.pn = pn
      this.getCurrentOrgs()
    },
    sortChange (prop, order) {
      if (prop) {
        this.sort = [{ key: prop, dir: order }]
      } else {
        this.sort = []
      }
      this.getCurrentOrgs()
    },
    getCurrentOrgs () {
      this.loading = true
      let search = []
      for (let item in this.search) {
        if (this.search[item]) {
          search.push({
            key: item, op: 'like', val: this.search[item]
          })
        }
      }
      CompanyService.currentOrgs({
        limit: {
          pn: this.pn,
          ps: this.ps
        },
        sort: this.sort,
        search: search
      }).then(res => {
        if (res.success) {
          this.list = res.data.list.map(item => {
            item._checked = item.selected
            if (item.selected) {
              this.selectionList = [item]
            }
            return item
          })
          this.total = res.data.total
          this.loading = false
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    PopupList
  }
}
</script>

<style lang="scss">
  .top_company_box{
    .top-bar__item{
      display: block !important;
      .el-button{
        max-width: 140px !important;
        color: #fff !important;
        border: 0px !important;
        background: transparent !important;
        border-radius: 0 !important;
        height: 100% !important;
        &:hover{
          background: rgba(0, 0, 0, .1) !important;
        }
      }
    }
    .popup_list_box{
      .el-form-item{
        margin-bottom: 0px !important;
      }
    }
    .f-r{
      margin-left: 10px !important;
    }
  }
  .top_company_pagination, .top_company_box .dialog-footer{
    i {
      line-height: inherit !important;
    }
  }
</style>
