let XLSX = require('xlsx')
/**
 *
 * @param {*} json
 * @param {*} downName
 * @param {*} type
 */
function downloadExl (json, downName, type) { // 导出到excel
  let keyMap = [] // 获取键
  for (let k in json[0]) {
    keyMap.push(k)
  }
  let tmpdata = [] // 用来保存转换好的json
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
    tmpdata[v.position] = {
      v: v.v
    }
  })
  let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
  let tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, // 内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
        })
    }
  }
  let tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
    { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
  ))], {
    type: ''
  }) // 创建二进制对象写入转换好的字节流
  let href = URL.createObjectURL(tmpDown) // 创建对象超链接
  let outFile = document.createElement('a')
  outFile.download = downName + '.xlsx' // 下载名称
  outFile.href = href // 绑定a标签
  outFile.click() // 模拟点击实现下载
  setTimeout(function () { // 延时释放
    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}
/**
 *
 * @param {*} s
 */
function s2ab (s) { // 字符串转字符流
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}
/**
 *
 * @param {*} n
 */
function getCharCol (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  let s = ''
  let m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}
/**
 *
 * @param {*} data
 */
function fixdata (data) { // 文件流转BinaryString
  let o = ''
  let l = 0
  let w = 10240
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}
function importFile ($t, imFile, cb) { // 导入excel
  let obj = imFile
  if (!obj.files) {
    return
  }
  let f = obj.files[0]
  let reader = new FileReader()
  reader.onload = function (e) {
    let data = e.target.result
    if ($t.rABS) {
      $t.wb = XLSX.read(btoa(this.fixdata(data)), { // 手动转化
        type: 'base64'
      })
    } else {
      $t.wb = XLSX.read(data, {
        type: 'binary'
      })
    }
    let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
    obj.value = ''
    cb && cb(json)
    // analyzeData: 解析导入数据
  }
  if (this.rABS) {
    reader.readAsArrayBuffer(f)
  } else {
    reader.readAsBinaryString(f)
  }
}
export {
  fixdata,
  s2ab,
  getCharCol,
  downloadExl,
  importFile
}
