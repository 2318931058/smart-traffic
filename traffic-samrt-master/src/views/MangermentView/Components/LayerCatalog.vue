<template>
  <div class="catalog">
    <div class="tree">图层目录树</div>
    <div class="dir">
      <input type="checkbox" value="residential-layer" checked />居民区
      <br />
      <input type="checkbox" value="road-layer" checked />光谷道路
      <br />
      <input type="checkbox" value="event-layer" checked />事件
      <br />
      <input type="checkbox" value="camera-layer" checked />摄像头
      <br />
      <input type="checkbox" value="police-layer" checked />警务室
      <br />
    </div>
  </div>
</template>

<script setup>
import $ from "jquery";
onMounted(() => {
  let $map = inject("$map");
  $map.on("style.load", () => {
    //   控制地图文档图层的显示与隐层
    $(".dir input").change(function (evt) {
      var checked = evt.target.checked;
      function toggleLayer(layerId) {
        // var visibility = $map.getLayoutProperty(layerId, "visibility");
        if (checked == false) {
          $map.setLayoutProperty(layerId, "visibility", "none");
          checked = true;
        } else {
          $map.setLayoutProperty(layerId, "visibility", "visible");
          checked = false;
        }
      }
      var val = $(this).val();
      toggleLayer(`${val}`);
    });
  });
});
</script>

<style scoped>
.catalog {
  display: flex;
  margin-right: -80px;
  transition: margin-right 0.5s;
}
.tree {
  font-weight: bold;
  text-align: center;
  writing-mode: vertical-rl;
  margin-right: 5px;
}
.dir {
  opacity: 0;
  transition: opacity 1s;
}
.tree:hover .catalog {
  margin-right: 0;
  transition: margin-right 1s;
  cursor: pointer;
}
.tree:hover .dir {
  opacity: 1;
  transition: opacity 1s;
}
</style>