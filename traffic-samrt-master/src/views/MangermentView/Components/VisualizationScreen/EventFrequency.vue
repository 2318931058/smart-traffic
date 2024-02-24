<template>
  <div class="traffic-notice">
    <h2>事件发生频率</h2>
    <v-chart :option="option" id="event-frequency" />
  </div>
</template>

<script setup>
import { EventHttp } from "../../../../Http/EventHttp";
import { useEventStore } from "../../../../stores/eventStore.js";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";
const EventStore = useEventStore();
const { totalEventList,eventList } = storeToRefs(EventStore);
let sunday = ref([]);
let monday = ref([]);
let thesday = ref([]);
let wednesday = ref([]);
let thursday = ref([]);
let friday = ref([]);
let saturday = ref([]);
let evtNum = ref([]);
watchEffect(() => {
  if(totalEventList.value.length){
    handleConverse(totalEventList.value)
  }
  if(eventList.value.length){
    handleConverse(eventList.value)
  }
});

const handleConverse = (value)=>{
  if (value.length) {
    let sunday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 0) {
        return item;
      }
    });
    let monday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 1) {
        return item;
      }
    });
    let thesday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 2) {
        return item;
      }
    });
    let wednesday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 3) {
        return item;
      }
    });
    let thursday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 4) {
        return item;
      }
    });
    let friday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 5) {
        return item;
      }
    });
    let saturday = value.filter((item) => {
      if (new Date(item.event_time).getDay() == 6) {
        return item;
      }
    });
    evtNum.value = [
      sunday.length,
      monday.length,
      thesday.length,
      wednesday.length,
      thursday.length,
      friday.length,
      saturday.length,
    ];
    renderOption(evtNum.value);
  }
}
let option = ref(null);
const renderOption = (data) => {
  option.value = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "#eee",
            lineStyle: {
              color: "#5470c6",
              width: 3,
            },
          },
        },
      },
    ],
  };
};
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

#event-frequency {
  width: 300px;
}
</style>