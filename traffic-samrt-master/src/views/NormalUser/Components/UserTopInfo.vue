<template>
  <div>
    <div class="header">
      <div class="tittle">
        <h1>智慧交通</h1>
        <div class="date" ref="time"></div>
      </div>
      <div class="tools">
        <el-menu
          :default-active="activeIndex2"
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
            <el-menu-item index="1-1" @click="openRoad">开启实时路况检测</el-menu-item>
            <el-menu-item index="1-2" @click="closeRoad">关闭实时路况检测</el-menu-item>
            <el-menu-item index="1-3" @click="reportRoad">上报事件</el-menu-item>
            <el-menu-item index="1-4" @click="reportProgress">查看上报进展</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>工具箱</template>
            <el-menu-item index="2-1" @click="openMeasure">开启测量</el-menu-item>
            <el-menu-item index="2-2" @click="closeMeasure">关闭测量</el-menu-item>
            <el-menu-item index="2-3" @click="download">导出图片</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <search-event></search-event>
      <div class="user-info">
        <div class="userevent">
          <div class="eventnumber">{{ unReadNum }}</div>
          <img src="../../../img/bell.png" @mouseover="showMessageBox" />
        </div>
        <div class="user-name">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown split-button type="primary" size="small">
            {{ username }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openModify"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item @click="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
  <div id="popup"></div>
  <modify-password
    :isShow="isShowModify"
    :user="username"
    @close="close"
    :usertype="usertype"
  ></modify-password>
  <message-box
    :isShow="isShowMessage"
    @close="close"
    @getunReadNum="getunReadNum"
    :user="username"
  ></message-box>
</template>

<script setup>
import { ArrowDown, Management, Search } from "@element-plus/icons-vue";
import { useTimeHook } from "../../../Hooks/useTimeHook";
import SearchEvent from "../../../Components/SearchEvent.vue";
import { onMounted } from "vue";
import { HomeHttp } from "../../../Http/HomeHttp";



import ModifyPassword from "../../../Components/ModifyPassword.vue";
import MessageBox from "../Components/MessageBox.vue";
import $ from "jquery";
// 获取登录用户名
const $router = useRouter();
const $route = useRoute();
let username = $route.query.user;
const usertype = "common";
const { time } = useTimeHook();
let $map = null;
onMounted(() => {
  $map = inject("$map");
  getunReadNum()
});

// 导出图片
var img = new Image();
import html2canvas from 'html2canvas';
onMounted(() => {
  $map = inject("$map");
  });
  const download = () => {
  const mapContainer = document.getElementById('map');
  $map.on('load', () => {
    html2canvas(mapContainer).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'map.png';
      link.click();
    });
  });
};
/* 测量 */
import useMeasureHook from "../Hooks/useMeasureHook.js";
let {openMeasure,closeMeasure} = useMeasureHook()




const activeIndex2 = ref("1");
const $emit = defineEmits([
  'openLegend',
  'closeLegend',
  'openEvent',
  'openCheckEventList'
])

const handleSelect = (key) => {
};
// 查看消息
let unReadNum = ref();
let isShowMessage = ref(false);
const showMessageBox = () => {
  isShowMessage.value = true;
};
// 获取未读消息数
const getunReadNum = (value) => {
  unReadNum.value = value;
};
//修改密码成功后退出登录
let isShowModify = ref(false);
const openModify = () => {
  isShowModify.value = true;
};
const close = (value) => {
  if (isShowModify.value) {
    isShowModify.value = false;
  }
  if (isShowMessage.value) {
    isShowMessage.value = false;
  }
  if (value) {
    ElMessage({
    message: "修改成功",
    duration: 2000,
    type: "success",
    offset: 80,
  });
    exit();
  }
};


const openRoad = (legend)=>{
  ElMessage({
    message: '打开路况检测',
    duration:2000,
    type: 'success',
    offset:80,
  })
  // 获取图层
  $map.setPaintProperty('road-layer',"line-width",5);
  $map.setPaintProperty('road-layer', 'line-color', [
    'interpolate',
    ['linear'],
    ['get', '车流量'],
    1000, 'green',
    1500, 'yellow',
    2000, 'red',
]); 
    legend=true
    $emit('openLegend', legend)
}
const closeRoad = (legend)=>{
  // 获取图层
  $map.setPaintProperty('road-layer',"line-width",3);
  $map.setPaintProperty('road-layer', 'line-color', "#41fc9d");
  legend=false
  $emit('closeLegend',legend)
  ElMessage({
    message: '关闭路况监测',
    duration:2000,
    type: 'warning',
    offset:80,
  })
}

const reportRoad=(eventForm)=>{
              eventForm=true
            $emit('openEvent',eventForm)
}
// 查看上报信息
const reportProgress=(listshow)=>{

    listshow=true
    $emit('openCheckEventList',listshow)
}

// 登出账号
async function exit(){
  let res=await HomeHttp.logoutHttp('common',username)
  localStorage.removeItem("token");
  $router.back()
}
</script>

<style scoped>
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
.el-input {
  margin-right: 5px;
  width: 200px;
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
  margin-right: 15px;
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
  width: 25%;
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
  align-items: center;
}

.el-menu {
  width: 35vw;
  height: 70px;

  border-bottom: none;
}

.el-input {
  flex-grow: 0;
}

.userevent {
  width: 25px;
  height: 50px;
  color: #fff;
  cursor: pointer;
}

.eventnumber {
  width: 15px;
  height: 15px;
  text-align: center;
  transform: translate(15px, 6px);
  font-size: 12px;
  border-radius: 100%;
  background: #f4511e;
}

.userevent img {
  width: 25px;
  height: 25px;
}
.draw-container {
  position: fixed;
  top: 100px; /* 距离顶部的距离 */
  left: 50px; /* 距离右侧的距离 */
  z-index: 1; /* 确保控制面板显示在地图上方 */
}
#popup {
  width: 150px;
  height: 20px;
  background: #fff;
  position: fixed;
  top: 20px;
  right: 50px;
  text-align: center;
  z-index: 1000;
  display: none;
}
</style>
