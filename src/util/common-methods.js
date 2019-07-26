import $config from 'config'

function formatServiceMinutes (value, type) {
  let result = '{id}'.format(+value % 60)
  let text = ' 分钟'
  if (value > 59) {
    result = '{id}'.format(Math.floor((+value / 60)))
    text = ' 小时'
  }
  if (!type) {
    result += text
  }
  return result
}

function formatImage (value, type) {
  // 定义了3种样式图片 169 代表 16:9 , 43 代表 4:3 , 11 代表 1:1
  // 每种共三个大小 s 代表 small , m 代表 middle ,b 代表 big
  // 共有9种图片 b169 m169 s169 b43 m43 s43 b11 m11 s11
  // 还有不传参数代表原图
  if (/^https?:\/\//.test(value)) {
    return value
  }
  if (/^data:image/.test(value)) {
    return value
  }
  if (!value) {
    value = 'default.png'
  }
  if (type) {
    return $config.imageUrl + value + '-' + type
  } else {
    return $config.imageUrl + value
  }
}
function formatImage1 (value, type) {
  // 定义了3种样式图片 169 代表 16:9 , 43 代表 4:3 , 11 代表 1:1
  // 每种共三个大小 s 代表 small , m 代表 middle ,b 代表 big
  // 共有9种图片 b169 m169 s169 b43 m43 s43 b11 m11 s11
  // 还有不传参数代表原图
  if (/^https?:\/\//.test(value)) {
    return value
  }
  if (/^data:image/.test(value)) {
    return value
  }
  if (!value) {
    value = 'default.png'
  }
  if (type) {
    return $config.imageUri + value + '-' + type
  } else {
    return $config.imageUri + value
  }
}

function formatPreViewer (value) {
  if (!value) return ''
  let jsonStr = {
    src: value,
    w: 800,
    h: 600
  }
  return jsonStr
}

function formatContent (value) {
  if (!value) return ''
  return value.replace(/\n/gi, '<br/>').replace(/ /gi, '&nbsp')
}
function formatError (value, content) {
  if (!value) return ''
  return value.replace('%%%', content)
}
// time format method
function formatDate (time, type) {
  if (!time) time = new Date()
  if (/^\d+$/.test(time)) time = new Date(time)
  var month = time.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var day = time.getDate()
  if (day < 10) {
    day = '0' + day
  }
  var hour = time.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  var minute = time.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  var second = time.getSeconds()
  if (second < 10) {
    second = '0' + second
  }
  if (type === 1) {
    return '{id}-{id}{id}{id}:{id}'.format(month, day, ' ', hour, minute)
  } else if (type === 2) {
    return '{id}-{id}-{id}'.format(time.getFullYear(), month, day)
  } else if (type === 5) {
    return '{id}年{id}月{id}日'.format(time.getFullYear(), month, day)
  } else if (type === 4) {
    return '{id}-{id}-{id}{id}{id}:{id}:{id}'.format(time.getFullYear(), month, day, ' ', hour, minute, second)
  } else {
    return '{id}-{id}-{id}{id}{id}:{id}'.format(time.getFullYear(), month, day, ' ', hour, minute)
  }
}

function isEmptyObject (e) {
  var t
  for (t in e) {
    return !1
  }
  return !0
}

function interval (func, wait) {
  var interv = function () {
    func.call(null) // eslint-disable-line
    setTimeout(interv, wait)
  }
  setTimeout(interv, wait)
}

function formatSalary ([min, max], type = 0) {
  // 转为 nk-nk格式
  let template // 格式化模版
  if (type === 0) {
    template = '{id}K-{id}K'
  }
  if (!min && !max) {
    return '不限'
  }
  if (!min) {
    return max / 1000 + 'K以下'
  }
  if (!max) {
    return min / 1000 + 'K以上'
  }
  return template.format(min / 1000, max / 1000)
}

function baseColStatusRender (row, value, label, column) {
  return '<el-button type="primary">主要按钮</el-button>'
}

function Stack () { // 栈
  var items = [] // 使用数据存储
  // 从栈顶添加元素，也叫压栈
  this.push = function (item) {
    items.push(item)
  }
  // 弹出栈顶元素
  this.pop = function (item) {
    return items.pop()
  }
  // 返回栈顶元素
  this.top = function () {
    return items[items.length - 1]
  }
  // 判断栈是否为空
  this.isEmpty = function () {
    return items.length === 0
  }
  // 返回栈的大小
  this.size = function () {
    return items.length
  }
  // 清空栈
  this.clear = function () {
    items = []
  }
}
// 定义运算符的优先级
var priorityMap = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}
function infixExpPostfixRxp (exp) { // 中缀表达式转后缀表达式
  var stack = new Stack()
  var postfixLst = []
  for (var i = 0; i < exp.length; i++) {
    var item = exp[i]
    // 如果是数字,直接放⼊到postfixLst中
    if (!isNaN(item)) {
      postfixLst.push(item)
    } else if (item === '(') {
      // 遇到左括号⼊栈
      stack.push(item)
    } else if (item === ')') {
      // 遇到右括号,把栈顶元素弹出,直到遇到左括号
      while (stack.top() !== '(') {
        postfixLst.push(stack.pop())
      }
      stack.pop() // 左括号出栈
    } else {
      // 遇到运算符,把栈顶的运算符弹出,直到栈顶的运算符优先级⼩于当前运算符
      while (!stack.isEmpty() && ['+', '-', '*', '/'].indexOf(stack.top()) >= 0 && priorityMap[stack.top()] >= priorityMap[item]) {
        // 把弹出的运算符加⼊到postfixLst
        postfixLst.push(stack.pop())
      }
      // 当前的运算符⼊栈
      stack.push(item)
    }
  }
  // for循环结束后，栈⾥可能还有元素,都弹出放⼊到postfixLst中
  while (!stack.isEmpty()) {
    postfixLst.push(stack.pop())
  }
  return postfixLst
};

function count (opera, num1, num2) { // 运算
  switch (opera) {
    case '+':
      return num2 + num1
    case '-':
      return num2 - num1
    case '*':
      return num2 * num1
    case '/':
      return num2 / num1
  }
}
function calcExp (exp) { // 计算后缀表达式
  var stack = new Stack()
  for (let i = 0; i < exp.length; i++) {
    let item = exp[i]
    if (['+', '-', '*', '/'].indexOf(item) >= 0) {
      var value1 = stack.pop()
      var value2 = stack.pop()
      var expStr = count(item, value1 * 1, value2 * 1)
      // 计算并取整
      // var res = parseInt(eval(exp_str))
      // var res = eval(exp_str)
      // 将计算结果压入栈中
      stack.push(expStr.toString())
    } else {
      stack.push(item)
    }
  }
  return stack.pop()
}

export { formatServiceMinutes, formatImage1, formatError, formatImage, formatPreViewer, formatContent, formatDate, isEmptyObject, interval, formatSalary, baseColStatusRender, Stack, infixExpPostfixRxp, calcExp }
