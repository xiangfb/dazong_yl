import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
import NProgress from 'nprogress' // progress bar
const OSS = require('ali-oss')
const region = 'oss-cn-beijing'
const bucket = 'clouds1000'
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})
class ALIOSS {
  constructor () {
    this.client = null
  }
  getToken () {
    return Ajax.get({
      url: apiUrl.oss.getToken + '?key=cloudStsToken'
    })
  }
  init () {
    let that = this
    return new Promise((resolve) => {
      NProgress.start()
      that.getToken().then(res => {
        if (res && res.code === 0) {
          NProgress.done()
          try {
            let client = new OSS({
              region: region,
              // endpoint: ' oss-cn-beijing.aliyuncs.com',
              accessKeyId: res.data.AccessKeyId,
              accessKeySecret: res.data.AccessKeySecret,
              stsToken: res.data.SecurityToken,
              bucket: bucket
            })
            that.client = client
            resolve(client)
          } catch (e) {
            alert(e)
          }
        }
      }).catch(err => new Error(err))
    })
  }
  uploadFile (key, file, Fileprogress, fileSuccess, fileError) {
    let that = this
    return new Promise((resolve, reject) => {
      that.init().then((client) => {
        NProgress.start()
        client.multipartUpload(key, file, {
          progress: function (p) {
            Fileprogress(p)
            return function (done) {
              NProgress.set(p)
              done()
            }
          }
        }).then(res => {
          fileSuccess(res)
          resolve(res)
          NProgress.done()
        }).catch(e => {
          fileError(e)
          throw (e)
        }).finally(() => {
          NProgress.done()
        })
      })
    })
  }
  async setImageACLPublic (name) {
    let result = await this.client.putACL(name, 'public-read')
    return result
  }
  async imageInfo (name) {
    let result = await this.client.signatureUrl(name, { expires: 3600, process: 'image/info' })
    return result
  }
  async showImage (name) {
    let result = this.client.signatureUrl(name)
    return result
  }
}
export default new ALIOSS()
