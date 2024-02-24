<template>
  <div class="backend" v-if="isShow">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">普通用户管理</el-menu-item>
            <el-menu-item index="2">交通用户管理</el-menu-item>
            <div class="close" @click="closePage">
              <el-icon><Close /></el-icon>
            </div>
          </el-menu>
        </div>
      </template>
      <el-input
        v-model="userIpt"
        class="w-50 m-2"
        placeholder="搜索用户"
        :prefix-icon="Search"
        @keyup.enter="handleSearch(userIpt)"
      />
      <el-button type="primary" @click="onAdd()">添加用户</el-button>

      <el-button type="primary" @click="deleteSelected">删除选中</el-button><br />
      <table class="table-style">
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="allSelected"
              @change="handleAll(allSelected)"
            />
          </th>
          <th>序号</th>
          <th>用户类型</th>
          <th>用户名</th>
          <th>用户密码</th>
          <th>在线状态</th>
          <th colspan="3">操作</th>
        </tr>
        <tr v-for="(item, index) in list" :key="item.id">
          <td><input type="checkbox" v-model="item.isSelected" /></td>
          <td>{{ index + 1 }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.isOnline }}</td>
          <td colspan="3">
            <el-button type="primary" @click="onModify(item)">修改</el-button>
            <el-button type="success" @click="handleDelete(item)">删除</el-button>
            <el-button type="danger" @click="toggleIsOnline(item)">下线</el-button>
          </td>
        </tr>
      </table>
    </el-card>
  </div>

  <add-user ref="addRef" />
  <modify-account ref="modifyRef" :item="userItem" />
</template>

<script setup>
import { Search, Close } from "@element-plus/icons-vue";
import { onMounted } from "vue";

import AddUser from "./Components/AddUser.vue";
import ModifyAccount from "./Components/ModifyAccount.vue";
import { HomeHttp } from "../../../../Http/HomeHttp";

onMounted(() => {
  handleSelect('1');
});
const userIpt = ref();
const $props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
let list = ref([]);
const allSelected = ref(false);
// 显示选中类型的用户数据
const handleSelect = (index) => {
  if (index === "1") {
    // 加载普通用户数据
    getAlluser("common");
  } else if (index === "2") {
    getAlluser("traffic");
  }
};
// 获取所有用户数据
async function getAlluser(type) {
  let res = await HomeHttp.getAllUserHttp(type);
  list.value = res.data.result;
}
// 添加用户
let addRef = ref();
let onAdd = () => {
  addRef.value.openAdd();
};
// 修改账户信息
let userItem=ref()
let modifyRef = ref(null);
let onModify = (item) => {
  modifyRef.value.openModify();
  userItem.value=item
};
/* 关闭页面逻辑 */
const $emit = defineEmits(["close"]);
const closePage = () => {
  $emit("close");
};
const activeIndex = ref("1");
// 搜索用户
const handleSearch = (user) => {
  let filteredList = list.value.filter((item) => item.username === user);
  list.value = filteredList;
};
// 选中用户
const handleAll = (val) => {
  list.value.map((item) => {
    item.isSelected = val;
  });
};
// 删除选中
const deleteSelected=()=>{
  list.value.forEach(item=>{
    if(item.isSelected){
      deleteItem(item.type,item.username)
    }
  })
}
// 删除用户
const handleDelete=(item)=>{
    deleteItem(item.type,item.username)
}
async function deleteItem(type,username) {
  let res = await HomeHttp.deleteHttp(
    type,
    username,
  );
  if(res.data.code==400){
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }else if(res.data.code==200){
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "success",
        offset: 80,
      });
    getAlluser(type)
  }
}
// 下线
const toggleIsOnline=(item)=>{
  logout(item.type,item.username)
}
async function logout(type,username) {
  let res = await HomeHttp.logoutHttp(
    type,
    username,
  );
  if(res.data.code==400){
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "warning",
        offset: 80,
      });
  }else if(res.data.code==200){
    ElMessage({
        message: res.data.msg,
        duration: 2000,
        type: "success",
        offset: 80,
      });
    getAlluser(type)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__header {
  padding: 0;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
}
.backend {
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 500px;
  overflow-y: auto;
}
.el-input {
  width: 200px;
  margin-right: 450px;
}
.el-button {
  margin-inline: 20px;
}

// 表格样式
.table-style {
  width: 100%;
  margin: 30px 0px 0px 0px;
  border-collapse: collapse;
}

th,
td {
  width: 100px;
  text-align: center;
  padding: 10px 0px;
  border: 0.5px solid #999;
  border-inline: none;
}
.backend {
  z-index: 1000;
}
</style>