<template>
  <div>
    <div class="header">
      <div class="tittle">
        <h1>智慧交通</h1>
        <div class="date" ref="time"></div>
      </div>
      <div class="tools">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#0f1b3d"
          text-color="#fff"
          text-size="10"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-sub-menu index="1">
            <template #title>路况信息</template>
            <el-menu-item index="1-1" @click="openMangerRoad">开启实时路况检测</el-menu-item>
            <el-menu-item index="1-2" @click="closeMangerRoad">关闭实时路况检测</el-menu-item>
            <el-menu-item index="1-3" @click="mangermentCheckEvent">审核上报路况</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>工具箱</template>
            <el-menu-item index="2-1" @click="openMeasure">开启测量</el-menu-item>
            <el-menu-item index="2-2" @click="closeMeasure">关闭测量</el-menu-item>
            <el-menu-item index="2-3" @click="download">导出图片</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>视频监控</template>
            <el-menu-item index="4-1" @click="openVideo">开启视频监控</el-menu-item>
            <el-menu-item index="4-2" @click="closeVideo">关闭视频监控</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>事件管理</template>
            <el-menu-item index="5-1" @click="openBoxSearch">开启拉框查询</el-menu-item>
            <el-menu-item index="5-2" @click="closeBoxSearch">关闭拉框查询</el-menu-item>
            <el-menu-item index="5-3" @click="handleAddEvent">事件添加</el-menu-item>
            <el-menu-item index="5-4">事件更新</el-menu-item>
            <el-menu-item index="5-5" @click="handleShortPath">最近点分析</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="search">
        <search-event></search-event>
      </div>
      <div class="user-info">
        <div class="user-name">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown split-button type="primary" size="small" trigger="click">
            {{ username }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openModify"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="username == 'admin'"
                  @click="ManagementUser"
                  trigger="click"
                  >管理用户</el-dropdown-item
                >
                <el-dropdown-item @click="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <user-management :isShow="isShowManage" @close="close"></user-management>
        </div>
      </div>
    </div>
  </div>
  <div id="popup"></div>
  <modify-password :isShow="isShowModify" :user="username" @close="close" :usertype="usertype"></modify-password>
</template>

<script setup>
import { ArrowDown, Management } from "@element-plus/icons-vue";
import { useTimeHook } from "../../../Hooks/useTimeHook";
import mapboxgl from "mapbox-gl";
import { HomeHttp } from "../../../Http/HomeHttp";
import UserManagement from '../Components/SuperAdministrator/UserManagement.vue'
import ModifyPassword from "../../../Components/ModifyPassword.vue";
import SearchEvent from "../../../Components/SearchEvent.vue";
let $map = null;
// 导出图片
var img = new Image();
import html2canvas from 'html2canvas';
onMounted(() => {
  $map = inject("$map");
  });
  const download = () => {
  const mapContainer = document.getElementById('map');
  $map.on('style.load', () => {
    html2canvas(mapContainer).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'map.png';
      link.click();
    });
  });
};

/* 事件拉框 */
import useEventSearchHook from '../Hooks/useEventSearchHook.js'
let {openBoxSearch,closeBoxSearch} = useEventSearchHook()

/* 事件添加 */
import useAddEventHook from '../Hooks/useAddEventHook.js'
let {addEvent,closeAddEvent} = useAddEventHook()
let isToggle = ref(false)
const handleAddEvent = ()=>{
  isToggle.value = !isToggle.value
  if(isToggle.value){
    addEvent()
  }else{
    closeAddEvent()
  }
}

/* 事件更新 */
import {useUpdateEventHook} from '../Hooks/useUpdateEventHook.js'
let {updateEvent} = useUpdateEventHook()

/* 测量 */
import useMeasureHook from '../Hooks/useMeasureHook.js'
let {openMeasure,closeMeasure} = useMeasureHook()

/* 最短路径 */
import useShortPathHook from '../Hooks/useShortPathHook.js'
let {handleShortPath} = useShortPathHook()


const { time } = useTimeHook();
const $router = useRouter();
// 获取登录用户名
const $route = useRoute();
let username = $route.query.user;
const usertype='manager'
let isShowManage=ref(false)
// 打开管理用户界面
const ManagementUser = () => {
  isShowManage.value=true
};
// 关闭界面
const close=(value)=>{
  // 关闭管理用户界面
    if(isShowManage.value){
        isShowManage.value=false
    }
    // 关闭修改密码界面
    if(isShowModify.value){
      isShowModify.value=false
    }
  // 修改密码成功后退出登录
  if (value) {
    ElMessage({
      message: "修改成功",
      duration: 2000,
      type: "success",
      offset: 80,
    });
    exit();
  }
}
const activeIndex = ref("1");
// 打开视频监控
const openVideo = () => {
  ElMessage({
    message: "视频监控开启",
    type: "success",
    duration: 2000,
    offset: 80,
  });

  const camera_features = $map.queryRenderedFeatures({ layers: ['camera-layer'] });
  camera_features.forEach(item => {
    const coordinates = item.geometry.coordinates; // 获取点的坐标
    const element = document.createElement("div");
    element.className = "custom-marker"; // 添加自定义样式类名
    element.innerHTML = '<img src="src/img/camera-pic.png"  width="18" height="18";>'
    let popup = new mapboxgl.Popup({
      closeButton: true,
    }).setHTML(
      `<div >
         <div class="popupbox"><span>摄像头编号:</span>${item.properties.编号}</div>
            <div class="popupbox">摄像头位置:${item.properties.位置}</div>
              <video width="200" height="100" controls autoplay>
                <source src="src/video/video.mp4" type="video/mp4">
              </video>
        </div> `
    )
    const marker = new mapboxgl.Marker({
      element: element
    }).setLngLat(coordinates)// 设置标注的坐标
      .setPopup(popup)
    marker.addTo($map); // 将标注添加到地图

  })
};
// 关闭视频监控
const closeVideo = () => {
  // 获取地图上的所有标注
  const markersList = document.querySelectorAll('.mapboxgl-marker');
  if(markersList.length>0){  
        // 遍历并移除每个标注
      markersList.forEach((marker) => {
        marker.remove();
      });
      ElMessage({
        message: "视频监控关闭",
        type: "warning",
        duration: 2000,
        offset: 80,
      });
  }
}
// 显示修改密码弹窗
let isShowModify=ref(false)
const openModify=()=>{
  isShowModify.value=true
}
const handleSelect = (key) => {
  // 路况的函数   function(key){  if(key==='1-1'){}    }
  // 工具箱的函数
  // 地图切换
  if(key==='3-1'){
    $map.setStyle(`mapbox://styles/mapbox/streets-v11`);
  }else if(key==='3-2'){
    $map.setStyle(`mapbox://styles/mapbox/satellite-v9`);
  }else if(key==='5-4'){
    updateEvent()
  }
};
async function exit() {
  if(username!='admin'){
    let res = await HomeHttp.logoutHttp("traffic", username);
  }else{
    let res = await HomeHttp.logoutHttp("admin", username);
  }
  localStorage.removeItem("token");
  $router.back()
}
// 打开道路检测功能
const $emit = defineEmits(["openMangementRoad", "closeMangementRoad","openCheckEventList"]);
const openMangerRoad = (legend) => {
  ElMessage({
    message: '打开路况检测',
    duration: 2000,
    type: 'success',
    offset: 80,
  })
  // 获取图层
  $map.setPaintProperty('road-layer', "line-width", 5);
  $map.setPaintProperty('road-layer', 'line-color', [
    'interpolate',
    ['linear'],
    ['get', '车流量'],
    1000, 'green',
    1500, 'yellow',
    2000, 'red',
  ]);
  legend = true
  $emit('openMangementRoad', legend)
}
// 关闭道路检测
const closeMangerRoad = (legend) => {
  // 获取图层
  $map.setPaintProperty('road-layer', "line-width", 3);
  $map.setPaintProperty('road-layer', 'line-color', "#41fc9d");
  legend = false
  $emit('closeMangementRoad', legend)
  ElMessage({
    message: '关闭路况监测',
    duration: 2000,
    type: 'warning',
    offset: 80,
  })
}
// 交管查看上报事件
const mangermentCheckEvent = (envtList) => {
  envtList=true
  $emit("openCheckEventList",envtList)
}
</script>

<style  scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 70px;
  background: #0f1b3d;
}

.tittle {
  width: 200px;
  height: 60px;
  margin-left: 15px;
}
.search {
  margin-left: -50px;
}

.header h1 {
  color: #fff;
}

.date {
  font-size: 14px;
  color: #fff;
}

.user-info {
  display: flex;
  width: 200px;
  gap: 30px;
  align-items: center;
}

.user-info img {
  width: 20px;
  height: 20px;
}

.user-name {
  height: 35px;
  width: 250px;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

.el-avatar {
  width: 19%;
  height: 100%;
  border-radius: 100%;
  cursor: pointer;
}

.el-avatar > img {
  display: block;
  width: 100%;
  height: 100%;
}

.tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 55px;
  width: 680px;
  gap: 70px;
  background: #0f1b3d;
}

.el-menu {
  width: 55vw;
  height: 70px;
  background: #0f1b3d;
  border-bottom: none;
}
.el-sub-menu__title {
  background: #0f1b3d;
}
#popup {
  width: 150px;
  height: 20px;
  background: #fff;
  position: fixed;
  text-align: center;
  top: 20px;
  right: 50px;
  z-index: 1000;
  display: none;
}
</style>