<template>
  <div class="registe" v-if="isShow">
    <div class="top">
      <h3>注册</h3>
    </div>
    <div class="userinfo">
      <div>
        用户名:
        <input
          type="text"
          placeholder="请输入用户名..."
          v-model="newuser"
          @keyup="checkoutUser(newuser, $event)"
        />
        <p class="userR"></p>
      </div>
      <div>
        密码:
        <input
          type="password"
          placeholder="请输入密码..."
          v-model="newpassword"
          @keyup="checkoutPw(newpassword, $event)"
        />
        <p class="pwR"></p>
      </div>
      <div>
        确认密码:
        <input
          type="password"
          placeholder="请输入密码..."
          v-model="repassword"
          @keyup="checkEqual(newpassword, repassword, $event)"
        />
        <p class="repeatR"></p>
      </div>
    </div>
    <div class="bottom">
      <button class="btn" @click="handleRegiste">确认注册</button>
      <button class="btn" @click="handleClose">返回登录</button>
    </div>
  </div>
</template>
  
  <script setup>
import { HomeHttp } from "../../../Http/HomeHttp";
import { checkoutUser, checkoutPw, checkEqual } from "../../../utils/checkData";
const newuser = ref("");
const newpassword = ref("");
const repassword = ref("");
const $props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const $emit = defineEmits(["close"]);
function handleClose() {
  $emit("close");
}

const handleRegiste = () => {
  if (
    checkEqual(newpassword.value, repassword.value) &&
    checkoutPw(newpassword.value) &&
    checkoutUser(newuser.value)
  ) {
    registe(newuser.value,newpassword.value);
  } else {
    ElMessage({
        message: "账号或密码错误",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
};
async function registe(user,password) {
  let res = await HomeHttp.registerHttp(
    "common",
    user,
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
        message: '账号注册成功',
        duration: 2000,
        type: "success",
        offset: 80,
      });
  }
}
</script>
  <style>
.registe {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  border-radius:10px;
  background: #f7f7f7;
  z-index: 1000;
}
.registe div {
  margin-bottom: 20px;
}

.registe .top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
}
.registe .userinfo {
  position: relative;
}
.registe .userinfo input {
  position: absolute;
  right: 10px;
  height: 20px;
}

.registe .btn {
  width: 80px;
  height: 30px;
}
.registe .bottom {
  display: flex;
  justify-content: space-around;
  padding-top: 30px;
}
</style>