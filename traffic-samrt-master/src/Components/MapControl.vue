<template>
  <div class="mapControls">
    <div id="mouse-position"></div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl-controls/lib/controls.css";
import { RulerControl } from "mapbox-gl-controls";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
import { inject, onMounted, ref } from "vue";
import { app } from "../main";

onMounted(() => {
  const $map = inject("$map");
  // 全屏控件
  $map.addControl(new mapboxgl.FullscreenControl());

  // 导航控件
  const nav = new mapboxgl.NavigationControl({
    //是否显示指南针按钮，默认为true
    showCompass: true,
    //是否显示缩放按钮，默认为true
    showZoom: true,
  });
  //导航控件的位置包括'top-left', 'top-right','bottom-left' ,'bottom-right'四种，默认为'top-right'
  $map.addControl(nav, "top-left");

  // 属性控件
  $map.addControl(
    new mapboxgl.AttributionControl({
      //是否折叠属性信息
      compact: true,
      //自定义属性信息
      customAttribution: ["2304GIS开发特训营", "光谷智慧交通"],
    })
  );

  // 比例尺控件
  const scale = new mapboxgl.ScaleControl({
    unit: "metric|imperial", //默认为公里
  });
  $map.addControl(scale);

  // 鼠标坐标控件
  $map.on("mousemove", function (e) {
    const { lng, lat } = e.lngLat;
    document.getElementById("mouse-position").innerHTML = `
   经度:${lng.toFixed(2)},纬度:${lat.toFixed(2)}
  `;
  });

  // 底图切换控件
  $map.addControl(
    new MapboxStyleSwitcherControl([
      {
        title: "街道底图",
        uri: "mapbox://styles/mapbox/streets-v12",
      },
      {
        title: "户外底图",
        uri: "mapbox://styles/mapbox/outdoors-v12",
      },
      {
        title: "亮色底图",
        uri: "mapbox://styles/mapbox/light-v11",
      },
      {
        title: "暗色底图",
        uri: "mapbox://styles/mapbox/dark-v11",
      },
      {
        title: "卫星底图",
        uri: "mapbox://styles/mapbox/satellite-v9",
      },
      {
        title: "卫星街道混合底图",
        uri: "mapbox://styles/mapbox/satellite-streets-v12",
      },
      {
        title: "导航底图(白天)",
        uri: "mapbox://styles/mapbox/navigation-day-v1",
      },
      {
        title: "导航底图(晚上)",
        uri: "mapbox://styles/mapbox/navigation-night-v1",
      },
    ])
  );

  // 绘制与编辑控件
  let draw = new MapboxDraw({
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true,
    },
    displayControlsDefault: false,
  });
  $map.addControl(draw, "top-left");
  app.provide('$draw',draw)

  //   测距控件
  $map.addControl(
    new RulerControl({
      units: "miles",
      labelFormat: (n) => `${n.toFixed(2)} ml`,
    }),
    "top-right"
  );
});
</script>

<style scoped>
.mapControls {
  position: relative;
}

#mouse-position {
  position: absolute;
  left: 42%;
  top: -50px;
  width: 200px;
  text-align: center;
  z-index: 10;
  background-color: #eee;
  border: 1px solid blue;
}

</style>
