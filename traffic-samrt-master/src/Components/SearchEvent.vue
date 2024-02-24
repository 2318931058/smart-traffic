<template>
  <div>
      <el-input v-model.trim="eventIpt" class="w-50 m-2" placeholder="查询事件" :prefix-icon="Search" />
      <el-button plain @click="searchEvent">搜索</el-button>

  </div>
</template>

<script setup>
import {Search } from '@element-plus/icons-vue'
import useSearchEventHook from '../Hooks/useSearchEventHook.js'
let {eventIpt,searchEvent} = useSearchEventHook()

</script>

<style lang="scss" scoped>
.el-input{
margin-right: 5px;
width: 200px;
}

</style>