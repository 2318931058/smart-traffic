<template>
    <div class="search" v-if="eventListVisible">
        <el-dialog v-model="eventListVisible" title="事件查询" :modal="false" draggable>
            <template #header>
                <div class="my-header">
                    <el-button type="primary" @click="heatMap">热力图</el-button>
                </div>
            </template>
            <el-table :data="renderList" style="width: 100%"  @row-click="handleFlyTo">
                <el-table-column property="fid" label="序号" width="60" align="center" />
                <el-table-column property="event_id" label="事件编号" width="150" align="center" />
                <el-table-column property="event_type" label="事件类型" align="center" :filters="[
                        { text: '碰撞', value: '碰撞' },
                        { text: '失火', value: '失火' },
                        { text: '翻车', value: '翻车' },
                        { text: '刮擦', value: '刮擦' },
                        { text: '追尾', value: '追尾' },
                        { text: '其他', value: '其他' },
                    ]
                    " :filter-method="filterHandler" />
                <el-table-column property="event_level" label="事件等级" :filters="[
                        { text: '轻微事故', value: '轻微事故' },
                        { text: '一般事故', value: '一般事故' },
                        { text: '重大事故', value: '重大事故' },
                        { text: '特大事故', value: '特大事故' },
                    ]
                    " :filter-method="filterHandler" />
                <el-table-column property="event_time" label="发生时间" width="150" align="center" />
                <el-table-column property="event_place" label="发生地点" width="150" align="center" />
                <el-table-column property="driver_car" label="车牌号" align="center" width="100" />
                <el-table-column property="driver_name" label="驾驶员" align="center" width="100" />
                <el-table-column property="event_status" label="事件状态" align="center" width="100" :filters="[
                        { text: '待处理', value: '待处理' },
                        { text: '处理中', value: '处理中' },
                        { text: '已归档', value: '已归档' },
                    ]
                    " :filter-method="filterHandler" />
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-pagination background layout="prev, pager, next" :total="eventList.length" :page-size="8"
                        @current-change="togglePage" />
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { useEventStore } from '../../../stores/eventStore';
import { storeToRefs } from 'pinia';
let $eventStore = useEventStore()
let { eventListVisible, eventList, renderList } = storeToRefs($eventStore)
let $map
let data = {
    type: 'FeatureCollection',
    features: []
}
let feature = {
    type: 'Feature',
    geometry: {
        type: 'MultiPoint',
        coordinates: []
    }
}
onMounted(() => {
    $map = inject('$map')
    $map.on('style.load', () => {
        $map.addSource('heatMap-source', {
        type: 'geojson',
        data
    })
    $map.addLayer({
        id: 'heatMap-layer',
        source: 'heatMap-source',
        type: 'heatmap',
        paint: {
            'heatmap-opacity': 0.75,
            'heatmap-radius': 20,
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(0, 0, 255, 0)',
                0.2, 'rgb(0, 255, 0)',
                0.4, 'yellow',
                0.6, 'orange',
                0.8, 'red'
            ]
        }
    })
    })
   
})
/* 过滤 */
const filterHandler = (value, row, column) => {
    const property = column['property']
    return row[property] === value
}

const togglePage = (page) => {
    $eventStore.changeRenderList(eventList.value.slice((page - 1) * 8, page * 8))
}

let isToggle = false
let source
const heatMap = () => {
    eventList.value.forEach(item => {
        feature.geometry.coordinates.push(item.event_axis)
    })
    isToggle = !isToggle
    if (isToggle) {
        source = $map.getSource('heatMap-source')
        data.features.push(feature)
        source.setData(data)
    }
    else{
        data.features = []
        source.setData(data)
    }
}

const handleFlyTo = (row)=>{
    $map.flyTo({
        center:row.event_axis,
        zoom:13,
        pitch:20,
        speed:1
    })
}


</script>

<style lang="scss" scoped>
.search {
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

::v-deep .el-dialog__body {
    padding-bottom: 0;
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