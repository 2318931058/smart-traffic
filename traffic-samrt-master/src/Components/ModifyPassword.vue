<template>
  <div class="modifypw" v-if="isShow">
    <div class="top">
      <h3>修改密码</h3>
    </div>
    <div class="userinfo">
      <div>
        用户名:
        <input
          ref="input"
          type="text"
          placeholder="请输入用户名..."
          v-model="username"
          @keyup="checkoutUser(username, $event)"
        />
        <p class="userM"></p>
      </div>
      <div>
        密码:
        <input
          type="password"
          placeholder="请输入密码..."
          v-model="password"
          @keyup="checkoutPw(password, $event)"
        />
        <p class="pwM"></p>
      </div>
      <div>
        确认密码:
        <input
          type="password"
          placeholder="请输入密码..."
          v-model="repassword"
          @keyup="checkEqual(password, repassword, $event)"
        />
        <p class="repeatM"></p>
      </div>
    </div>
    <div class="bottom">
      <button class="btn" @click="handleModify">确认修改</button>
      <button class="btn" @click="handleClose">取消</button>
    </div>
  </div>
</template>
    
    <script setup>
import { userStore, typeStore } from "../stores/userAndType";
import { storeToRefs } from "pinia";
import { HomeHttp } from "../Http/HomeHttp";
import { checkoutUser, checkoutPw, checkEqual } from "../utils/checkData";
import { watchEffect } from "vue";
const $userStore = userStore();
const $typeStore = typeStore();
const { username } = storeToRefs($userStore);
const { type } = storeToRefs($typeStore);
const password = ref("");
const repassword = ref("");
const $props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
  usertype:{
    type: String,
    required: false,
  },
});
const input = ref(null);
// 监听中台修改密码的账户名
watchEffect(() => {
  if ($props.user!==undefined&&input.value!==null) {
    input.value.readOnly = true;
    username.value=$props.user
    if($props.usertype=='manager'){
      if($props.user=='admin'){
        type.value='admin'
      }else{
        type.value='traffic'
      }
    }else{
      type.value=$props.usertype
  }
  }
});
// 关闭修改弹窗
let success=ref()
const $emit = defineEmits(["close"]);
function handleClose() {
  $emit("close",success.value);
}

const handleModify = () => {
  if (
    checkEqual(password.value, repassword.value) &&
    checkoutPw(password.value) &&
    checkoutUser(username.value)
  ) {
    if (type.value == "") {
      ElMessage({
        message: "请返回选择用户类型！",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
    } else if(localStorage.getItem('token')){
      modify(type.value, username.value, password.value);
    }else{
      localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNjk1NzIyMTAyLCJleHAiOjE2OTU4MDg1MDJ9.MMCalXGsJoj9VH-JaXpUKjFkdWJ0MQODLv9gmsreGB4')
      modify(type.value, username.value, password.value);
    }
  } else {
    ElMessage({
        message: "用户名或密码格式错误",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
};
async function modify(type, username, password) {
  let res = await HomeHttp.modifyHttp(type, username, password);
  if (res.data.code == 200) {
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "success",
        offset: 80,
      });
    success.value=1
    handleClose()
  } else {
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
}
</script>
    <style>
.modifypw {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  border-radius:10px;
  background: #f7f7f7;
}
.modifypw div {
  margin-bottom: 20px;
}

.modifypw .top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
}
.modifypw .userinfo {
  position: relative;
}
.modifypw .userinfo input {
  position: absolute;
  right: 10px;
  height: 20px;
}

.modifypw .btn {
  width: 80px;
  height: 30px;
}
.modifypw .bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 30px;
}
p {
  margin-top: 5px;
  position: absolute;
  right: 10px;
  color: red;
  font-size: 10px;
}
</style>