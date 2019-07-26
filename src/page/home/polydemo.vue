<template>
  <div class="wrapmap">
    <div id="amap" ref="amap">

    </div>
    <br>
    <div class="ploy">
      <el-button size="md" type="success" @click="move">开始</el-button>
      <el-button size="md" type="warning" @click="pause">暂停</el-button>
      <el-button size="md" type="primary" @click="resume">继续</el-button>
      <el-button size="md" type="danger" @click="stop">停止</el-button>
    </div>
  </div>
</template>

<script>
import mapLoader from 'util/aMap'
export default {
  data () {
    return {
      map: null,
      Clng: '120.267842',
      Clat: '30.19439',
      Flng: '120.267417907715',
      Flat: '30.19460105896',
      Tlng: '120.269302368164',
      Tlat: '30.2087898254395',
      carMarker: null,
      path: []
    }
  },
  methods: {
    move () {
      this.carMarker.moveAlong(this.path, 450, function (k) {
        return k
      })
    },
    pause () {
      this.carMarker.pauseMove()
    },
    resume () {
      this.carMarker.resumeMove()
    },
    stop () {
      this.carMarker.stopMove()
    },
    drawPloy () {
      let that = this
      mapLoader().then(AMap => {
        console.log('地图加载成功')
        that.map = new AMap.Map('amap', {
          resizeEnable: true,
          zoom: 14,
          center: [that.Clng, that.Clat] // 地图中心点的经纬度
        })
        AMap.plugin('AMap.Driving', () => {
          let driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式,还有其他几种方式见Api文档
            policy: AMap.DrivingPolicy.LEAST_TIME
          })
          let startXy = new AMap.LngLat(that.Flng, that.Flat) // 起点的经纬度
          let endXy = new AMap.LngLat(that.Tlng, that.Tlat) // 终点的经纬度
          driving.search(startXy, endXy, (status, result) => {
            if (status === 'complete') {
              if (result.routes && result.routes.length) {
                // 绘制第一条路线，也可以按需求绘制其它几条路线
                that.path = that.parseRouteToPath(result.routes[0])
                let startMarker = new AMap.Marker({
                  position: that.path[0],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                  map: that.map
                })
                let icon = new AMap.Icon({
                  size: [26, 13],
                  image: 'http://webapi.amap.com/images/car.png',
                  imageSize: [26, 13]
                })
                that.carMarker = new AMap.Marker({
                  map: that.map,
                  position: that.path[0],
                  icon: icon,
                  offset: new AMap.Pixel(-5, 0),
                  autoRotation: true
                })
                let endMarker = new AMap.Marker({
                  position: that.path[that.path.length - 1],
                  icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                  map: that.map
                })
                let routeLine = new AMap.Polyline({
                  path: that.path,
                  isOutline: true,
                  outlineColor: '#ffeeee',
                  borderWeight: 2,
                  strokeWeight: 5,
                  strokeColor: '#0091ff',
                  lineJoin: 'round'
                })
                let passedLine = new AMap.Polyline({
                  // path: path,
                  isOutline: true,
                  outlineColor: '#ffeeee',
                  borderWeight: 2,
                  strokeWeight: 5,
                  strokeColor: '#ff9900',
                  lineJoin: 'round'
                })
                // let infoWindow = new AMap.InfoWindow({
                //   infoTitle: '<strong>标题</strong>',
                //   infoBody: '点击开始动画可进行播放',
                //   // 基点指向marker的头部位置
                //   offset: new AMap.Pixel(0, -31)
                // })
                // infoWindow.open(that.map, that.carMarker.getPosition())
                that.carMarker.on('click', function (e) {
                  // infoWindow.open(that.map, that.carMarker.getPosition())
                })
                that.carMarker.on('moving', function (e) {
                  // let len = e.passedPath.length
                  // let rate = 20
                  // let location = e.passedPath[len - 1]
                  // let lll = new AMap.LngLat(location.lng, location.lat)

                  // infoWindow.setContent('<div>经度：' + location.lng + '<br>纬度：' + location.lat + '<br>速度：' + rate + ' km/h</div>')
                  // infoWindow.setPosition(lll)
                  passedLine.setPath(e.passedPath)
                })
                routeLine.setMap(that.map)
                passedLine.setMap(that.map)
                // 调整视野达到最佳显示区域
                that.map.setFitView([ startMarker, endMarker, routeLine ])
                console.log('绘制驾车路线完成')
              }
            } else {
              console.log('获取驾车数据失败：' + result)
            }
          })
        })
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    parseRouteToPath (route) {
      let path = []
      for (let i = 0, l = route.steps.length; i < l; i++) {
        let step = route.steps[i]
        for (let j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
      }
      return path
    }
  },
  mounted () {
    this.drawPloy()
  }
}
</script>

<style lang="scss" scoped>
img{
-webkit-backface-visibility: hidden;
-webkit-transform-style: preserve-3d;
}
.wrapmap{
  width: 100%;
  height: 100%;
}
#amap{
  width: 100%;
  height: 80%;
}
</style>
