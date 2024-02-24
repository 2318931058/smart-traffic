<template>
  <div class="login">
    <div class="top">
      <h3>登录</h3>
      <a href="#" @click="registe($event)" v-if="registeShow">注册用户</a>
    </div>
    <div class="userinfo">
      <div>
        用户名:
        <input
          type="text"
          placeholder="请输入用户名..."
          v-model="username"
          @keyup="checkoutUser(userName, $event)"
        />
      </div>
      <div>
        密码:
        <input
          type="password"
          placeholder="请输入密码..."
          v-model="password"
          @keyup="checkoutPw(password, $event)"
        />
        <p class="pw"></p>
      </div>
    </div>
    <div class="usertype" @change="handleTypeChange">
      <label>
        <input type="radio" name="type" value="common" />
        普通用户
      </label>
      <label>
        <input type="radio" name="type" value="traffic" />
        交管
      </label>
      <label>
        <input type="radio" name="type" value="admin" />
        管理员
      </label>
    </div>
    <div class="bottom">
      <button class="btn" @click="handleLogin">登录</button>
      <a href="" @click="modify($event)">忘记密码</a>
    </div>
  </div>
</template>

<script setup>
import { HomeHttp } from "../../../Http/HomeHttp";
import { useRouter } from "vue-router";
import { userStore, typeStore } from "../../../stores/userAndType";
import { storeToRefs } from "pinia";
import { checkoutUser, checkoutPw } from "../../../utils/checkData";
const $router = useRouter();
const $userStore = userStore();
const $typeStore = typeStore();
const { username } = storeToRefs($userStore);
const { type } = storeToRefs($typeStore);
let userName = ref(username);
const password = ref("");
const registeShow = ref(true);
const handleTypeChange = (evt) => {
  type.value = evt.target.value;
  if (type.value != "common") {
    registeShow.value = false;
  } else {
    registeShow.value = true;
  }
};
const handleLogin = () => {
  // 首先验证username与password合规
  if (checkoutUser(userName.value) && checkoutPw(password.value)) {
    if (type.value) {
      login(type.value, userName.value, password.value);
    } else {
      ElMessage({
        message: "请选择用户类型",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
    }
  } else {
    ElMessage({
        message: "账号或密码错误",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
};
// 登录
async function login(type, username, password) {
  try {
    let res = await HomeHttp.loginHttp(type, username, password);
    // console.log(res);
    if (res.data.code == 200) {
      // 验证成功存储token
      localStorage.setItem("token", res.data.token);
      // 跳转页面
      if (type == "common") {
        $router.push(`/${type}?user=${username}`);
      } else {
        $router.push(`/manager?user=${username}`);
      }
    }
  } catch (error) {
    ElMessage({
        message: "账号或密码错误",
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }
}
const $emit = defineEmits(["toggleisShow"]);
const registe = (event) => {
  event.preventDefault();
  $emit("toggleisShow", "registe");
};
const modify = (event) => {
  event.preventDefault();
  $emit("toggleisShow", "modify");
};
</script>
<style>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  border-radius:10px;
  background: #f7f7f7;
}
.login div {
  margin-bottom: 20px;
}

.login .top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
}
.login .userinfo {
  position: relative;
}
.login .userinfo input {
  position: absolute;
  right: 10px;
  height: 20px;
}

.login .btn {
  width: 100px;
  height: 30px;
}
.login .bottom {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
}
.login .bottom a {
  position: absolute;
  right: 0;
}
p {
  margin-top: 5px;
  position: absolute;
  right: 10px;
  color: red;
  font-size: 10px;
}
</style>