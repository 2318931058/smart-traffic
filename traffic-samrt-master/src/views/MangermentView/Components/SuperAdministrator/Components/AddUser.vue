<template>
  <el-dialog v-model="showAdd" title="添加账户" width="400px">
    <!-- 权限 -->
    用户权限：
    <el-select
      v-model="selectType"
      placeholder="Select"
      style="width: 220px; margin-bottom: 10px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      /> </el-select
    ><br />
    <!-- 用户名 -->
    用户名称：
    <el-input
      v-model="inputName"
      style="width: 220px; margin-bottom: 10px"
      @keyup="checkoutUser(inputName, $event)"
    /><br />
    登录密码：<el-input
      v-model="inputCode"
      type="password"
      show-password
      style="width: 220px; margin-bottom: 10px"
      @keyup="checkoutPw(inputCode, $event)"
    /><br />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="Adduser">添加</el-button>
        <el-button type="primary" @click="closeAdd">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { checkoutUser, checkoutPw } from "../../../../../utils/checkData";
import {HomeHttp} from '../../../../../Http/HomeHttp'
let showAdd = ref(false);
let openAdd = () => {
  showAdd.value = true;
};
let closeAdd = () => {
  showAdd.value = false;
  selectType.value=''
  inputName.value=''
  inputCode.value=''
};
defineExpose({
  openAdd,
});

const selectType = ref("");
const inputName = ref("");
const inputCode = ref("");

const options = [
  {
    value: "common",
    label: "common",
  },
  {
    value: "traffic",
    label: "traffic",
  },
];
// 向父组件传递selectedType
const $emit=defineEmits(['typeToAdd'])
// 添加用户
const Adduser=()=>{
  if(selectType.value){
    if(checkoutUser(inputName.value)&&checkoutPw(inputCode.value)){
      registe(selectType.value,inputName.value,inputCode.value)
    }else{
      ElMessage({
        message: '请检查账号密码',
        duration: 2000,
        type: "warning",
        offset: 80,
      });
    }
  }else{
    ElMessage({
        message: '请输入用户类型',
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
}
async function registe(type,username,password) {
  let res = await HomeHttp.registerHttp(
    type,
    username,
    password
  );
  if(res.data.code==400){
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }else{
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "success",
        offset: 80,
      });
    $emit('typeToAdd',type)
  }
}
</script>

<style lang="scss" scoped>
</style>