<template>
  <el-dialog v-model="showModify" title="修改账户" width="400px">
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
      @keyup="checkoutUser(inputName,$event)"
    /><br />
    登录密码：
    <el-input
      v-model="inputCode"
      type="password"
      show-password
      style="width: 220px; margin-bottom: 10px"
      @keyup="checkoutPw(inputCode,$event)"
    /><br />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="modifyInfo">修改</el-button>
        <el-button type="primary" @click="closeModify">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,watchEffect } from "vue";
import { checkoutUser,checkoutPw } from "../../../../../utils/checkData";
import { HomeHttp } from "../../../../../Http/HomeHttp";
// 传入修改对象
const $props = defineProps({
  item: {
    type: Object,
    required: false,
  },
});
const id=ref()
// 监听修改对象变化
watchEffect(() => {
  if($props.item!=undefined){
    id.value=$props.item.id
    selectType.value=$props.item.type
    inputName.value=$props.item.username
    inputCode.value=$props.item.password
  }
});

let showModify = ref(false);
let openModify = () => {
  showModify.value = true;
};
let closeModify = () => {
  showModify.value = false;
  selectType.value=''
  inputName.value=''
  inputCode.value=''
};
defineExpose({
  openModify,
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
const $emit=defineEmits(['typeToModify'])
// 修改用户
const modifyInfo=()=>{
  if(selectType.value){
    if(checkoutUser(inputName.value)&&checkoutPw(inputCode.value)){
      modify(id.value,selectType.value,inputName.value,inputCode.value)
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
async function modify(id,type,username,password) {
  let res = await HomeHttp.patchHttp(
    id,
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
    $emit('typeToModify',type)
  }
}
</script>

<style lang="scss" scoped>
</style>