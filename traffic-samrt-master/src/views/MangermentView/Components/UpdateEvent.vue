<template>
  <div class="update" v-if="dialogTableVisible">
    <el-dialog v-model="dialogTableVisible" title="事件更新" :modal="false" draggable>
      <el-table :data="eventList">
        <el-table-column property="fid" label="序号" width="60" align="center" />
        <el-table-column property="event_id" label="事件编号" width="150" align="center" />
        <el-table-column property="event_type" label="事件类型" align="center" width="100"/>
        <el-table-column property="event_level" label="事件等级" width="100" />
        <el-table-column property="event_time" label="发生时间" width="150" align="center" />
        <el-table-column property="event_place" label="发生地点" width="100" align="center" />
        <el-table-column property="driver_car" label="车牌号" align="center" width="100" />
        <el-table-column property="driver_name" label="驾驶员" align="center" width="80" />
        <el-table-column property="event_status" label="处理状态">
          <template #default="{row}">
            <el-select v-model="row.event_status" placeholder="Select" @change="handleSelect(row.event_status,row.fid)">
            <el-option label="待处理" value="0"></el-option>
            <el-option label="处理中" value="1"></el-option>
            <el-option label="已归档" value="2"></el-option>
          </el-select>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-pagination background layout="prev, pager, next" :total="updateEvent.length" :page-size="8"
            @current-change="togglePage" />
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useEventStore } from "../../../stores/eventStore";
import { storeToRefs } from "pinia";
import { EventHttp } from "../../../Http/EventHttp";
import { ElMessage } from "element-plus";
const eventStore = useEventStore();
let { dialogTableVisible,totalEventList } = storeToRefs(eventStore);
let eventList = ref([]);

let updateEvent = ref([])
// const selectedValue =ref('')
let $map = null
onMounted(async() => {
  $map = inject('$map')
  let init_result = await EventHttp.getAllEventHttp()
  totalEventList.value= init_result.data.result
  updateEvent.value = totalEventList.value
  handleLevel()
  eventList.value = updateEvent.value.slice(0, 8)
});
const togglePage = (page) => {
  eventList.value = updateEvent.value.slice((page - 1) * 8, page * 8)
}
const handleLevel = ()=>{
  updateEvent.value.forEach(item => {
    if (item.event_level === '0') {
      item.event_level = '轻微事故'
    } else if (item.event_level === '1') {
      item.event_level = '一般事故'
    } else if (item.event_level === '2') {
      item.event_level = '重大事故'
    } else {
      item.event_level = '特大事故'
    }
    // selectedValue.value = item.event_status
  })
}
/* 更新事件状态 */
const handleSelect = async(status,fid)=>{
  await EventHttp.modifyHttp(fid,status)
  let all_res =  await EventHttp.getAllEventHttp()
  let allList = all_res.data.result
  let event = allList.find(item=>item.fid===fid)
  let sta = event.event_status
  let layer = 'draw-layer'+event.fid
  // let color = $map.getSource(layer,'circle-color')
  if(sta==='0'){
    $map.setPaintProperty(layer,'circle-color','red')
  }else if(sta==='1'){
    $map.setPaintProperty(layer,'circle-color','yellow')
  }else{
    $map.setPaintProperty(layer,'circle-color','green')
  }
  totalEventList.value = allList
  ElMessage.success({
    message:'事件更新成功',
    duration:2000
  })

}
watch(dialogTableVisible, val => {
  if (val) {
    eventList.value = totalEventList.value.slice(0, 8)
  }
})
watchEffect(()=>{
 if( totalEventList.value.length>54){
  updateEvent.value = totalEventList.value
  handleLevel()
 }
})

</script>

<style lang="scss" scoped>
.update {
  position: fixed;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 800px;
  z-index: 100;
  // display: none;
  // overflow: hidden;
}

::v-deep .el-dialog {
  width: 1000px;
}

::v-deep .el-overlay-dialog {
  overflow: hidden;
}

::v-deep .el-dialog__footer {
  display: flex;
  justify-content: center;
}
::v-deep .cell {
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 使用省略号代替被隐藏的文本 */
}
::v-deep .el-dialog__body{
  padding-block: 5px;
}
</style>
