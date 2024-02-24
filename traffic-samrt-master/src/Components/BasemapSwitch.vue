<template>
  <div>
    <!-- 底图切换 -->
    <select class="differMap">
      <option value="streets-v11">街景</option>
      <option value="satellite-v9">卫星</option>
      <option value="dark-v10">黑夜</option>
    </select>
  </div>
</template>

<script setup>
import $ from "jquery";
import { onMounted, inject } from "vue";
onMounted(() => {
  const $map = inject("$map");
  $(".differMap").change((e) => {
    const value = e.target.value;
    $map.setStyle(`mapbox://styles/mapbox/${value}`);
  });
});
</script>

<style  scoped>
.differMap {
  position: fixed;
  left: 400px;
  top: 200px;
}
</style>