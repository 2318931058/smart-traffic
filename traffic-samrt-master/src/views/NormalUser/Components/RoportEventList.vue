<template>
    <div class="table">
        <div class="table-title">
            <h2>上报事件</h2>
            <el-button color="#626aef"  size="small" @click="closeEventList">关闭</el-button>
        </div>
        <el-table :data="newData" stripe style="width: 100% "  
        >
            <el-table-column prop="username" label="用户名" width="80"  style="height: 10px;"/>
            <el-table-column prop="load_type" label="事件类型" />
            <el-table-column prop="load_addr" label="发生地点" />
            <el-table-column prop="load_mark" label="标志建筑物" width="100"/>
            <el-table-column prop="load_time" :sortable="true"  label="发生时间" width="170"/>
            <el-table-column prop="load_info" label="描述" width="140"/>
            <el-table-column prop="status" label="状态" width="80"/>
        </el-table>
        <el-pagination background layout="prev, pager, next"  
            :page-size="5"
            :total="tableData.length"
             @current-change="changePage"
         />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import {LoadHttp} from "../../../Http/LoadHttp";

const tableData = ref([]); // 将初始值设置为一个空数组
const newData = ref([]);
onMounted(async()=>{
   let{data} =await LoadHttp.getAllLoadHttp()
   tableData.value=data.result
   newData.value=tableData.value.slice(0,5)
})
const $emit = defineEmits(["closeCheckEventList"])
const closeEventList=(listshow)=>{
    listshow=false
    $emit("closeCheckEventList",listshow)
}
const changePage = (evt) => {
    let page =(evt-1)*5

    newData.value=tableData.value.slice(page,page+5)
    
}
// 

</script>

<style  scoped>
.table{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750px;
    height: 350px;
    position: fixed;
    background: #fff;
    top: 20%;
    left: 10%;
    border-radius: 5px;
}
.table-title{
    display: flex ;
    width: 95%;
    justify-content: space-around;
    align-items:center ;
    margin-top:10px ;
    gap:15px;
    position: relative;
}

.el-button{
    position:absolute;
    right: 10px;
}
.el-pagination{
    margin-top:15px ;
}
</style>