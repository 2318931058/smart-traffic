<template>
    <div class="shortPath" v-if="shortPathVisible">
        <el-dialog v-model="shortPathVisible" title="最近点分析" :modal="false" draggable>
            <el-table :data="renderList" style="width: 100%"  
            >
                <el-table-column property="properties.fid" label="序号" width="60" align="center" />
                <el-table-column property="properties.targetPlace" label="事件地址" width="150" align="center" />
                <el-table-column property="properties.place" label="警务室地址" align="center" />
                <el-table-column property="properties.name" label="警务室名称" align="center" />
                <el-table-column property="properties.person" label="警务室空闲人数"  width="130" align="center"/>
                <el-table-column property="properties.level" label="警务室级别" width="150" align="center" />
                <el-table-column property="properties.distanceToPoint" label="距离" width="150" align="center" />
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-pagination background layout="prev, pager, next" :total="short_list.length" :page-size="8"
                        @current-change="togglePage" />
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { useEventStore } from '../../../stores/eventStore';
import {PoliceHttp} from '../../../Http/PoliceHttp.js'
import { storeToRefs } from 'pinia';
import * as turf from "@turf/turf";
import { watchEffect } from 'vue';
let $eventStore = useEventStore()
let { totalEventList,shortPathVisible } = storeToRefs($eventStore)
let $map
let short_list = ref([])    //全部最近点数据
let renderList = ref([])    //用于渲染
onMounted(async() => {
    $map = inject('$map')
    handleShortPoint()
})
watch(totalEventList,val=>{  
    handleShortPoint()
},{deep:true})
const handleShortPoint = async()=>{
    short_list.value = []
    let police_res = await PoliceHttp.getAllPoliceHttp()
    let police_list = police_res.data.result
    let axis_list = []
    police_list.forEach(item=>{
        let axis = $map.project(item.axis)
        let police_point = turf.point([axis.x,axis.y])
        police_point.properties = {
            name:item.name,
            place:item.place,
            person:item.person,
            level:item.level
        }
        axis_list.push(police_point)
    })
    // console.log(axis_list);
    axis_list = turf.featureCollection(axis_list);
 
    totalEventList.value.forEach(item=>{
        let axis = $map.project(item.event_axis)
        let event_point = turf.point([axis.x,axis.y])
        var nearest = turf.nearestPoint(event_point, axis_list);
        nearest.properties.targetPlace = item.event_place
        nearest.properties.fid = item.fid
        // console.log(nearest);
        short_list.value.push(nearest)

    })
    // console.log(short_list);
    renderList.value = short_list.value.slice(0,8)
}
const togglePage = (page)=>{
    renderList.value = short_list.value.slice((page-1)*8,page*8)
}
watch(renderList,val=>{
    renderList.value = val.slice(0,8)
})
</script>

<style lang="scss" scoped>
.shortPath {
    position: fixed;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 1200px;
    height: 800px;
    z-index: 100;

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

::v-deep .el-dialog__body{
  padding-block: 5px;
}

::v-deep .cell {
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 使用省略号代替被隐藏的文本 */
}
</style>