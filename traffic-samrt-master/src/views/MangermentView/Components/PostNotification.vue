<template>
  <div class="traffic-notice">
    <div class="public">
      <h2>交通公告</h2>
      <el-button type="primary" size="small" @click="openIssue"
        >发布公告</el-button
      >
    </div>
    <div class="list">
      <div class="notice" v-for="item in list" :key="item.index">
        <span>{{ item.info }}</span>
        <button @click="openNotice(item)">查看</button>
      </div>
    </div>
  </div>
  <add-notice :isShow="isShowNotice" @close="close"></add-notice>
  <div id="noticeInfo" v-if="isShow">
    <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">公告信息</el-menu-item>
          <div class="close" @click="closePage">
            <el-icon><Close /></el-icon>
          </div>
        </el-menu>
        <div class="content">
          <h3>{{ noticeinfo }}</h3>
          <p>{{ noticetime }}</p>
        </div>
  </div>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
import AddNotice from "../Components/AddNotice.vue";
import { NoticeHttp } from "../../../Http/NoticeHttp";
import { inject, onMounted, watchEffect } from "vue";

let isShowNotice = ref(false);
const openIssue = () => {
  isShowNotice.value = true;
};
const close = (value) => {
  // 关闭发布公告界面
  if (isShowNotice.value) {
    isShowNotice.value = false;
  }
};
let $map = null;
onMounted(() => {
  $map = inject("$map");
  getAllNotice();
});
const list = ref([]);
async function getAllNotice() {
  let res = await NoticeHttp.getAllNoticeHttp();
  list.value = res.data.result;
}
// 打开通知
const isShow = ref(false);
const noticeinfo=ref()
const noticetime=ref()
const openNotice = (item) => {
  isShow.value = true;
  noticeinfo.value=item.info
  noticetime.value=item.time
};
const closePage = () => {
  isShow.value = false;
};

</script>

<style  scoped>
.traffic-notice {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 320px;
  height: 350px;
  margin-top: 5px;
  color: #fff;
  position: relative;
  border: 1.5px solid rgba(6, 249, 176, 0.708);
  background: url("../../../img/line.png") rgba(15, 9, 9, 0.03);
  padding: 5px;
}
.list{
  overflow-y:auto;
  max-height:300px;
}
.public {
  margin-top: 10px;
  display: flex;
  gap: 120px;
  align-items: center;
}
.notice {
  width: 300px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  padding-inline: 10px;
  align-items: center;
  font-size: 12px;
  border-bottom: 1.5px dotted rgba(13, 235, 168, 0.17);
}

#noticeInfo {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  background: #fff;
  z-index: 1000;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
}
.content {
  padding: 10px;
  margin-top: 20px;
}
.content p {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 16px;
  color: #333;
}
</style>