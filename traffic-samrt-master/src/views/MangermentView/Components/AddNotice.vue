<template>
  <div id="notice-box" v-if="isShow">
    <div class="container">
      <div class="card-header">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">公告信息</el-menu-item>
          <div class="close" @click="closePage">
            <el-icon><Close /></el-icon>
          </div>
        </el-menu>
      </div>
      <div class="tool">
        <el-input
          v-model="area"
          class="w-50 m-2"
          placeholder="搜索区域"
          :prefix-icon="Search"
          @keyup.enter="handleSearch"
        />
        <button @click="selectArea">选择区域</button><br />
      </div>
      <div class="table">
        <table class="table-style">
          <tr>
            <th>住宅名称</th>
            <th>联系电话</th>
          </tr>
          <tr v-for="item in list" :key="item.properties.ID">
            <td>{{ item.properties.name }}</td>
            <td>{{ item.properties.tel }}</td>
          </tr>
        </table>
      </div>
      <div class="notice">
        <span>公告内容：</span>
        <input type="textarea" v-model="noticeText" />
      </div>
      <div class="bottom">
        <button @click="onSubmit">立即发布</button>
        <button class="cancel" @click="closePage">取消</button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { Search, Close } from "@element-plus/icons-vue";
import { inject, onMounted, watchEffect } from "vue";
import $ from "jquery";
import * as turf from "@turf/turf";
import { ResidentHttp } from "../../../Http/ResidentHttp";
import { NoticeHttp } from "../../../Http/NoticeHttp";
import { List } from "echarts";
let $map = null;
let draw;
onMounted(() => {
  $map = inject("$map");
  draw = inject("$draw");
  getResidentList();
});
const areaList = ref([]);
const area = ref();
const noticeText = ref();
const $props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const list = ref([]);
// 搜索区域
const handleSearch = () => {
  if (area.value) {
    list.value = list.value.filter(
      (item) => item.properties.name == area.value
    );
  } else {
    allInfo();
  }
};
// 居民区数据列表
const getResidentList = () => {
  // 获取全部居民区
  allInfo();
};
async function allInfo() {
  let res = await ResidentHttp.getAllResidentHttp();
  list.value = res.data.result;
  areaList.value = list.value;
}
// 选择区域
const selectArea = () => {
  $("#notice-box").hide();
  $map.on("draw.create", handleDraw);
  draw.changeMode("draw_point");
};
const handleDraw = (e) => {
    // 获取坐标
    var position = e.features[0].geometry.coordinates;
    var point = turf.point(position);
    var buffered = turf.buffer(point, 0.3, { units: "miles" });
    let data = { type: "FeatureCollection", features: [buffered] };
    $map.addLayer({
      id: "bufferLayer",
      type: "fill",
      source: {
        type: "geojson",
        data,
      },
      paint: {
        "fill-color": "#ff2d51",
        "fill-opacity": 0.5,
      },
    });
    $map.on("style.load", () => {});
    var style = $map.getStyle();
    // 获取所有图层
    var layers = style.layers;
    layers.forEach((item) => {
      if (item.id == "bufferLayer") {
        item["paint"]["z-index"] = 1000;
      }
    });
    // 筛选缓冲区内的区民区数据
    let filterList = list.value.filter((item) => {
      if (turf.booleanContains(buffered, item) == true) {
        return item;
      }
    });
    list.value = filterList;
  closeDraw();
  // 清除画笔
  draw.delete(e.features[0].id)
};
// 发布服务
const onSubmit = () => {
  let nowTime = getCurrentDateTime();
  if (noticeText.value) {
    if (list.value.length < areaList.value.length) {
      issue("some", noticeText.value, nowTime);
    } else {
      issue("all", noticeText.value, nowTime);
    }
  } else {
    ElMessage({
      message: "公告内容不能为空",
      duration: 2000,
      type: "warning",
      offset: 80,
    });
  }
};
// 获取当前时间
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份从0开始，需要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
// 发布公告
async function issue(type, info, time) {
  let res = await NoticeHttp.addHttp(type, info, time);
  if (res.data.code == 200) {
    ElMessage({
      message: res.data.msg,
      duration: 2000,
      type: "success",
      offset: 80,
    });
    closePage();
  } else {
    ElMessage({
      message: res.data.msg,
      duration: 2000,
      type: "warning",
      offset: 80,
    });
  }
}
const closeDraw = () => {
  $("#notice-box").show();
};
/* 关闭页面逻辑 */
const $emit = defineEmits(["close"]);
const closePage = () => {
  $emit("close");
  // 移除缓冲区
  $map.removeLayer('bufferLayer')
  $map.off("draw.create", handleDraw);
};
</script>
<style lang="scss" scoped>
#notice-box {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  min-height: 400px;
  max-height: 800px;
  background: #fff;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
}
.tool {
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
button {
  height: 40px;
  background: #eee;
  border: 0;
  padding: 10px;
  box-sizing: border-box;
  margin-left: 5px;
  border-radius: 5px;
}
.el-input {
  width: 200px;
}
.table {
  padding: 20px 10px;
  overflow: auto;
  max-height: 200px;
}
// 表格样式
.table-style {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  width: 100px;
  text-align: center;
  padding: 5px 0px;
  border: 0.5px solid #bdbbbb;
  font-size: 14px;
}
.notice {
  display: flex;
  margin: 10px;
}
.notice span {
  width: 120px;
}
.notice input {
  width: 100%;
  height: 70px;
}
.bottom {
  display: flex;
  justify-content: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
.bottom button {
  background: #409eff;
  color: #fff;
}
.bottom .cancel {
  background: #eee;
  color: #333;
}
#notice-box {
  z-index: 1000;
}
</style>