<template>
  <div class="traffic-notice">
    <h2>道路实时车流量</h2>
    <v-chart :option="option" id="road-flow" ref="chart" />
  </div>
</template>

<script setup>
let data = []
let option = ref(null)
let chart = ref(null)
const itemColor = {
  "民族大道": '#00008b',
  "关山大道": '#f00',
  "光谷大道": '#ffde00',
  "雄楚大道": '#002a8f',
  "光谷广场环线": '#003580',
  "珞雄路": '#ed2939',
  "虎泉街": '#000',
  "珞瑜路": '#003897',
  "南三环": '#f93',
  "南湖大道": '#bc002d',
  '珞狮路': '#024fa2',
};
onMounted(() => {
  // 初始化数据
  for (let i = 0; i < 11; ++i) {
    data.push(Math.round(Math.random() * 200));
  }
  setTimeout(() => {
    run();
  }, 0);
  setInterval(() => {
    run();
  }, 3000);
})

const run = () => {
  for (let i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  chart.value.setOption({
    grid: {
      left: '22%',
      // right: '10%', 
    },
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: [
        "民族大道",
        "关山大道",
        "光谷大道",
        "雄楚大道",
        "光谷广场环线",
        "珞雄路",
        "虎泉街",
        "珞瑜路",
        "南三环",
        "南湖大道",
        "珞狮路",
      ],
      inverse: true,
      axisLabel: {
        fontSize: 10,

      },
      animationDuration: 300,
      animationDurationUpdate: 300,
      inverse: true,
      max: 10,
    },
    series: [
      {
        realtimeSort: true,
        // name: 'X',
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          color: function (params) {
            var colorList = ['#00008b', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#ffde00', 'skyblue', '#003897', '#bc002d', '#024fa2', '#f93'];
            return colorList[params.dataIndex];
          }
        },
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    // legend: {
    //   show: true
    // },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  });
}

</script>

<style  scoped>
.traffic-notice {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 320px;
  height: 400px;
  margin-top: 5px;
  color: #fff;
  position: relative;
  border: 1.5px solid rgba(6, 249, 176, 0.708);
  background: url("../../../../img/line.png") rgba(15, 9, 9, 0.03);
  padding: 5px;
}

#road-flow {
  height: 400px;
  margin: -40px 0px 0px 10px;
}
</style>