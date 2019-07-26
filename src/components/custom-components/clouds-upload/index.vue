<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :limit="limit"
      list-type="picture-card"
      :show-file-list="true"
      :on-preview="preview"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :http-request="upload">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog width="60%" :visible.sync="dialogVisible">
      <div class="bg-grey width-full p-10">
        <img width="100%" :src="dialogUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import OSS from 'util/ali-oss'
export default {
  name: 'cloud-upload',
  data () {
    return {
      dialogUrl: '',
      dialogVisible: false,
      imageUrl: '',
      fileList: [],
      file: null
    }
  },
  props: {
    limit: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  watch: {
    imgUrl (n) {
      this.imageUrl = n
    }
  },
  methods: {
    onExceed () {
      this.$notify({
        title: '上传个数超出限制!',
        message: '最大上传数为' + this.limit + '个,请删除后再进行上传',
        type: 'error',
        duration: 2000
      })
    },
    remove (i) {
      this.fileList.splice(i, 1)
    },
    preview (item) {
      this.dialogUrl = item.url
      this.dialogVisible = true
    },
    upload (fileObj) {
      let file = fileObj.file
      OSS.uploadFile(file.name, file, fileObj.onProgress, fileObj.onSuccess, fileObj.onError).then(res => {
        OSS.showImage(res.name).then(response => {
          this.imageUrl = response
          this.$emit('change', response)
        })
      })
    },
    onChange (file, fileList) {
      this.file = file
      this.fileList = fileList
      console.log(fileList)
    },
    beforeUpload (file) {
    }
  }
}
</script>
<style lang="scss" scoped>
.flex{
  display: flex;
  justify-content: flex-start;
}
</style>
