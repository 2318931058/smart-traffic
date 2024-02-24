<template>
    <div class="table">
        <div class="table-title">
            <h2>上报事件</h2>
            <el-button class="close" color="#626aef" size="small" @click="closeEventList">关闭</el-button>
        </div>
        <div class="checkStatus">
            <el-button color="#409EFF" size="small" plain @click="checkUnhandledEvent">未处理</el-button>
            <el-button color="#626aef" size="small" plain @click="checkPassEvent">已处理</el-button>
        </div>
        <el-table :data="newData" stripe style="width: 100% " >
            <el-table-column prop="username" label="用户名" width="80" style="height: 10px;" />
            <el-table-column prop="load_type" label="事件类型" />
            <el-table-column prop="load_addr" label="发生地点" />
            <el-table-column prop="load_mark" label="标志建筑物" width="100" />
            <el-table-column prop="load_time" :sortable="true" label="发生时间" width="170" />
            <el-table-column prop="load_info" label="描述" width="140" />
            <el-table-column prop="status" label="状态" width="80" />
            <el-table-column prop="load_id" label="操作" width="60" fixed="right">
                <template #default="{ row }">
                    <el-button v-show="showButtons" color="#409EFF" plain size="small"
                        @click="passEvent((row.load_id))">通过</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="load_id" label="操作" width="60" fixed="right">
                <template #default="{ row }" >
                    <el-button v-show="showButtons" color="#F56C6C" plain size="small"
                        @click="ignoreEvent((row.load_id))">忽略</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" 
        :page-size="4" 
        :total="totalPage"
        @current-change="changePage" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { LoadHttp } from "../../../Http/LoadHttp";

const tableData = ref([]); // 将初始值设置为一个空数组
const newData = ref([]);
const passedEvents=ref([]);
const unPassedEvents=ref([]);
const eventStatus = ref('');
const isfixed=ref(false)
onMounted(async () => {
    let { data } = await LoadHttp.getAllLoadHttp()
    tableData.value = data.result
    newData.value = tableData.value.slice(0, 4)
})
const $emit = defineEmits(["closeCheckEventList"])
const closeEventList = (eventList) => {
    eventList = false
    $emit("closeCheckEventList", eventList)
}

let showButtons = ref(false); // 初始状态下显示按钮
const checkUnhandledEvent = () => {
    showButtons.value = true
    // 使用过滤函数过滤未通过的事件
    unPassedEvents.value = tableData.value.filter((event) => event.status === "未处理");
    // 更新 newData 数据以显示未通过的事件
    newData.value = unPassedEvents.value.slice(0, 4);
    eventStatus.value = "未处理"
    isfixed.value=true
}
const checkPassEvent = () => {
    showButtons.value = false
    // 使用过滤函数过滤已通过的事件
     passedEvents.value = tableData.value.filter((event) => event.status === "已处理");
    // 更新 newData 数据以显示已通过的事件
    newData.value = passedEvents.value.slice(0, 4);
    eventStatus.value = "已处理"
    isfixed.value=false
}

const passEvent = async (loadId) => {
    LoadHttp.handleHttp(loadId)
    // 模拟通过操作，实际应根据业务逻辑处理
    await simulatePassing(loadId)

    // 更新数据对象中相应任务的状态
    const index = newData.value.findIndex(task => task.load_id === loadId)
    if (index !== -1) {
        newData.value[index].status = '已处理'
    }

}
// 模拟通过操作
const simulatePassing = async (loadId) => {
    return new Promise((resolve) => {
        // 模拟异步操作
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}
const ignoreEvent = async (loadId) => {
        // 删除数据对象中相应的任务
        const index = newData.value.findIndex(task => task.load_id === loadId)
        if (index !== -1) {
            newData.value.splice(index, 1)
        }
}
const totalPage= computed(()=>{
    if (eventStatus.value === '未处理') {
    return unPassedEvents.value.length;
  } else if (eventStatus.value === '已处理') {
    return passedEvents.value.length;
  } else {
    return tableData.value.length; // 如果没有筛选条件，返回总数据个数
  }
})
const changePage = (evt) => {
    let page = (evt - 1) * 4
    if (eventStatus.value === '未处理') {
        newData.value = unPassedEvents.value.slice(page, page + 4)
    }
    if (eventStatus.value === '已处理') {
        newData.value = passedEvents.value.slice(page, page + 4)
    }

    if (eventStatus.value === '') {
        newData.value = tableData.value.slice(page, page + 4)
    }
}
</script>

<style  scoped>
.table {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 580px;
    height: 340px;
    position: fixed;
    background: #fff;
    top: 20%;
    left: 27%;
    border-radius: 5px;
    z-index: 1000;
    padding-inline: 10px;
}

.table-title {
    display: flex;
    width: 95%;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
    position: relative;
}

.close {
    position: absolute;
    right: 10px;
}

.el-pagination {
    margin-top: 15px;
}

.checkStatus {
    display: flex;
    gap: 0px;
    margin-left: 15px;
    align-self: start;
}
</style>