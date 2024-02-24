<template>
  <div class="app">
    <div class="content">
      <div class="center">
        <box-map></box-map>
        <!-- <carousel-map></carousel-map> -->
        <!-- 地图控件 -->
        <map-control></map-control>
        <!-- 底图切换 -->
        <!-- <basemap-switch></basemap-switch> -->
        <!-- 目录树 -->
        <div class="tree">
          <layer-catalog></layer-catalog>
        </div>
          <!-- 轮播图 -->
        <carousel-map></carousel-map>
      </div>
      <div class="left">
        <!-- 车流量 -->
        <road-flow-rate></road-flow-rate>
        <!-- 事件统计 -->
        <event-statistics></event-statistics>
      </div>
      <div class="right">
        <post-notification></post-notification>
        <!-- 事件发生频率 -->
        <event-frequency></event-frequency>
      </div>
      <div class="top">
        <manger-top-info 
        @openMangementRoad="handleOpenRoadLegend"
        @closeMangementRoad="handleCloseRoadLegend"
        @openCheckEventList="handleOpenCheck"
        ></manger-top-info>
      </div>
        <road-monitoring-legend v-if="roadLegend"></road-monitoring-legend>
        <mangerment-check-event-list v-if="checkEventList" 
        @closeCheckEventList="handleCloseCheck">
        
      </mangerment-check-event-list>
      <!-- 事件更新 -->
      <update-event></update-event>
      <!-- 事件查询 -->
      <box-search-event></box-search-event>
      <!-- 最近点分析 -->
      <shortest-path></shortest-path>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import MangerTopInfo from "./Components/MangerTopInfo.vue";
import PostNotification from "./Components/PostNotification.vue";
import CarouselMap from "./Components/CarouselMap.vue";
import RoadFlowRate from "./Components/VisualizationScreen/RoadFlowRate.vue";
import EventStatistics from "./Components/VisualizationScreen/EventStatistic.vue";
import EventFrequency from "./Components/VisualizationScreen/EventFrequency.vue";
// 路况的图例
import RoadMonitoringLegend from "../MangermentView/Components/RoadMonitoringLegend.vue";
// 交管检查上报的事件
import MangermentCheckEventList from "../MangermentView/Components/MangermentCheckEventList.vue";
// 目录树
import LayerCatalog from "./Components/LayerCatalog.vue";
// 地图控件
import MapControl from "../../Components/MapControl.vue";
// 底图切换
import BasemapSwitch from "../../Components/BasemapSwitch.vue";
import UpdateEvent from "./Components/UpdateEvent.vue";
import BoxSearchEvent from "./Components/BoxSearchEvent.vue";
/* 最近点 */
import ShortestPath from "./Components/ShortestPath.vue";

// 打开图例
const roadLegend=ref(false)
const checkEventList=ref(false)
const handleOpenRoadLegend = (legend) => {
  roadLegend.value=legend
}
// 关闭图例
const handleCloseRoadLegend = (legend) => {
  roadLegend.value=legend
}
// 打开审核事件列表
const handleOpenCheck= (eventList) => {
  checkEventList.value=eventList
}
// 关闭审核列表
const handleCloseCheck= (eventList) => {
  checkEventList.value=eventList
}
</script>
<style scoped>
/* * {
  margin: 0;
  padding: 0;
} */

.app {
  width: 100vw;
  height: 100vh;
  /* overflow-x: hidden; */
}
.left {
  position: absolute;
}

.content {
  display: flex;
  width: 100vw;
  gap: 6px;
  background: url("../../img/map_bg.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 70px;
}
.top{
  position:absolute;
  top:0;
}
.center {
  width: 55vw;
  height: 101vh;
  display: flex;
  gap: 6px;
  margin-left: 320px;
  flex-direction: column;
}
.top {
  position: absolute;
  top: 0;
  left: 0;
}
/* 目录树 */
.tree {
  position: absolute;
  right: 365px;
  top: 250px;
}
</style>
