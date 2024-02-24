<template>
  <div class="app">
      <nomal-user-box-map ></nomal-user-box-map>
      <map-control></map-control>
      <road-monitoring v-if="show"></road-monitoring>
      <report-road-event v-if="eventFormshow" 
          @submitEvent="handelSubmitEvent"
          @closeEvent="handelCloseEvent" 
      ></report-road-event >
      <roport-event-list  v-if="eventListshow"
          @closeCheckEventList="closeEventList">
      </roport-event-list>
        <div class="content">
          <user-top-info 
            @openLegend="handelOpenLegend" 
            @closeLegend="handelCloseLegend"
            @openEvent="handelOpenEvent"
            @closeEvent="handelCloseEvent"
            @openCheckEventList="openEventList"
          >
          
          </user-top-info>
        </div>
   </div>
  
</template>

<script setup>
import UserTopInfo from "./Components/UserTopInfo.vue";
import NomalUserBoxMap from "./Components/NomalUserBoxMap.vue";
import RoadMonitoring from "./Components/RoadMonitoring.vue";
import ReportRoadEvent from "./Components/ReportRoadEvent.vue";
import RoportEventList from "./Components/RoportEventList.vue";
import MapControl from "../../Components/MapControl.vue";

import { ref } from "vue";

var show = ref(false)
var eventFormshow = ref(false)
var eventListshow=ref(false)
// 打开图例
const handelOpenLegend = (legend)=>{
  show.value=legend
}
// 关闭图例
const handelCloseLegend = (legend)=>{
  show.value=legend
}
// 打开表单
const handelOpenEvent = (eventForm)=>{
  eventFormshow.value=eventForm
}
// 取消提交，关闭表单
const handelCloseEvent = (eventForm)=>{
  eventFormshow.value=eventForm
}
// 提交表单信息后关闭表单
const handelSubmitEvent = (submit)=>{
  eventFormshow.value=submit
}
const openEventList = (listshow)=>{
      eventListshow.value=listshow
}
const closeEventList = (listshow)=>{
      eventListshow.value=listshow
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.content {
  position: fixed;
  top: 00px;
  left: 0;
}
#control {
  position: fixed;
  top: 770px;
  left: 350px;
}

::v-deep .mapboxgl-ctrl-top-left {
  left: 0;
  top: 90px;
}
::v-deep .mapboxgl-ctrl-top-right {
  right: 0;
  top: 90px;
}
.map-box ::v-deep .mapbox-gl-draw_ctrl-draw-btn{
  display: none;
}
</style>
