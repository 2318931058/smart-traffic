<template>
 <div class="submitform" >
    
    <div class="title">
        <h3 >上报事件</h3>
    </div>
    <el-form >
        <el-form-item label="用户名:"  :required=true>
            <el-input  v-model="username" />
        </el-form-item>
        <el-form-item label="事件类型:" :required=true >
            <el-select  v-model="eventType " placeholder="事件类型" >
                <el-option label="刮擦" value="刮擦"  />
                <el-option label="碰撞" value="碰撞" />
                <el-option label="失火" value="失火" />
                <el-option label="追尾" value="追尾" />
                <el-option label="翻车" value="翻车" />
                <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="发生日期:" :required=true>
            <el-date-picker
                v-model="datetime"
                type="datetime"
                placeholder="Select date and time"
            />
        </el-form-item>
        <el-form-item label="发生地址:" :required=true >
            <el-input v-model="address" />
        </el-form-item>
        <el-form-item label="建筑物标识:" >
            <el-input v-model="marker" />
        </el-form-item>
        <el-form-item label="事件描述:" :required=true>
                <el-input class="textarea"
                    v-model="eventInfo"
                    maxlength="50"
                    placeholder="Please input"
                    show-word-limit
                    type="textarea"
                />
        </el-form-item>
        <el-form-item >
            <div class="btns">            
                <el-button text @click="submitform" class="submit">提交</el-button>
                <el-button @click="unsubmit">取消</el-button>
        </div>

        </el-form-item>
    </el-form>

 </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
import {LoadHttp } from "../../../Http/LoadHttp"
import { ElMessage } from "element-plus";
import dayjs from 'dayjs'
let $map = null
onMounted(() => {
  $map = inject('$map')
})
const username=ref('')
let eventType = ref(["刮擦" ,"碰撞","失火","追尾","翻车","其他"]);
const datetime = ref('')
const marker=ref('')
const eventInfo= ref('')
const address = ref('')
const pic=''
// 时间转换
watch(datetime,(newVal)=>{
    if(newVal){
        datetime.value = dayjs(newVal).format('YYYY-MM-DD HH:mm:ss')
    }
})
const $emit=defineEmits(['submitEvent','closeEvent'])
const submitform = (submit) => {
    if(username.value==''||eventInfo.value==''||datetime.value==''||address.value==''||marker.value==''){
        ElMessage.error('请将信息填写完整')
        submit=true
        return
    }
    submit=false
    $emit('submitEvent',submit)
    // 发送收集到数据
    LoadHttp.reportHttp(
        // 用户账号
        username.value,
        // 事件类型
        eventType.value,
        // 事件发生地点
        address.value,
        // 建筑物标识
        marker.value,
        // 事件发生时间
        datetime.value,
        // 事件描述
        eventInfo.value,
        // 
        pic,
    )

    ElMessage({
        message: '提交成功！',
        grouping: true,
        type: 'success',
        offset: 100,
  })

}


    
const unsubmit = (formshow) => {
    formshow=false
    $emit('closeEvent',formshow)
}
</script>

<style  scoped>
.submitform{
    width: 420px;
    height: 440px;
    background: #fff;
    position: fixed;
    top: 20%;
    left: 30%;
    border-radius: 5px;
}
.title{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 15px; ;
}
.el-form{
    display: flex;
    flex-direction:column ;
    justify-content: center;
    align-items:center;
    padding: 20px;
    margin-top:5px ;
}
.el-input{
    width: 220px;
    height: 30px;
}
.el-select {
    width: 220px;
    height: 30px;
}
.el-date-picker{
    width: 220px;
    height: 30px;
}
.textarea{
    width: 220px;
    height: 50px;
}
.upload-demo{
    width: 250px;
    height: 30px;
}
.btns{
    display: flex;
    gap:60px;
}
.submit{
    border:1px solid #409EFF;
}
.submit:hover{
    background: #ecf5ff;
}
.message-box{
    width: 200px;
    height: 100px;
}
</style>
