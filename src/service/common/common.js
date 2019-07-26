import apiUrl from 'apiUrl'
import Ajax from '_router/ajax'
class CommonService {
  print (params) {
    return Ajax.post({
      url: apiUrl.mouldResource.frReport.print,
      data: params
    })
  }

  // 使用cjkEncode对调用报表的路径或参数进行编码，报表获取到参数后会自动进行解码，保证不会出现乱码等一系列情况
  // 使用FR.cjkEncode对中日韩文字符进行编码
  cjkEncode (text) {
    if (text == null) {
      return ''
    }
    var newText = ''
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i)
      if (code >= 128 || code === 91 || code === 93) { // 91 is "[", 93 is "]".
        newText += '[' + code.toString(16) + ']'
      } else {
        newText += text.charAt(i)
      }
    }
    return newText
  }

  getFrUrl (data) {
    let frSrc = data.reportUrl
    let paramUrl = ''
    if (data.param) {
      for (var key in data.param) {
        paramUrl = paramUrl + '&' + key + '=' + data.param[key]
      }
    }
    frSrc = frSrc + paramUrl
    frSrc = this.cjkEncode(frSrc)
    return frSrc
  }
}
export default new CommonService()
