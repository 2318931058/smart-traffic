<template>
  <div class="box" v-if="isShow">
    <div class="box-header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">未读消息</el-menu-item>
        <el-menu-item index="2">已读通知</el-menu-item>
        <div class="close" @click="closePage">
          <el-icon><Close /></el-icon>
        </div>
      </el-menu>
    </div>
    <div class="box-content">
      <div
        class="item"
        v-for="item in list"
        :key="item.notice_id"
        @click="toRead(item)"
      >
        <div class="info">{{ item.info }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";
import { NoticeHttp } from "../../../Http/NoticeHttp";
const $emit = defineEmits(["close", "getunReadNum"]);
const $props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
});
const list = ref([]);
const activeIndex = ref("1");
let unReadNum = ref();
// 显示选中类型的用户数据
const handleSelect = (index) => {
  activeIndex.value = index;
};
watchEffect(() => {
  if (activeIndex.value == "1") {
    getAllNotice(1);
  } else if (activeIndex.value == "2") {
    getAllNotice(2);
  }
});
// 获取通知列表
async function getAllNotice(value) {
  let res = await NoticeHttp.getAllNoticeHttp();
  if (value == 1) {
    let List = res.data.result;
    list.value = List.filter((item) => {
      return (
        item.type === "all" &&
        item.user.some(
          (user) => user.username === $props.user && user.status === "未读"
        )
      );
    });
    unReadNum.value = list.value.length;
    // 更新未读消息数
    $emit("getunReadNum", unReadNum.value);
  } else if (value == 2) {
    let List = res.data.result;
    list.value = List.filter((item) => {
      return (
        item.type === "all" &&
        item.user.some(
          (user) => user.username === $props.user && user.status === "已读"
        )
      );
    });
  }
}
// 点击切换为已读
const toRead = (item) => {
  if (!item.status) {
    readMsg(item.notice_id, $props.user);
  }
};
// 已读请求
async function readMsg(notice_id, username) {
  let res = await NoticeHttp.readHttp(notice_id, username);
  getAllNotice(1);
}
/* 关闭页面逻辑 */
const closePage = () => {
  $emit("close");
};
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 70px;
  right: 10px;
  // background: #0f1b3d;
  background: #fff;
  width: 350px;
  min-height: 300px;
  max-height: 400px;
  border: 1px solid #fff;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 6px 16px 1px rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  color: #333;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
  color: #333;
}
.box-content {
  overflow-y: auto;
  max-height: 400px;
}
.box-content .item {
  position: relative;
  color: #333;
  height: 80px;
  padding: 5px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #474646;
}
.item:hover {
  background: #e5e5e5;
  color: #409eff;
}
.item .info {
  position: absolute;
  top: 10px;
  font-size: 14px;
  text-align: left;
  line-height: 2em;
}
.item .time {
  font-size: 12px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>