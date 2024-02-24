<template>
  <div class="traffic-notice">
    <h2>事件统计</h2>
    <el-radio-group v-model="radio" @change="handleRadio">
      <el-radio-button label="类型"></el-radio-button>
      <el-radio-button label="地点"></el-radio-button>
    </el-radio-group>
    <div class="pie-chart">
      <v-chart :option="pieChartOption" />
    </div>
  </div>
</template>

<script setup>
import { EventHttp } from "../../../../Http/EventHttp";
let radio = ref("类型");
// 0. 获取pinia中的数据
import { useEventStore } from "../../../../stores/eventStore.js";
import { storeToRefs } from "pinia";
const EventStore = useEventStore();
const { totalEventList,eventList } = storeToRefs(EventStore);
let type_data = ref([]);
let location_data = ref([]);
watchEffect(() => {
  if(totalEventList.value.length){
    handleConverse(totalEventList.value)
  }
  if(eventList.value.length){
    handleConverse(eventList.value)
  }
});


const handleConverse = (value)=>{
  console.log(11);
  if (value.length) {
    // 事件类型
    let shiHuo = value.filter(
      (item) => item.event_type == "失火"
    );
    let guaCa = value.filter(
      (item) => item.event_type == "刮擦"
    );
    let pengZhuang = value.filter(
      (item) => item.event_type == "碰撞"
    );
    let fanChe = value.filter(
      (item) => item.event_type == "翻车"
    );
    let nianYa = value.filter(
      (item) => item.event_type == "碾压"
    );
    let qiTa = value.filter((item) => item.event_type == "其他");
    type_data.value = [
      { value: shiHuo.length, name: "失火" },
      { value: guaCa.length, name: "刮擦" },
      { value: pengZhuang.length, name: "碰撞" },
      { value: fanChe.length, name: "翻车" },
      { value: nianYa.length, name: "碾压" },
      { value: qiTa.length, name: "其他" },
    ];
    // 事故地点
    let lsRoad = value.filter(
      (item) => item.event_place == "珞狮路"
    );
    let lyRoad = value.filter(
      (item) => item.event_place == "珞瑜路"
    );
    let lxRoad = value.filter(
      (item) => item.event_place == "珞雄路"
    );
    let hqRoad = value.filter(
      (item) => item.event_place == "虎泉街"
    );
    let nsRoad = value.filter(
      (item) => item.event_place == "南山环"
    );
    let ggRoad = value.filter(
      (item) => item.event_place == "光谷大道"
    );
    let mzRoad = value.filter(
      (item) => item.event_place == "民族大道"
    );
    let gsRoad = value.filter(
      (item) => item.event_place == "关山大道"
    );
    let nhRoad = value.filter(
      (item) => item.event_place == "南湖大道"
    );
    let xcRoad = value.filter(
      (item) => item.event_place == "雄楚大道"
    );
    let ggSquare = value.filter(
      (item) => item.event_place == "光谷广场"
    );
    let otherRoad = value.filter(
      (item) => item.event_place.length > 4 || item.event_place == ""
    );
    location_data.value = [
      { value: lsRoad.length, name: "珞狮路" },
      { value: lyRoad.length, name: "珞瑜路" },
      { value: lxRoad.length, name: "珞雄路" },
      { value: hqRoad.length, name: "虎泉街" },
      { value: nsRoad.length, name: "南山环" },
      { value: ggRoad.length, name: "光谷大道" },
      { value: mzRoad.length, name: "民族大道" },
      { value: gsRoad.length, name: "关山大道" },
      { value: nhRoad.length, name: "南湖大道" },
      { value: xcRoad.length, name: "雄楚大道" },
      { value: ggSquare.length, name: "光谷广场" },
      { value: otherRoad.length, name: "其它" },
    ];
    renderPieChart(type_data.value);
  }
}

let pieChartOption = ref(null);
let handleRadio = (label) => {
  // 切换label值的时候重新渲染表格
  if (label == "类型") {
    renderPieChart(type_data.value);
  } else {
    renderPieChart(location_data.value);
  }
};
// 方法
const renderPieChart = (data) => {
  let totalSale = data.reduce((prev, cur) => prev + cur.value, 0);
  pieChartOption.value = {
    title: [
      {
        text: "事件总数",
        subtext: totalSale,
        x: "40%",
        y: "45%",
        textAlign: "center",
        textStyle: {
          fontSize: 14,
          color: "#999",
        },
        subtextStyle: {
          fontSize: 28,
          color: "#eee",
        },
      },
    ],
    tooltip: {
      position: "right",
    },
    legend: {
      type: "scroll",
      right: "5%",
      top: "10%",
      orient: "vertical",
      textStyle: {
        color: "#888",
      },
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "60%"],
        center: ["41%", "50%"],
        label: {
          show: false,
        },
        itemStyle: {
          borderWidth: 8,
          borderColor: "#060f2b",
        },
        data,
      },
    ],
  };
};
</script>

<style scoped>
.traffic-notice {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 320px;
  height: 450px;
  margin-top: 5px;
  color: #fff;
  position: relative;
  border: 1.5px solid rgba(6, 249, 176, 0.708);
  background: url("../../../../img/line.png") rgba(15, 9, 9, 0.03);
  padding: 5px;
}

.el-card {
  height: 800px;
  position: relative;
}

.el-radio-group {
  position: absolute;
  left: 5%;
  top: 16%;
  z-index: 10;
}

.pie-chart {
  height: 300px;
  width: 350px;
  margin-left: -30px;
  margin-top: 42px;
}
</style>
