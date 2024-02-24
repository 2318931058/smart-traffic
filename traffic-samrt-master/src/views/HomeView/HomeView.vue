<template>
  <div class="video-container">
    <video autoplay loop muted >
      <source src="./login.mp4" type="video/mp4" />
    </video>
    <login-view @toggleisShow="toggleisShow"></login-view>
    <register-view :isShow="isShowRegiste" @close="close"></register-view>
    <modify-password :isShow="isShowModify" @close="close"></modify-password>
  </div>
</template>

<script setup>
import LoginView from "./Components/LoginView.vue";
import RegisterView from "./Components/RegisterView.vue";
import ModifyPassword from "../../Components/ModifyPassword.vue";
const isShowRegiste = ref(false);
const isShowModify = ref(false);
const toggleisShow = (name) => {
  if (name == "registe") {
    isShowRegiste.value = true;
  } else if (name == "modify") {
    isShowModify.value = true;
  }
};
const close = () => {
  if (isShowRegiste.value) {
    isShowRegiste.value = false;
  }
  if (isShowModify.value) {
    isShowModify.value = false;
  }
};
</script>
<style>
.video-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

video {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>